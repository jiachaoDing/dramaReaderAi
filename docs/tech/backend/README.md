# 后端技术文档

## 一、书籍存储设计

本项目为 Web 阅读平台，书籍数据存储在服务器端。存储设计如下：

- 书籍基本信息（如简介、作者、封面、分类等）存储于 `books` 表。
- 书籍内容按章节拆分，单独存储，每章与书籍通过外键关联。
- 书籍来源通过爬虫从正规网站获取，后续计划自动化爬取并存储。

## 二、Spring Boot 项目搭建

- 采用 Spring Boot 快速搭建后端框架，简化配置。
- 数据库模块待数据库设计完成后引入。
- 局域网及校园网环境下测试接口可用性，便于团队调试。

## 三、用户信息修改接口

### 业务流程

1. 接收前端请求，校验参数（用户名、邮箱、头像）。
2. 查询用户是否存在。
3. 更新用户邮箱和头像。
4. 返回更新后的用户信息。

### 代码示例

```java
public ApiResponse<profileResponse> profile(profileRequest request){
    User user = userMapper.getUserByName(request.getUsername());
    if(user == null){
        return ApiResponse.error(404, "用户不存在");
    }
    // 检查邮箱格式
    if(request.getEmail().isEmpty() || request.getUsername().isEmpty() || request.getAvatarUrl().isEmpty()){
        return ApiResponse.error(400, "参数不正确");
    }
    // 更新用户的头像和邮箱
    userMapper.updateUserProfile(user.getUserId(), request.getEmail(), request.getAvatarUrl());
    user = userMapper.getUserByName(request.getUsername());
    profileResponse response = new profileResponse();
    response.setUserId(user.getUserId());
    response.setUsername(user.getUsername());
    response.setEmail(user.getEmail());
    response.setAvatarUrl(user.getAvatarUrl());
    return ApiResponse.success(response);
}
```

### 测试优化

- 拦截器中增加开发环境下测试 token 放行，便于接口调试，无需频繁登录。

## 四、书籍列表接口开发

### 书籍实体设计

```java
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookId;
    @Column(name = "book_name")
    private String bookName;
    @Column(name = "author")
    private String author;
    @Column(name = "cover_url")
    private String coverUrl;
    @Column(name = "description")
    private String description;
    @Column(name = "categories_id")
    private Integer categoryId;
    @Column(name = "view_count")
    private Integer viewCount;
    @Column(name = "create_time")
    private Timestamp createTime;
}
```

### 数据层（MyBatis 动态 SQL）

- 支持按分类、排序（最新/热门）查询。
- 默认按更新时间倒序。

```java
@Select({
    "<script>",
    "SELECT b.book_id, b.book_name, b.author, b.cover_url, c.name as category, b.create_time",
    "FROM books b",
    "LEFT JOIN categories c ON b.categories_id = c.categories_id",
    "<where>",
    "<if test='category != null and category != \"\"'>",
    "AND c.name = #{category}",
    "</if>",
    "</where>",
    "<choose>",
    "   <when test='sort == \"new\"'>",
    "       ORDER BY b.create_time DESC",
    "   </when>",
    "   <when test='sort == \"hot\"'>",
    "       ORDER BY b.view_count DESC",
    "   </when>",
    "   <otherwise>",
    "       ORDER BY b.create_time DESC",
    "   </otherwise>",
    "</choose>",
    "</script>"
})
List<BookListItem> getBookList(@Param("category") String category,
                               @Param("sort") String sort);
```

### 业务层（分页）

- 使用 PageHelper 分页插件，简化分页逻辑。

```java
public ApiResponse<BookListResponse> getBookList(Integer page, Integer pageSize, String category, String sort) {
    // 开启分页
    PageHelper.startPage(page, pageSize);
    // 获取图书列表
    List<BookListItem> bookList = bookMapper.getBookList(category, sort);
    // 获取分页信息
    PageInfo<BookListItem> pageInfo = new PageInfo<>(bookList);
    // 封装返回结果
    BookListResponse response = new BookListResponse();
    response.setTotal((int) pageInfo.getTotal());
    response.setBookList(bookList);
    return ApiResponse.success(response);
}
```

## 五、书籍导入与详细内容接口开发

### 书籍导入

