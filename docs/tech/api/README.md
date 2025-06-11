# OpenAPI Specification: ai阅读

**Version:** 1.0.0
**OpenAPI Version:** 3.0.1

## Tags

*   宠物

## Paths

### `/pet/{petId}`

#### GET

*   **Summary:** 查询宠物详情
*   **Description:**
*   **Deprecated:** false
*   **Tags:**
    *   宠物
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `petId` (path, string, required): 宠物 ID. Example: `1`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer): 状态码, min: 0, max: 0
                    *   `data` (Pet): 宠物信息
                *   Required: `code`, `data`
            *   **Example:**
                ```json
                {
                  "code": 0,
                  "data": {
                    "name": "Hello Kity",
                    "photoUrls": [
                      "http://dummyimage.com/400x400"
                    ],
                    "id": 3,
                    "category": {
                      "id": 71,
                      "name": "Cat"
                    },
                    "tags": [
                      {
                        "id": 22,
                        "name": "Cat"
                      }
                    ],
                    "status": "sold"
                  }
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

#### DELETE

*   **Summary:** 删除宠物信息
*   **Description:**
*   **Deprecated:** false
*   **Tags:**
    *   宠物
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `petId` (path, string, required): Pet id to delete.
    *   `api_key` (header, string):
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer): min: 0, max: 0
                *   Required: `code`
            *   **Example:**
                ```json
                {
                  "code": 0
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```

### `/pet`

#### POST

*   **Summary:** 新建宠物信息
*   **Description:**
*   **Deprecated:** false
*   **Tags:**
    *   宠物
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/x-www-form-urlencoded`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `name` (string): 宠物名. Example: `Hello Kitty`
                *   `status` (string): 宠物销售状态. Example: `sold`
            *   Required: `name`, `status`
*   **Responses:**
    *   **201:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer): min: 0, max: 0
                    *   `data` (Pet): 宠物信息
                *   Required: `code`, `data`
            *   **Example:**
                ```json
                {
                  "code": 0,
                  "data": {
                    "name": "Hello Kity",
                    "photoUrls": [
                      "http://dummyimage.com/400x400"
                    ],
                    "id": 3,
                    "category": {
                      "id": 71,
                      "name": "Cat"
                    },
                    "tags": [
                      {
                        "id": 22,
                        "name": "Cat"
                      }
                    ],
                    "status": "sold"
                  }
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```

#### PUT

