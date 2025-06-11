# 接口文档

> 本文档基于 OpenAPI 3.0.1，所有接口均需 Bearer Token 鉴权（除非特别说明）。

---

## 宠物相关接口

### 查询宠物详情

- **GET** `/pet/{petId}`
- **描述**：查询宠物详情

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| petId  | path | string | 是 | 宠物ID |

**响应示例**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| code | integer | 状态码 |
| data | object | 宠物信息，见下表 |

**data 字段结构**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | integer | 宠物ID编号 |
| category | object | 分组（见 Category） |
| name | string | 名称 |
| photoUrls | array[string] | 照片URL |
| tags | array[object] | 标签（见 Tag） |
| status | string | 宠物销售状态（available/pending/sold） |

**成功响应示例**
```json
{
  "code": 0,
  "data": {
    "name": "Hello Kity",
    "photoUrls": ["http://dummyimage.com/400x400"],
    "id": 3,
    "category": { "id": 71, "name": "Cat" },
    "tags": [{ "id": 22, "name": "Cat" }],
    "status": "sold"
  }
}
```

**错误响应**
- 400: 参数错误
- 401: 未授权
- 404: 未找到

---

### 删除宠物信息

- **DELETE** `/pet/{petId}`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| petId  | path | string | 是 | 宠物ID |
| api_key | header | string | 否 | API密钥 |

**响应**
- 200: 删除成功
- 401: 未授权

---

### 新建宠物信息

- **POST** `/pet`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| name   | string | 是 | 宠物名 |
| status | string | 是 | 宠物销售状态 |

**响应**
- 201: 创建成功，返回宠物信息
- 401: 未授权

---

### 修改宠物信息

- **PUT** `/pet`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| ...    | ...  | ...  | ...  |

**响应**
- 200: 修改成功
- 401: 未授权
- 404: 未找到
- 405: 方法不允许

---

### 根据状态查找宠物列表

- **GET** `/pet/findByStatus`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| status | query | string | 是 | 过滤状态值 |

**响应**
- 200: 返回宠物列表
- 400: 参数错误
- 401: 未授权

---

## 用户认证相关

### 用户注册

- **POST** `/api/v1/auth/register`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| username | string | 是 | 用户名 |
| email    | string | 是 | 邮箱 |
| password | string | 是 | 密码 |

**响应**
- 200: 注册成功，返回用户信息和token
- 400: 用户已存在

---

### 用户登录

- **POST** `/api/v1/auth/login`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| username | string | 是 | 用户名（3-10位） |
| password | string | 是 | 密码 |

**响应**
- 200: 登录成功，返回用户信息和token
- 400: 参数错误

---

### 更新用户资料

- **PUT** `/api/v1/auth/profile`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| username | string | 是 | 用户名 |
| avatarUrl | string | 是 | 头像URL |
| email | string | 是 | 邮箱 |

**响应**
- 200: 更新成功，返回用户信息
- 400: 参数错误
- 401: 未授权
- 404: 用户不存在

---

## 书籍相关接口

### 获取书籍列表

- **GET** `/api/v1/books`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| page | query | integer | 是 | 页码 |
| size | query | integer | 是 | 分页大小 |
| category | query | string | 否 | 分组 |
| sort | query | string | 否 | 排序方式（new/hot） |

**响应字段**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| code | integer | 状态码 |
| message | string | 信息 |
| data.total | integer | 总数 |
| data.bookList | array | 书籍列表，见下表 |

**bookList 字段结构**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| bookId | integer | 书籍ID |
| bookName | string | 书名 |
| author | string | 作者 |
| coverUrl | string/null | 封面URL |
| category | string | 分类 |
| createTime | string | 创建时间 |

---

### 获取书籍详情

- **GET** `/api/v1/books/{bookId}`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | path | string | 是 | 书籍ID |

**响应字段**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| code | integer | 状态码 |
| message | string | 信息 |
| data | object | 书籍详情，见下表 |

**data 字段结构**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| bookId | integer | 书籍ID |
| bookName | string | 书名 |
| author | string | 作者 |
| coverUrl | string | 封面URL |
| description | string | 简介 |
| category | string | 分类 |
| chapters | array | 章节列表（chapterTitle, chapterNo） |

---

### 搜索书名

- **GET** `/api/v1/books/byPrompt`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| prompt | query | string | 是 | 搜索关键字 |

**响应**
- 200: 返回匹配书籍列表

---

### 获取书籍关键人物

- **GET** `/api/v1/books/person`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | query | integer | 是 | 书籍ID |

**响应**
- 200: 返回人物列表（personId, bookId, personName, description）

---

## 书签相关接口

### 获取书签列表

- **GET** `/api/v1/bookmarks`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 是 | 用户ID |
| bookId | query | integer | 否 | 书籍ID |

