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



## 七、AI功能开发

### 平台选择与架构

经过小组讨论，确定使用学校本地部署的AI平台 - AnythingLLM。该平台具有以下特点：

- **统一接口**：将不同AI模型的接口文档统一，相当于套了一层中间件
- **模型兼容**：无论使用什么AI模型，接口文档都只需参考AnythingLLM即可
- **流式输出**：考虑到DeepSeek带有思考功能，为提升用户体验采用流式输出

### AI流式服务实现

#### 服务层设计

```java
@Service
public class AIStreamService {
    @Value("${anythingllm.url}")
    private String aiServerUrl;
 
    @Value("${anythingllm.apiKey}")
    private String apiKey;
 
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
 
    public AIStreamService() {
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }
    
    public Flux<String> streamChat(String message, String mode) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("message", message);
        requestBody.put("mode", mode);
        requestBody.put("stream", true);
 
        return webClient.post()
                .uri(aiServerUrl + "/api/v1/workspace/aireader/stream-chat")
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToFlux(String.class)
                .map(chunk -> {
                    try {
                        JsonNode jsonNode = objectMapper.readTree(chunk);
                        if (jsonNode.has("textResponse")) {
                            String text = jsonNode.get("textResponse").asText();
                            return text == null ? "" : text;
                        }
                    } catch (Exception e) {
                        // 记录日志
                        return "";
                    }
                    return "";
                })
                .filter(text -> !text.isEmpty());
    }
}
```

#### 技术特点

- **WebClient**：使用Spring WebFlux提供的响应式HTTP客户端进行网络通信
- **流式处理**：设置响应类型为`text/event-stream`实现流式输出
- **JSON解析**：使用ObjectMapper对AI返回内容进行过滤处理
- **响应式编程**：返回`Flux<String>`类型，支持WebFlux、SSE等技术

### 控制层实现

#### 前情提要接口

```java
@GetMapping(value = "/streamChat", produces = "text/event-stream")
public Flux<String> getChapterSummary(
        @RequestParam Integer bookId,
        @RequestParam Integer chapterNo
){
    logger.info("收到生成章节前情提要请求 - 书籍ID: {}, 章节号: {}", bookId, chapterNo);
    
    // 检查参数有效性
    if (!bookService.exitsBook(bookId)) {
        return Flux.error(new RuntimeException("书籍不存在"));
    }
    
    String bookName = bookService.getBookName(bookId);
    String chapterTitle = chapterService.getChapterTitle(bookId, chapterNo);
    String prompt = "请为书籍《" + bookName + "》的章节《" + chapterTitle + "》之前的内容生成一个简短的前情提要。";
    
    return aiStreamService.streamChat(prompt, "chat");
}
```

#### 名词解释接口

```java
@GetMapping(value = "/explanation", produces = "text/event-stream")
public Flux<String> getTermExplanation(
        @RequestParam Integer bookId,
        @RequestParam Integer chapterNo,
        @RequestParam String term
){
    logger.info("收到名词解释请求 - 书籍ID: {}, 章节号: {}, 词汇: {}", bookId, chapterNo, term);
    
    // 检查参数有效性
    if (!bookService.exitsBook(bookId)) {
        return Flux.error(new RuntimeException("书籍不存在"));
    }
    
    String bookName = bookService.getBookName(bookId);
    String chapterTitle = chapterService.getChapterTitle(bookId, chapterNo);
    String prompt = "请解释在书籍《" + bookName + "》章节《" + chapterTitle + "》中出现的词汇：" + term;
    
    return aiStreamService.streamChat(prompt, "chat");
}
```

### 接口特性

- **流式响应**：返回`Flux<String>`类型数据，实现实时流式输出
- **参数验证**：对书籍ID、章节号等参数进行有效性检查
- **动态提示词**：根据书籍名称、章节标题动态生成AI提示词
- **统一架构**：前情提要和名词解释功能开发相似度极高，主要区别在查询参数和提示词编写

### 配置说明

```yaml
anythingllm:
  url: ${AI_SERVER_URL:http://localhost:3001}
  apiKey: ${AI_API_KEY:your-api-key}
```

## 八、章节续写功能开发

### 功能简介

章节续写功能是一个基于 AI 的动态内容生成模块，用户可以通过提供书籍 ID、章节号以及续写提示，生成符合上下文的章节内容，并将其存储到数据库中。该功能通过流式数据处理实现实时响应，提升用户体验。经过讨论，我们设计了一个类似树形结构来构建剧情多路推演。

### 核心功能解析

`expandChapter` 方法的核心逻辑：

1. **参数校验**：检查书籍是否存在，避免无效请求
2. **上下文获取**：获取书籍名称、章节标题和章节内容，为后续生成提供上下文
3. **生成提示语**：根据用户输入的提示语和章节上下文，动态构建 AI 服务的请求内容
4. **调用 AI 服务**：使用流式数据处理，实时返回生成的内容
5. **正则解析生成内容**：提取生成内容中的章节标题和正文
6. **存储到数据库**：将解析后的章节标题和正文存储到数据库中

