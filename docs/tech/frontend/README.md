# 前端技术文档

## 一、项目技术架构简介

本项目是一个基于 **Vue 3 + TypeScript** 的在线阅读平台，集成了书籍浏览、阅读、用户管理和 AI 交互等功能。前端采用模块化、类型安全的开发方式，结合 Pinia 状态管理和 Axios 通信封装，旨在实现高效开发和流畅用户体验。

### 1. 技术栈选择

- **前端框架**：Vue 3 + Composition API + TypeScript
- **状态管理**：Pinia
- **UI 组件库**：Element Plus
- **路由管理**：Vue Router
- **HTTP 客户端**：Axios（二次封装，含拦截器）
- **辅助工具**：Mock.js（模拟接口）、ESLint + Prettier（代码规范）、Vue DevTools

---

## 二、项目目录结构

```
src/
├── api/               # API 接口定义
│   └── user.ts        # 用户相关 API
├── assets/            # 静态资源
├── components/        # 公共组件
│   ├── common/        # 通用组件
│   ├── reader/        # 阅读器相关组件
│   ├── ai/            # AI 功能相关组件
│   └── user/          # 用户相关组件
│       ├── UserAuth.vue        # 用户认证组件
│       ├── LoginModal.vue      # 登录弹窗
│       └── RegisterModal.vue   # 注册弹窗
├── views/             # 页面视图
├── router/            # 路由配置
│   └── index.ts       # 路由主文件
├── store/             # Pinia 状态管理
│   └── userInfo.ts    # 用户信息状态
├── types/             # TypeScript 类型定义
│   └── user.d.ts      # 用户相关类型
├── utils/             # 工具函数
│   └── request.ts     # Axios 请求封装
├── mock/              # 模拟数据
│   └── user.ts        # 用户相关模拟数据
└── App.vue            # 根组件
```

---

## 三、路由设计

| 路径              | 页面描述         |
| ----------------- | ---------------- |
| `/`               | 首页（书籍列表） |
| `/books/:id`      | 书籍详情页       |
| `/reader/:id`     | 阅读页面         |
| `/user`           | 用户中心         |
| `/user/bookshelf` | 个人书架         |
| `/user/bookmarks` | 书签管理         |
| `/user/settings`  | 个人设置         |
| `/search`         | 搜索结果页       |

---

## 四、页面视图设计

### 1. 首页（HomePage.vue）

- **组件构成**：
  - AppHeader
  - SearchBar
  - CategoryTags
  - BookGrid/BookList（支持视图切换）
  - Pagination
  - AppFooter
- **功能**：
  - 展示书籍列表，支持分类、排序筛选
  - 提供搜索入口
  - 支持网格/列表视图切换

### 2. 书籍详情页（BookDetailsPage.vue）

- **组件构成**：
  - AppHeader
  - BookDetailsPanel
  - BookCatalog
  - AppFooter
- **功能**：
  - 展示书籍详细信息
  - 显示目录
  - 提供“开始阅读”“加入书架”功能

### 3. 阅读页面（ReaderPage.vue）

- **开发进度记录**：
  - 2024.4.22：完成阅读页面核心框架和基础功能，包括章节内容动态加载、章节导航、三栏式布局、目录/书签/设置/AI 工具栏等基础交互，支持亮/暗主题切换和响应式布局。
  - 2024.4.23：针对 ReaderPage.vue 代码量过大、可维护性差等问题，采用“关注点分离”原则，完成组件拆分优化。将页面拆分为数据管理层（Pinia Store）、业务逻辑层（Composables）、展示组件层（Vue Components），极大提升了代码可维护性和复用性。

- **组件拆分优化实践**：
  - **优化前问题**：ReaderPage.vue 代码量超 2000 行，职责不清晰，维护困难。
  - **优化思路**：分为三层架构——Pinia Store（状态管理）、Composables（业务逻辑）、Components（UI 展示）。
  - **优化后目录结构**：
    ```
    src/
    ├── components/
    │   └── reader/
    │       ├── toolbar/
    │       │   └── AIToolbar.vue          # AI 工具栏组件
    │       ├── modals/
    │       │   ├── CatalogModal.vue       # 目录模态框
    │       │   ├── GuideToolbar.vue       # 指南模态框
    │       │   └── SettingsModal.vue      # 设置模态框
    │       └── controls/
    │           ├── ChapterBookmark.vue    # 章节书签按钮
    │           ├── TextSelector.vue       # 文本选择工具
    │           ├── RightControls.vue      # 右侧控制按钮组
    │           └── NavigationButtons.vue  # 章节导航按钮
    ├── composable/
    │   ├── useAIToolbarStore.ts          # AI 工具栏逻辑
    │   ├── useBookmarkStore.ts           # 书签管理逻辑
    │   ├── useCatalogModal.ts            # 目录模态框逻辑
    │   ├── useSettingsModalStore.ts      # 设置管理逻辑
    │   └── useTextSelectorStore.ts       # 文本选择逻辑
    ├── store/
    │   └── index.ts                      # Pinia 状态管理
    └── views/
        └── ReaderPage.vue                # 阅读器主页面
    ```
  - **拆分示例**（以章节书签为例）：
    - 展示组件：`ChapterBookmark.vue` 只负责 UI 与交互。
    - 业务逻辑：`useBookmarkStore.ts` 负责书签的增删查逻辑。
    - 页面整合：`ReaderPage.vue` 组合调用，提升复用性和可维护性。