**响应**
- 200: 返回书签列表（bookmarksId, bookId, chapterNo, chapterTitle, createTime）

---

### 添加书签

- **POST** `/api/v1/bookmarks`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| userId | integer | 是 | 用户ID |
| bookId | integer | 是 | 书籍ID |
| chapterNo | integer | 是 | 章节号 |

---

### 删除书签（方式一）

- **DELETE** `/api/v1/bookmarks`
- 通过 userId, bookId, chapterNo 删除

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 是 | 用户ID |
| bookId | query | integer | 是 | 书籍ID |
| chapterNo | query | integer | 是 | 章节号 |

---

### 删除书签（方式二）

- **DELETE** `/api/v1/bookmarks/{bookmarksId}`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookmarksId | path | integer | 是 | 书签ID |

---

### 获取用户所有书签

- **GET** `/api/v1/bookmarks/all`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 是 | 用户ID |

---

## 章节相关接口

### 获取章节详情

- **GET** `/api/v1/chapter`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | query | integer | 否 | 书籍ID |
| chapterNo | query | integer | 否 | 章节号 |

**响应**
- 200: 返回章节内容（content）

---

### 增加AI续写章节

- **POST** `/api/v1/chapter/add`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| userId | integer | 是 | 用户ID |
| bookId | integer | 是 | 书籍ID |
| title | string | 是 | 章节标题 |
| body | string | 是 | 章节内容 |
| preChapterNo | integer | 是 | 前一章节号 |

---

## 阅读进度相关

### 获取阅读进度

- **GET** `/api/v1/readingProgress`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 是 | 用户ID |
| bookId | query | integer | 是 | 书籍ID |

---

### 更新阅读进度

- **POST** `/api/v1/readingProgress`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| userId | integer | 是 | 用户ID |
| bookId | integer | 是 | 书籍ID |
| chapterNo | integer | 是 | 章节号 |

---

## 书架相关接口

### 添加书籍到书架

- **POST** `/api/v1/shelf/books`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| userId | integer | 是 | 用户ID |
| bookId | integer | 是 | 书籍ID |

---

### 获取书架列表

- **GET** `/api/v1/shelf/books`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| page | query | integer | 是 | 页码 |
| size | query | integer | 是 | 分页大小 |
| userId | query | integer | 是 | 用户ID |

---

## AI服务相关接口

### 前情提要

- **GET** `/api/v1/AIService/streamChat`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | query | integer | 是 | 书籍ID |
| chapterNo | query | integer | 是 | 章节号 |
| Accept | header | string | 是 | 固定为 text/event-stream |

---

### 名词解释

- **GET** `/api/v1/AIService/explanation`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | query | integer | 是 | 书籍ID |
| chapterTitle | query | string | 是 | 章节标题 |
| prompt | query | string | 是 | 名词 |

---

### 新建章节（AI生成）

- **POST** `/api/v1/AIService/expandChapter`

| 参数名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| userId | integer | 是 | 用户ID |
| bookId | integer | 是 | 书籍ID |
| chapterNo | integer | 是 | 当前章节号 |
| prompt | string | 是 | 生成提示词 |
| trueNum | string | 是 | 实际章节号 |

---

### 人物对话

- **GET** `/api/v1/AIService/startChat`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| bookId | query | integer | 是 | 书籍ID |
| person | query | string | 是 | 人物名 |
| content | query | string | 是 | 对话内容 |
| userId | query | integer | 是 | 用户ID |

---

### 继续对话

- **GET** `/api/v1/AIService/continueChat`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 是 | 用户ID |
| content | query | string | 是 | 对话内容 |

---

### 删除聊天线程

- **DELETE** `/api/v1/AIService`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 否 | 用户ID |

---

### 删除剧情推演线程

- **DELETE** `/api/v1/AIService/deleteThread`

| 参数名 | 位置 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- | ---- |
| userId | query | integer | 否 | 用户ID |

---

## 通用数据结构

### Pet

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | integer | 宠物ID编号 |
| category | object | 分组（见 Category） |
| name | string | 名称 |
| photoUrls | array[string] | 照片URL |
| tags | array[object] | 标签（见 Tag） |
| status | string | 宠物销售状态（available/pending/sold） |

### Category

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | integer | 分组ID编号 |
| name | string | 分组名称 |

### Tag

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | integer | 标签ID编号 |
| name | string | 标签名称 |

### user

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| userId | integer | 用户id |
| username | string | 用户名 |
| avatar | string | 头像URL |
| email | string | 邮箱 |

### chapter

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| chapterTitle | string | 章节标题 |
| chapterNo | integer | 章节号 |
| content | string | 章节内容 |

---

> 如需详细字段示例，请参考接口响应中的 `example` 字段或联系后端开发。