### 核心代码实现

```java
@PostMapping(value = "/expandChapter", produces = "text/event-stream")
public Flux<String> expandChapter(@RequestBody ExpandChapterRequest request) {
    logger.info("收到剧情推演请求 - 书籍ID: {}, 章节号: {}, 用户id: {}", 
                request.getBookId(), request.getChapterNo(), request.getUserId());
    
    // 检查书籍是否存在
    if (!bookService.exitsBook(request.getBookId())) {
        return Flux.error(new RuntimeException("书籍不存在"));
    }
 
    // 获取书籍名称、章节标题和章节内容
    String bookName = bookService.getBookName(request.getBookId());
    String chapterTitle = chapterService.getChapterTitle(request.getBookId(), request.getChapterNo());
    String chapterContext = chapterService.getChapterContentByTitle(request.getBookId(), chapterTitle);
    String prompt = request.getPrompt();
    
    // 构建 AI 服务的提示语
    String finalPrompt = "请扩写书籍《" + bookName + "》的章节《" + chapterTitle + "》,此章的内容为" + chapterContext + "" +
            "。请在扩写时注意保持章节的风格和内容一致。" +
            "同时这个章节的内容也可能是扩写出来的,请尽量保持连贯性" +
            "请按照" + prompt + "的想法扩写" +
            "此外,我要求你返回的正文里面的格式:章节标题必须使用<<>>包裹,正文内容包裹在一个()里面,除此之外请不要返回其他任何内容。";
 
    // 用于存储流式内容
    StringBuilder contentBuilder = new StringBuilder();
 
    return aiStreamService.streamChat(finalPrompt, "chat")
            .doOnNext(contentBuilder::append) // 将流式内容追加到 StringBuilder
            .doOnComplete(() -> {
                // 正则提取标题和正文
                String content = contentBuilder.toString();
                String title = "";
                String body = "";
 
                // 使用正则提取标题
                java.util.regex.Pattern titlePattern = java.util.regex.Pattern.compile("<<(.+?)>>");
                java.util.regex.Matcher titleMatcher = titlePattern.matcher(content);
                if (titleMatcher.find()) {
                    title = titleMatcher.group(1); // 提取标题内容，不包含<<>>
                }
 
                // 使用正则提取正文
                java.util.regex.Pattern bodyPattern = java.util.regex.Pattern.compile("\\((.+?)\\)");
                java.util.regex.Matcher bodyMatcher = bodyPattern.matcher(content);
                if (bodyMatcher.find()) {
                    body = bodyMatcher.group(1); // 提取正文内容，不包含()
                }
 
                // 存储章节标题和正文到数据库
                chapterService.addNewChapter(request.getUserId(), request.getBookId(), title, body, request.getChapterNo());
            });
}
```

### 关键技术点

#### 1. 流式数据处理
- 使用 `Flux` 实现流式响应，提升用户体验
- 通过 `doOnNext` 和 `doOnComplete` 处理生成内容

#### 2. 正则表达式解析
- 标题正则：`<<(.+?)>>`，提取 `<<>>` 包裹的内容
- 正文正则：`\\((.+?)\\)`，提取 `()` 包裹的内容

#### 3. 树形结构设计
- 章节号递增存储续写章节
- 通过章节标题格式 `_(preChapterNo)_(userId)` 标识续写关系
- 树形结构构建在前端进行，实现剧情多路推演

#### 4. 数据库存储策略
```java
// 调用服务层方法存储新章节
chapterService.addNewChapter(request.getUserId(), request.getBookId(), title, body, request.getChapterNo());
```

### 请求实体设计

```java
public class ExpandChapterRequest {
    private Integer bookId;
    private Integer chapterNo;
    private Integer userId;
    private String prompt;
    
    // getter 和 setter 方法
}
```

## 九、开发经验与后续计划

- **经验总结**：
  - 熟悉了爬虫技术及其合法使用。
  - 学习了数据库联合索引的应用及性能优化。
  - 掌握了书签功能的完整开发流程。
  - 深入理解了AI接口集成与流式数据处理。
  - 掌握了Spring WebFlux响应式编程技术。
  - 学习了Linux服务器运维和团队协作开发能力。
  
- **技术收获**：
  - **Linux运维**：服务器部署、环境配置、日志管理
  - **Spring Boot开发**：RESTful API设计、数据库集成、拦截器配置
  - **数据库设计**：表结构设计、索引优化、MyBatis动态SQL
  - **AI接口集成**：AnythingLLM平台使用、流式输出处理、正则表达式解析
  - **团队协作**：Git版本控制、接口文档编写、代码规范统一

- **后续计划**：
  - 优化现有接口性能，提升用户体验。
  - 完善AI功能的错误处理和异常情况管理。
  - 扩展章节续写功能，支持更复杂的剧情分支。

**项目实训总结**：
通过本次项目实训，完整掌握了从后端架构设计到AI功能集成的全流程开发技能，为今后的软件开发工作奠定了坚实基础。