- **待办事项**：
  - 完善翻页模式（滚动/章节翻页）。
  - 对接后端 API 实现书签、书架持久化。
  - 实现 AI 工具栏各功能。
  - 优化 UI/UX 细节与性能。

### 4. 用户中心（UserCenterPage.vue）

- **组件构成**：
  - AppHeader
  - SideNavigation（用户功能导航）
  - 子页面内容（UserProfile、UserBookshelf、UserBookmarks、设置面板）
  - AppFooter
- **功能**：
  - 管理个人信息、书架、书签
  - 设置阅读偏好

### 5. 搜索结果页（SearchResultPage.vue）

- **组件构成**：
  - AppHeader
  - SearchBar（显示当前关键词）
  - CategoryTags（筛选结果）
  - BookList/BookGrid
  - Pagination
  - AppFooter
- **功能**：
  - 展示搜索结果
  - 支持筛选和排序

---

## 五、组件设计

### 1. 公共组件

- **AppHeader.vue**：顶部导航栏（Logo、搜索、用户头像、登录/注册）
- **AppFooter.vue**：底部信息
- **SearchBar.vue**：关键词搜索、分类筛选
- **CategoryTags.vue**：分类标签
- **Pagination.vue**：分页
- **LoadingSpinner.vue**：加载提示
- **ConfirmDialog.vue**：确认对话框

### 2. 书籍展示相关组件

- **BookGridItem.vue**：网格项（封面、书名）
- **BookListItem.vue**：列表项（封面、书名、作者、简介、分类）
- **BookCard.vue**：书籍卡片（封面、书名、作者、评分）
- **BookGrid.vue**：网格容器
- **BookList.vue**：列表容器
- **BookDetailsPanel.vue**：详情面板
- **BookCatalog.vue**：目录组件

### 3. 阅读器核心组件

- **ReaderContainer.vue**：主容器
- **ReaderContent.vue**：章节内容
- **ReaderToolbar.vue**：工具栏（目录、书签、设置、AI）
- **ReaderSettingsPanel.vue**：阅读设置
- **BookmarkManager.vue**：书签管理
- **ReadingProgressBar.vue**：进度条
- **AIToolbar.vue**：AI 工具栏（已独立为 toolbar/AIToolbar.vue）
- **CatalogModal.vue**：目录模态框
- **SettingsModal.vue**：设置模态框
- **GuideToolbar.vue**：阅读指南模态框
- **ChapterBookmark.vue**：章节书签按钮
- **TextSelector.vue**：文本选择工具
- **RightControls.vue**：右侧控制按钮组
- **NavigationButtons.vue**：章节导航按钮

> 说明：阅读器相关组件已按功能模块进一步细分，提升了可维护性和复用性。

---

## 六、交互与数据流设计

### 1. 状态管理（Pinia）

- **userStore**：用户信息、登录状态、阅读偏好
- **bookStore**：书籍列表、当前阅读、搜索结果
- **readerStore**：阅读进度、书签、阅读设置
- **aiStore**：AI 对话历史、内容缓存

#### Pinia 特点

- Vue 官方状态管理库，Vuex 的继任者
- 类型安全，完美支持 TypeScript
- 轻量级，API 简洁
- 模块化，无需嵌套模块
- 支持 Vue DevTools 调试
- 支持 SSR

#### Pinia 用法示例

```typescript
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    const userInfo = ref<UserInfo | null>(null)
    return { userInfo }
  },
  persist: true // 持久化存储
})
```

### 2. 关键交互流程

- **书籍浏览与选择**：首页筛选/搜索 → 详情页 → 开始阅读/加入书架
- **阅读体验**：阅读页面 → 翻页 → 工具栏 → 设置/目录/AI/书签
- **AI 功能交互**：划词 → 选择 AI 功能 → 面板输入/选择 → 查看结果
- **用户数据管理**：登录/注册 → 用户中心 → 管理书架/书签/偏好

### 3. API 请求流程

1. 组件调用 API 方法（如 `loginAPI`）
2. API 方法通过 `request.ts` 发送请求
3. 请求拦截器自动添加 token（从 Pinia 获取）
4. 服务器响应
5. 响应拦截器处理状态码、错误（如 401 跳转登录页）
6. 组件获取结果，更新 UI 或状态