*   **Summary:** 修改宠物信息
*   **Description:**
*   **Deprecated:** false
*   **Tags:**
    *   宠物
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties: {}
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `data` (Pet): 宠物信息
                *   Required: `code`, `data`
            *   **Example:**
                ```json
                {
                  "code": 0,
                  "data": {
                    "name": "Hello Kity",
                    "photoUrls": [
                      "http://dummyimage.com/400x400"
                    ],
                    "id": 3,
                    "category": {
                      "id": 71,
                      "name": "Cat"
                    },
                    "tags": [
                      {
                        "id": 22,
                        "name": "Cat"
                      }
                    ],
                    "status": "sold"
                  }
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties: {}
    *   **405:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties: {}

### `/pet/findByStatus`

#### GET

*   **Summary:** 根据状态查找宠物列表
*   **Description:**
*   **Deprecated:** false
*   **Tags:**
    *   宠物
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `status` (query, string, required): Status values that need to be considered for filter.
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: array
                *   Items: Pet (宠物信息)
            *   **Example:**
                ```json
                {
                  "code": 0,
                  "data": [
                    {
                      "name": "Hello Kity",
                      "photoUrls": [
                        "http://dummyimage.com/400x400"
                      ],
                      "id": 3,
                      "category": {
                        "id": 71,
                        "name": "Cat"
                      },
                      "tags": [
                        {
                          "id": 22,
                          "name": "Cat"
                        }
                      ],
                      "status": "sold"
                    },
                    {
                      "name": "White Dog",
                      "photoUrls": [
                        "http://dummyimage.com/400x400"
                      ],
                      "id": 3,
                      "category": {
                        "id": 71,
                        "name": "Dog"
                      },
                      "tags": [
                        {
                          "id": 22,
                          "name": "Dog"
                        }
                      ],
                      "status": "sold"
                    }
                  ]
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                *   Required: `code`
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```

### `/api/v1/auth/profile`

#### PUT

*   **Summary:** 更新用户资料
*   **Description:** 修改用户信息的接口,此外之后需要token的接口,都可以使用eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdCJ9.sign的测试环境的通用token
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `username` (string)
                *   `avatarUrl` (string)
                *   `email` (string)
            *   Required: `username`, `avatarUrl`, `email`
        *   **Example:**
            ```json
            {
              "username": "辉浩",
              "avatarUrl": "https://avatars.githubusercontent.com/u/99133272",
              "email": "o97kgs16@gmail.com"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data` (null)
                *   Required: `code`, `message`, `data`
            *   **Examples:**
                *   `1` (成功示例):
                    ```json
                    {
                      "code": 200,
                      "message": "操作成功",
                      "data": {
                        "userId": 1,
                        "username": "admin",
                        "email": "123@163.com",
                        "avatarUrl": "https://pic2.zhimg.com/v2-ffdbbeea7a8063dd40a1e80a7c023b71_b.jpg"
                      }
                    }
                    ```
                *   `2` (成功示例):
                    ```json
                    {
                      "code": 404,
                      "message": "用户不存在",
                      "data": null
                    }
                    ```
                *   `3` (成功示例):
                    ```json
                    {
                      "code": 404,
                      "message": "用户不存在",
                      "data": null
                    }
                    ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data` (null)
                *   Required: `code`, `message`, `data`
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data` (null)
                *   Required: `code`, `message`, `data`

### `/api/v1/auth/register`

#### POST

*   **Summary:** 用户注册
*   **Description:** 用户注册的接口,可以获取token
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `username` (string)
                *   `email` (string)
                *   `password` (string)
            *   Required: `email`, `password`, `username`
        *   **Example:**
            ```json
            {
              "username": "马永青",
              "email": "lzbmd2_lmf91@yahoo.com.cn",
              "password": "admin"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `userId` (string)
                            *   `username` (string)
                            *   `token` (string)
                            *   `avatar` (string)
                        *   Required: `userId`, `username`, `token`, `avatar`
                *   Required: `code`, `message`, `data`
            *   **Examples:**
                *   `1` (成功示例):
                    ```json
                    {
                      "code": 200,
                      "message": "注册成功",
                      "data": {
                        "userId": "49",
                        "username": "梅子欣",
                        "token": "asdkjgklsahgdafkgjadsdfasdf",
                        "avatar": "https://avatars.githubusercontent.com/u/61457433"
                      }
                    }
                    ```
                *   `2` (成功示例):
                    ```json
                    {
                      "code": 400,
                      "message": "用户名已存在",
                      "data": null
                    }
                    ```
    *   **400:** 用户已存在
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data` (null)
                *   Required: `code`, `message`, `data`

### `/api/v1/auth/login`

#### POST

*   **Summary:** 用户登陆
*   **Description:** 用户登录的接口,可以获取token
*   **Deprecated:** false
*   **Security:** \[Empty]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `username` (string): 用户名, minLength: 3, maxLength: 10
                *   `password` (string): 密码
            *   Required: `password`, `username`
        *   **Example:**
            ```json
            {
              "username": "admin",
              "password": "admin"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `userId` (integer)
                            *   `username` (string)
                            *   `token` (string)
                            *   `avatarUrl` (string)
                        *   Required: `userId`, `username`, `token`, `avatarUrl`
                *   Required: `code`, `message`, `data`
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```

### `/api/v1/books`

#### GET

*   **Summary:** 获取书籍列表
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `page` (query, integer, required): 查询页数为1的书籍. Example: `1`
    *   `size` (query, integer, required): 默认分页为20. Example: `20`
    *   `category` (query, string, optional): 分组,可选没有就查全部. Example: `名著`
    *   `sort` (query, string, optional): 只有new和hot,默认new按时间排序,hot是按浏览量. Example: `排序方法`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `total` (integer)
                            *   `bookList`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `bookId` (integer)
                                        *   `bookName` (string)
                                        *   `author` (string)
                                        *   `coverUrl` (null)
                                        *   `category` (string)
                                        *   `createTime` (string)
                                    *   Required: `bookId`, `bookName`, `author`, `coverUrl`, `category`, `createTime`
                        *   Required: `total`, `bookList`
                *   Required: `code`, `message`, `data`
            *   **Example:**
                ```json
                {
                  "code": 200,
                  "message": "操作成功",
                  "data": {
                    "total": 4,
                    "bookList": [
                      {
                        "bookId": 1,
                        "bookName": "三国演义",
                        "author": "罗贯中",
                        "coverUrl": null,
                        "category": "名著",
                        "createTime": "2025-03-21T17:10:07.000+00:00"
                      },
                      {
                        "bookId": 4,
                        "bookName": "水浒传",
                        "author": "施耐庵",
                        "coverUrl": null,
                        "category": "名著",
                        "createTime": "2025-03-21T17:06:05.000+00:00"
                      },
                      {
                        "bookId": 3,
                        "bookName": "西游记",
                        "author": "吴承恩",
                        "coverUrl": null,
                        "category": "名著",
                        "createTime": "2025-03-21T17:05:27.000+00:00"
                      },
                      {
                        "bookId": 2,
                        "bookName": "红楼梦",
                        "author": "曹雪芹",
                        "coverUrl": null,
                        "category": "名著",
                        "createTime": "2025-03-21T17:00:14.000+00:00"
                      }
                    ]
                  }
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **403:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 403,
                  "message": "Forbidden"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

### `/api/generate`

#### POST

*   **Summary:** deepseek
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties: {}
        *   **Example:**
            ```json
            {
              "model": "deepseek-r1:1.5b",
              "prompt": "什么是数据结构"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `c`:
                        *   Type: object
                        *   Properties: {}
                *   Required: `code`, `message`
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **403:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 403,
                  "message": "Forbidden"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

### `/api/v1/books/{bookId}`

#### GET

*   **Summary:** 获取书籍详情
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (path, string, required):
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `bookId` (integer)
                            *   `bookName` (string)
                            *   `author` (string)
                            *   `coverUrl` (string)
                            *   `description` (string)
                            *   `category` (string)
                            *   `chapters`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `chapterTitle` (string)
                                        *   `chapterNo` (integer)
                                    *   Required: `chapterTitle`, `chapterNo`
                        *   Required: `bookId`, `bookName`, `author`, `coverUrl`, `description`, `category`, `chapters`
                    *   `c`:
                        *   Type: object
                        *   Properties: {}
                *   Required: `code`, `message`, `data`
            *   **Example:**
                ```json
                {
                  "code": 200,
                  "message": "操作成功",
                  "data": {
                    "bookId": 16,
                    "bookName": "三剑客",
                    "author": "大仲马",
                    "coverUrl": "https://www.shuzhaige.com/d/file/a269134ca3017517ebbd6dfc17ab1fca.jpg",
                    "description": "《三个火枪手》，又译《三剑客》、《侠隐记》，是法国19世纪浪漫主义作家大仲马的代表作之一。该书曾五次被翻拍成电影作品。故事主角为达达尼昂，三个火枪手分别是阿多斯，波尔多斯，和阿拉密斯。这部历史小说以法兰西国王路易十三朝代和权倾朝野的红衣主教黎塞留掌权这一时期的历史事实为背景，描写三个火枪手阿多斯、波尔朵斯、阿拉宓斯和他们的朋友达尔大尼央如何忠于国王，与黎塞留斗争，从而反映出统治阶级内部勾心斗角的种种情况。小说时间起止是1624-1628年。…",
                    "category": "名著",
                    "chapters": [
                      { "chapterTitle": "原序", "chapterNo": 1 },
                      { "chapterTitle": "拉费尔伯爵回忆录", "chapterNo": 2 },
                      { "chapterTitle": "译序", "chapterNo": 3 }
                      // ... (many chapters omitted for brevity)
                    ]
                  }
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **403:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 403,
                  "message": "Forbidden"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

### `/api/v1/books/byPrompt`

#### GET

*   **Summary:** 搜索书名
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `prompt` (query, string, required):
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `total` (integer)
                            *   `bookList`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `bookId` (integer)
                                        *   `bookName` (string)
                                        *   `author` (string)
                                        *   `coverUrl` (string)
                                        *   `category` (string)
                                        *   `createTime` (string)
                                    *   Required: `bookId`, `bookName`, `author`, `coverUrl`, `category`, `createTime`
                        *   Required: `total`, `bookList`
                *   Required: `code`, `message`, `data`
            *   **Example:**
                ```json
                {
                  "code": 200,
                  "message": "操作成功",
                  "data": {
                    "total": 11,
                    "bookList": [
                      // ... (book list omitted for brevity)
                    ]
                  }
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **403:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 403,
                  "message": "Forbidden"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

### `/api/v1/books/person`

#### GET

*   **Summary:** 获取书籍关键人物
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (query, integer, required): Example: `16`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: array
                        *   Items:
                            *   Type: object
                            *   Properties:
                                *   `personId` (integer)
                                *   `bookId` (integer)
                                *   `personName` (string)
                                *   `description` (string)
                            *   Required: `personId`, `bookId`, `personName`, `description`
                *   Required: `code`, `message`, `data`
            *   **Example:**
                ```json
                {
                  "code": 200,
                  "message": "操作成功",
                  "data": [
                    {
                      "personId": 121,
                      "bookId": 46,
                      "personName": "梁天来",
                      "description": "正直善良，因家族产业纠纷陷入冤案，历经磨难寻求真相。"
                    }
                    // ... (other persons omitted for brevity)
                  ]
                }
                ```
    *   **400:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 400,
                  "message": "Invalid input"
                }
                ```
    *   **401:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 401,
                  "message": "Unauthorized"
                }
                ```
    *   **403:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `message` (string)
                    *   `code` (integer): 状态
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 403,
                  "message": "Forbidden"
                }
                ```
    *   **404:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                *   Required: `code`, `message`
            *   **Example:**
                ```json
                {
                  "code": 404,
                  "message": "Not found"
                }
                ```

### `/api/v1/bookmarks`

#### GET

*   **Summary:** 获取书签列表
*   **Description:** 用于获取书签列表
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, required): Example: `1`
    *   `bookId` (query, integer, optional): Example: `16`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer): 响应码
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `bookmarksList`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `bookmarksId` (integer)
                                        *   `bookId` (integer)
                                        *   `chapterNo` (integer)
                                        *   `chapterTitle` (string)
                                        *   `createTime` (string)
                                    *   Required: `bookmarksId`, `bookId`, `chapterNo`, `chapterTitle`, `createTime`
                        *   Required: `bookmarksList`
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

#### POST

*   **Summary:** 添加书签
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `userId` (integer)
                *   `bookId` (integer)
                *   `chapterNo` (integer)
            *   Required: `userId`, `bookId`, `chapterNo`
        *   **Example:**
            ```json
            {
              "userId": "1",
              "bookId": "16",
              "chapterNo": "3"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `c`:
                        *   Type: object
                        *   Properties: {}
                *   Required: `code`, `message`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

#### DELETE

*   **Summary:** 删除书签2
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, required): ID 编号
    *   `bookId` (query, integer, required):
    *   `chapterNo` (query, integer, required):
*   **Responses:**
    *   **200:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/bookmarks/all`

#### GET

*   **Summary:** 获取用户所有书签
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, required):
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `bookmarksList`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `bookmarksId` (integer)
                                        *   `bookId` (integer)
                                        *   `bookName` (string)
                                        *   `chapterNo` (integer)
                                        *   `chapterTitle` (string)
                                        *   `createTime` (string)
                                    *   Required: `bookmarksId`, `bookId`, `bookName`, `chapterNo`, `chapterTitle`, `createTime`
                        *   Required: `bookmarksList`
                *   Required: `code`, `message`, `data`
            *   **Example:**
                ```json
                {
                  "code": 200,
                  "message": "操作成功",
                  "data": {
                    "bookmarksList": [
                      // ... (bookmarks list omitted for brevity)
                    ]
                  }
                }
                ```
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/bookmarks/{bookmarksId}`

#### DELETE

*   **Summary:** 删除书签
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookmarksId` (path, integer, required): Example: `1`
*   **Responses:**
    *   **200:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/chapter`

#### GET

*   **Summary:** 获取章节详情
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (query, integer, optional): 书籍id. Example: `16`
    *   `chapterNo` (query, integer, optional): 章节顺讯. Example: `1`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `content` (string)
                        *   Required: `content`
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/chapter/add`

#### POST

*   **Summary:** 增加ai续写章节
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `userId` (integer)
                *   `bookId` (integer)
                *   `title` (string)
                *   `body` (string)
                *   `preChapterNo` (integer)
            *   Required: `userId`, `bookId`, `title`, `body`, `preChapterNo`
        *   **Example:**
            ```json
            {
              "userId": 1,
              "bookId": 1,
              "title": "人人人人",
              "body": "hhhhhhhhhhhhhhhhhhhhh",
              "preChapterNo": 5
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `chapterTitle` (string)
                            *   `chapterNo` (integer)
                        *   Required: `chapterTitle`, `chapterNo`
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/readingProgress`

#### GET

*   **Summary:** 获取阅读进度
*   **Description:** 获取当前书籍的阅读进度,如果章节为0,则代表以前没有阅读过
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, required): Example: `1`
    *   `bookId` (query, integer, required): Example: `16`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `bookId` (integer)
                            *   `chapterNo` (integer)
                            *   `lastReadTime` (null)
                        *   Required: `bookId`, `chapterNo`, `lastReadTime`
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

#### POST

*   **Summary:** 更新阅读进度
*   **Description:** 更新当前阅读进度
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `userId` (integer)
                *   `bookId` (integer)
                *   `chapterNo` (integer)
            *   Required: `bookId`, `chapterNo`, `userId`
        *   **Example:**
            ```json
            {
              "userId": "1",
              "bookId": "16",
              "chapterNo": "1"
            }
            ```
*   **Responses:**
    *   **200:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/shelf/books`

#### POST

*   **Summary:** 添加书籍到书架
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `userId` (integer)
                *   `bookId` (integer)
            *   Required: `userId`, `bookId`
        *   **Example:**
            ```json
            {
              "userId": "1",
              "bookId": "16"
            }
            ```
*   **Responses:**
    *   **500:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `timestamp` (string)
                    *   `status` (integer)
                    *   `error` (string)
                    *   `path` (string)
                *   Required: `timestamp`, `status`, `error`, `path`

#### GET

*   **Summary:** 获取书架列表
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `page` (query, integer, required): Example: `1`
    *   `size` (query, integer, required): Example: `20`
    *   `userId` (query, integer, required): Example: `1`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data`:
                        *   Type: object
                        *   Properties:
                            *   `total` (integer)
                            *   `bookList`:
                                *   Type: array
                                *   Items:
                                    *   Type: object
                                    *   Properties:
                                        *   `bookId` (integer)
                                        *   `bookName` (string)
                                        *   `author` (string)
                                        *   `coverUrl` (string)
                                        *   `category` (string)
                                        *   `createTime` (string)
                        *   Required: `total`, `bookList`
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/streamChat`

#### GET

*   **Summary:** 前情提要
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (query, integer, required): Example: `4`
    *   `chapterNo` (query, integer, required): Example: `7`
    *   `Accept` (header, string, required): Example: `text/event-stream`
*   **Responses:**
    *   **200:**
        *   **Content:** `text/event-stream`
            *   **Schema:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses, but content type `application/json`)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/explanation`

#### GET

*   **Summary:** 名词解释
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (query, integer, required): Example: `4`
    *   `chapterTitle` (query, string, required): Example: `第2章 张天师祈禳瘟疫 洪太尉误走妖魔`
    *   `prompt` (query, string, required): Example: `张天师`
*   **Responses:**
    *   **200:**
        *   **Content:** `text/event-stream`
            *   **Schema:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses, but content type `application/json`)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/expandChapter`

#### POST

*   **Summary:** 新建章节
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Request Body:**
    *   **Content:** `application/json`
        *   **Schema:**
            *   Type: object
            *   Properties:
                *   `userId` (integer)
                *   `bookId` (integer)
                *   `chapterNo` (integer): 当前一章的chapterNo
                *   `prompt` (string): 用于生成下一章的提示词
                *   `trueNum` (string): 当前章节的实际章节号,如<<第六回...>>>,则这个数为7
            *   Required: `bookId`, `chapterNo`, `prompt`, `userId`, `trueNum`
        *   **Example:**
            ```json
            {
              "userId": 1,
              "bookId": 4,
              "chapterNo": 4,
              "prompt": "和原来剧情有差别"
            }
            ```
*   **Responses:**
    *   **200:**
        *   **Content:** `text/event-stream`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `data` (string): 流式输出字符串
                *   Required: `data`
    *   **400:** (Same as other 400 responses, but content type `application/json`)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/startChat`

#### GET

*   **Summary:** 人物对话
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `bookId` (query, integer, required): ID 编号. Example: `1`
    *   `person` (query, string, required): Example: `梁天来`
    *   `content` (query, string, required): Example: `介绍一下你自己`
    *   `userId` (query, integer, required): Example: `9`
*   **Responses:**
    *   **200:**
        *   **Content:** `text/event-stream`
            *   **Schema:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses, but content type `application/json`)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/continueChat`

#### GET

*   **Summary:** 继续对话
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, required): Example: `9`
    *   `content` (query, string, required): Example: `你有什么很有成就的事情吗`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:** (Same schema as POST /api/v1/bookmarks 200 response)
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService`

#### DELETE

*   **Summary:** 删除聊天线程接口
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, optional): Example: `9`
*   **Responses:**
    *   **200:**
        *   **Content:** `application/json`
            *   **Schema:**
                *   Type: object
                *   Properties:
                    *   `code` (integer)
                    *   `message` (string)
                    *   `data` (string)
                *   Required: `code`, `message`, `data`
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

### `/api/v1/AIService/deleteThread`

#### DELETE

*   **Summary:** 删除剧情推演线程接口
*   **Description:**
*   **Deprecated:** false
*   **Security:**
    *   bearer: \[]
*   **Parameters:**
    *   `userId` (query, integer, optional): Example: `9`
*   **Responses:**
    *   **200:** (Same schema as DELETE /api/v1/AIService 200 response)
    *   **400:** (Same as other 400 responses)
    *   **401:** (Same as other 401 responses)
    *   **403:** (Same as other 403 responses)
    *   **404:** (Same as other 404 responses)

## Components

### Schemas

#### Pet

*   **Type:** object
*   **Required:** `name`, `photoUrls`, `id`, `category`, `tags`, `status`
*   **Properties:**
    *   `id` (integer, format: int64): 宠物ID编号, min: 1
    *   `category` (Category): 分组
    *   `name` (string): 名称. Examples: `["doggie"]`
    *   `photoUrls` (array of string): 照片URL
    *   `tags` (array of Tag): 标签
    *   `status` (string): 宠物销售状态. Enum: `["available", "pending", "sold"]`

#### Category

*   **Type:** object
*   **Properties:**
    *   `id` (integer, format: int64): 分组ID编号, min: 1
    *   `name` (string): 分组名称
*   **XML:**
    *   `name`: Category

#### Tag

*   **Type:** object
*   **Properties:**
    *   `id` (integer, format: int64): 标签ID编号, min: 1
    *   `name` (string): 标签名称
*   **XML:**
    *   `name`: Tag

#### user

*   **Type:** object
*   **Required:** `userId`, `username`, `avatar`, `email`
*   **Properties:**
    *   `userId` (integer): 用户id
    *   `username` (string): 用户名
    *   `avatar` (string): 头像URL
    *   `email` (string): 邮箱

#### chapter

*   **Type:** object
*   **Required:** `chapterTitle`, `chapterNo`, `content`
*   **Properties:**
    *   `chapterTitle` (string)
    *   `chapterNo` (integer)
    *   `content` (string)

### Security Schemes

*   **token校验:**
    *   Type: http
    *   Scheme: bearer
    *   Bearer Format: JWT
*   **bearer:**
    *   Type: http
    *   Scheme: bearer

## Servers

(No servers defined)

## Global Security

*   bearer: \[]