1. **爬取书籍数据**：使用 Python 的 Scrapy 框架爬取书籍数据，生成 JSON 文件。
2. **导入数据库**：通过 Java 解析 JSON 文件，将书籍和章节数据存储到数据库中。

### 书籍详细内容接口

1. **联合索引**：在章节表中创建 `bookId-chapterNo-chapterTitle` 联合索引，加速查询。
2. **接口开发**：
   - 查询书籍详细信息及章节列表。
   - 更新书籍访问量。

```java
@Select("SELECT b.book_id, b.book_name, b.author, b.cover_url, c.name as category, b.create_time, b.description " +
        "FROM books b " +
        "LEFT JOIN categories c ON b.categories_id = c.categories_id " +
        "WHERE b.book_id = #{bookId}")
BookDetailResponse getBookDetail(@Param("bookId") Integer bookId);

@Update("UPDATE books SET view_count = view_count + 1 WHERE book_id = #{bookId}")
void updateViewCount(@Param("bookId") Integer bookId);
```

## 六、书签功能开发

### 书签实体设计

```java
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bookmarks")
public class Bookmarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmarks_id")
    private Integer bookmarksId;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "book_id")
    private Integer bookId;
    @Column(name = "chapter_no")
    private Integer chapterNo;
    @Column(name = "create_time")
    private Timestamp createTime;
}
```

### 数据层

```java
@Insert("INSERT INTO bookmarks(user_id,book_id,chapter_no,create_time) VALUES(#{userId},#{bookId},#{chapterNo},#{createTime})")
void insertBookmarks(Integer userId, Integer bookId, Integer chapterNo, Timestamp createTime);

@Select("SELECT b.bookmarks_id, b.book_id, b.chapter_no, b.create_time, c.chapter_title " +
        "FROM bookmarks b " +
        "LEFT JOIN (SELECT book_id, chapter_no, chapter_title FROM chapters) c " +
        "ON b.book_id = c.book_id AND b.chapter_no = c.chapter_no " +
        "WHERE b.user_id = #{userId}")
List<BookmarksItem> getBookmarks(Integer userId, Integer bookId);

@Delete("DELETE FROM bookmarks WHERE bookmarks_id = #{bookmarksId}")
void deleteBookmarks(Integer bookmarksId);
```

### 业务层

```java
public void addBookmark(Integer userId, Integer bookId, Integer chapterNo) {
    Timestamp createTime = new Timestamp(System.currentTimeMillis());
    bookmarksMapper.insertBookmarks(userId, bookId, chapterNo, createTime);
}

public ApiResponse<BookmarksResponse> getBookmarks(Integer userId, Integer bookId) {
    List<BookmarksItem> bookmarks = bookmarksMapper.getBookmarks(userId, bookId);
    BookmarksResponse response = new BookmarksResponse();
    response.setBookmarks(bookmarks);
    return ApiResponse.success(response);
}

public void deleteBookmark(Integer bookmarksId) {
    bookmarksMapper.deleteBookmarks(bookmarksId);
}
```

### 控制层

```java
@PostMapping()
public ResponseEntity<ApiResponse<String>> addBookmark(@RequestBody addBookmarksRequest request) {
    bookmarksService.addBookmark(request.getUserId(), request.getBookId(), request.getChapterNo());
    return ResponseEntity.ok(ApiResponse.success("书签添加成功"));
}

@GetMapping()
public ResponseEntity<ApiResponse<BookmarksResponse>> getBookmarks(
        @RequestParam() Integer userId,
        @RequestParam() Integer bookId) {
    ApiResponse<BookmarksResponse> response = bookmarksService.getBookmarks(userId, bookId);
    return ResponseEntity.ok(response);
}

@DeleteMapping("/{bookmarksId}")
public ResponseEntity<ApiResponse<String>> deleteBookmark(@PathVariable Integer bookmarksId) {
    bookmarksService.deleteBookmark(bookmarksId);
    return ResponseEntity.ok(ApiResponse.success("书签删除成功"));
}
```

## 七、开发经验与后续计划

- **经验总结**：
  - 熟悉了爬虫技术及其合法使用。
  - 学习了数据库联合索引的应用及性能优化。
  - 掌握了书签功能的完整开发流程。
- **后续计划**：
  - 引入大模型接口，开发 AI 辅助阅读功能。
  - 优化现有接口性能，提升用户体验。