#### 请求工具封装（src/utils/request.ts）

- 创建统一配置的 axios 实例
- 请求拦截器自动添加 token
- 响应拦截器统一处理错误
- token 失效自动跳转登录页

```typescript
// 请求拦截器 - 自动添加token
instance.interceptors.request.use((config) => {
  const token = userInfoStore.userInfo ? userInfoStore.userInfo.token : null
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器 - 处理错误和token失效
instance.interceptors.response.use(
  (response) => {
    if ('code' in response.data && response.data.code !== 0) {
      ElMessage.error(response.data.msg)
    }
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      userInfoStore.userInfo = null
      ElMessage.error('用户身份已过期~')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
```

---

## 七、用户相关接口与类型定义

### 1. 用户注册

- **路径**：`POST /api/v1/auth/register`
- **请求体**：
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **响应体**：
  ```json
  {
    "code": 200,
    "message": "注册成功",
    "data": {
      "userId": "string",
      "username": "string",
      "token": "string",
      "avatar": "string"
    }
  }
  ```

### 2. 用户登录

- **路径**：`POST /api/v1/auth/login`
- **请求体**：
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应体**：同注册接口

### 3. 类型定义

````typescript
// filepath: src/types/user.d.ts
export type UserInfo = {
  userId: string;
  username: string;
  token: string;
  avatar?: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

export type UserRegister = {
  username: string;
  password: string;
  email: string;
};
````

---

## 八、API 接口封装示例

```typescript
// 登录接口
export const loginAPI = (params: UserLogin) => {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data: params
  })
}

// 注册接口
export const registerAPI = (params: UserRegister) => {
  return request({
    url: '/api/v1/auth/register',
    method: 'post',
    data: params
  })
}
```

---

## 九、模拟接口实现（Mock）

```typescript
export const mockLoginAPI = (params: UserLogin) => {
  const isValidUser = params.username.length >= 3 && params.password.length >= 6
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isValidUser) {
        resolve({
          data: {
            code: 200,
            message: '登录成功',
            data: {
              userId: 'user_' + Math.floor(Math.random() * 10000),
              username: params.username,
              token: 'mock_token_' + Date.now()
            }
          }
        })
      } else {
        resolve({
          data: {
            code: 400,
            message: '用户名或密码错误',
            data: null
          }
        })
      }
    }, 500)
  })
}
```

---

## 十、组件中使用 API 示例

以登录弹窗为例，展示如何在 Vue 组件中使用 API 接口：

```vue
<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="用户登录"
    width="400px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('update:visible', false)">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { loginAPI } from '@/api/user'
import { mockLoginAPI } from '@/mock/user'
import { useUserInfoStore } from '@/store'
import type { UserLogin } from '@/types/user'
import { reactive, ref } from 'vue'

const loginForm = reactive<UserLogin>({
  username: '',
  password: ''
})

const loading = ref(false)
const userInfoStore = useUserInfoStore()
const emit = defineEmits(['update:visible'])
const loginFormRef = ref()

const handleLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const useRealAPI = false // 开发环境下使用模拟API
      const response = useRealAPI 
        ? await loginAPI(loginForm)
        : await mockLoginAPI(loginForm)
      const { code, message, data } = response.data
      if (code === 200) {
        userInfoStore.userInfo = data
        ElMessage.success('登录成功')
        emit('update:visible', false)
      } else {
        ElMessage.error(message || '登录失败')
      }
    } catch (error) {
      ElMessage.error('网络错误，请稍后重试')
    } finally {
      loading.value = false
    }
  })
}
</script>
```

---

## 十一、总结

本技术文档介绍了项目的整体架构、目录结构、核心技术栈、主要页面与组件设计、状态管理、API 封装与数据流、类型定义、模拟接口实现及组件实际用法。通过模块化、类型安全和高效的通信机制，保障了前端开发的高效与可维护性。

---

## 十二、开发进度与优化记录

### 1. ReaderPage.vue 基本实现（2024.4.22）

- 完成章节内容加载、章节导航、三栏式布局、目录/书签/设置/AI 工具栏等基础功能。
- 支持亮/暗主题切换、响应式布局、文本选择交互、AI 工具栏占位。

### 2. ReaderPage.vue 组件拆分优化（2024.4.23）

- 针对代码量大、职责不清晰等问题，采用“关注点分离”原则，拆分为 Pinia Store、Composables、Components 三层。
- 组件层按功能模块分类，命名语义化，职责单一。
- 业务逻辑层实现逻辑复用，UI 与逻辑解耦。
- 数据管理层集中管理应用状态，支持持久化。
- 优化后代码组织更清晰，复用性和可维护性大幅提升。

---