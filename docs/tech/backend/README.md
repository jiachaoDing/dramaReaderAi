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
    if(request.getEmail()==""||request.getUsername()==""||request.getAvatarUrl()==""){
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

## 五、开发经验与后续计划

- 熟悉了 MyBatis 动态 SQL 和分页插件的使用。
- 后续计划引入大量书籍数据，开发书籍详情接口，并探索 Redis 有序集合实现排行榜功能。

---