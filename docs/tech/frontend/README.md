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

## 三、组件开发架构规范

### 🏗️ 整体架构思路

#### 分层架构设计

```
┌─────────────────────────────────────┐
│        展示组件层 (Components)         │ ← UI渲染 + 用户交互
├─────────────────────────────────────┤
│        业务逻辑层 (Composable)        │ ← 业务逻辑 + 状态处理  
├─────────────────────────────────────┤
│        数据管理层 (Pinia Store)        │ ← 全局状态 + 数据持久化
├─────────────────────────────────────┤
│        类型定义层 (Types)             │ ← TypeScript接口定义
└─────────────────────────────────────┘
```

#### 关注点分离原则

*   **组件层 (Components)**: 只关注 UI 渲染和用户交互，保持组件纯粹性。
*   **逻辑层 (Composables)**: 处理业务逻辑、数据转换、副作用管理。
*   **数据层 (Pinia Store)**: 管理全局状态、API调用、数据缓存。
*   **类型层 (Types)**: 提供完整的 TypeScript 类型支持。

### 📁 目录结构规范

```
src/
├── components/          # 展示组件层
│   └── reader/
│       ├── toolbar/
│       │   ├── AIToolbar.vue       # AI工具栏组件
│       │   ├── ReadingToolbar.vue  # 阅读工具栏
│       │   └── index.ts            # 组件导出
│       └── content/
│           ├── BookContent.vue     # 书籍内容组件
│           └── ChapterNav.vue      # 章节导航
├── composables/         # 业务逻辑层
│   ├── useAIToolbar.ts             # AI工具栏逻辑
│   ├── useReader.ts                # 阅读器核心逻辑
│   ├── usePreviousSummary.ts       # 前情提要逻辑
│   └── useBookmark.ts              # 书签功能逻辑
├── store/               # 数据管理层
│   ├── modules/
│   │   ├── reader.s.ts               # 阅读器状态管理
│   │   ├── ai.s.ts                   # AI功能状态管理
│   │   └── user.s.ts                 # 用户状态管理
│   └── index.ts                    # Store 入口
├── types/               # 类型定义层
│   ├── reader.d.ts                   # 阅读器相关类型
│   ├── ai.d.ts                       # AI功能类型
│   └── common.d.ts                   # 通用类型定义
└── api/                 # API接口层
    ├── reader.ts                   # 阅读器API
    └── ai.ts                       # AI功能API
```

### 🎯 各层职责详解

#### 1. 展示组件层 (Components)

**职责**: UI渲染、事件处理、用户交互

````vue
// filepath: src/components/reader/toolbar/AIToolbar.vue
<template>
  <div class="ai-toolbar">
    <el-button
      @click="handleSummaryClick"
      :loading="isLoading"
      type="primary"
    >
      前情提要
    </el-button>
    <el-button @click="handleChatClick">AI对话</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAIToolbar } from '@/composables/useAIToolbar'

const {
  isLoading,
  handleSummaryClick,
  handleChatClick
} = useAIToolbar()
</script>
````

#### 2. 业务逻辑层 (Composables)

**职责**: 业务逻辑封装、状态管理、副作用处理

````typescript
// filepath: src/composables/useAIToolbar.ts
import { ref, computed } from 'vue'
import { useReaderStore } from '@/store/modules/reader.s' // Adjusted import based on example structure
import { useAIStore } from '@/store/modules/ai.s'       // Adjusted import based on example structure
import type { PreviousSummary } from '@/types/ai.d'    // Adjusted import based on example structure

export function useAIToolbar() {
  const readerStore = useReaderStore()
  const aiStore = useAIStore()

  const isLoading = ref(false)

  // 计算属性
  const currentBook = computed(() => readerStore.currentBook)
  const currentChapter = computed(() => readerStore.currentChapter)

  // 前情提要处理
  const handleSummaryClick = async () => {
    if (!currentBook.value || !currentChapter.value) return

    try {
      isLoading.value = true
      // Assuming currentBook and currentChapter have an 'id' property
      const summary = await aiStore.getPreviousSummary({
        bookId: currentBook.value.id,
        chapterId: currentChapter.value.id
      })

      // 显示前情提要弹窗
      aiStore.showSummaryDialog(summary)
    } catch (error) {
      console.error('获取前情提要失败:', error)
      // Optionally, use ElMessage for user feedback
      // ElMessage.error('获取前情提要失败')
    } finally {
      isLoading.value = false
    }
  }

  // AI对话处理
  const handleChatClick = () => {
    aiStore.openChatDialog()
  }

  return {
    isLoading,
    handleSummaryClick,
    handleChatClick
  }
}
````

#### 3. 数据管理层 (Pinia Store)

**职责**: 全局状态管理、API调用、数据缓存

````typescript
// filepath: src/store/modules/ai.s.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getPreviousSummaryAPI } from '@/api/ai' // Assuming this API function exists
import type { PreviousSummary, GetSummaryRequest } from '@/types/ai.d' // Adjusted import

export const useAIStore = defineStore('ai', () => {
  // 状态定义
  const summaryCache = ref(new Map<string, PreviousSummary>())
  const isSummaryDialogVisible = ref(false)
  const currentSummary = ref<PreviousSummary | null>(null)
  const isChatDialogVisible = ref(false) // Added for openChatDialog

  // 计算属性
  const hasCachedSummary = computed(() => (bookId: string, chapterId: string) => {
    const key = `${bookId}-${chapterId}`
    return summaryCache.value.has(key)
  })

  // Actions
  const getPreviousSummary = async (params: GetSummaryRequest): Promise<PreviousSummary> => {
    const cacheKey = `${params.bookId}-${params.chapterId}`

    // 检查缓存
    if (summaryCache.value.has(cacheKey)) {
      return summaryCache.value.get(cacheKey)!
    }

    // API调用
    // Assuming getPreviousSummaryAPI returns a Promise<PreviousSummary>
    // or a structure like { data: PreviousSummary }
    const response = await getPreviousSummaryAPI(params)
    const summary = response.data; // Adjust if API response structure is different

    // 缓存结果
    summaryCache.value.set(cacheKey, summary)

    return summary
  }

  const showSummaryDialog = (summary: PreviousSummary) => {
    currentSummary.value = summary
    isSummaryDialogVisible.value = true
  }

  const closeSummaryDialog = () => {
    isSummaryDialogVisible.value = false
    currentSummary.value = null
  }

  const openChatDialog = () => {
    isChatDialogVisible.value = true;
  }

  const closeChatDialog = () => {
    isChatDialogVisible.value = false;
  }

  return {
    // 状态
    summaryCache,
    isSummaryDialogVisible,
    currentSummary,
    isChatDialogVisible,

    // 计算属性
    hasCachedSummary,

    // 方法
    getPreviousSummary,
    showSummaryDialog,
    closeSummaryDialog,
    openChatDialog,
    closeChatDialog
  }
})
````

#### 4. 类型定义层 (Types)

**职责**: TypeScript 类型定义、接口约束

````typescript
// filepath: src/types/ai.d.ts
export interface PreviousSummary {
  id: string
  bookId: string
  chapterId: string
  summary: string
  keyPoints: string[]
  chapterTitle: string // Added based on composable usage
  createdAt: string    // Added based on composable usage
}

export interface AIDialogState {
  isVisible: boolean
  messages: ChatMessage[]
  isLoading: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// API 请求/响应类型
export interface GetSummaryRequest {
  bookId: string
  chapterId: string
}

export interface GetSummaryResponse { // This is an example, adjust to your actual API response
  code: number
  message: string
  data: PreviousSummary
}
````

### 🔄 数据流向示例

```
用户点击"前情提要"按钮
         ↓
    组件触发事件处理 (`handleSummaryClick` in AIToolbar.vue)
         ↓
  Composable 处理业务逻辑 (`useAIToolbar`'s `handleSummaryClick`)
         ↓
    Store 检查缓存 (`aiStore.getPreviousSummary`)
         ↓
  (无缓存) Store 调用API获取数据 (`getPreviousSummaryAPI`)
         ↓
   Store 更新状态并缓存结果 (`summaryCache`, `currentSummary`)
         ↓
 Composable (via Store reactivity) or direct call updates component state (`isLoading`, triggers dialog display via `aiStore.showSummaryDialog`)
         ↓
     组件重新渲染 (Dialog becomes visible, button state changes)
```

### 📝 命名规范

*   **组件命名**
    *   大驼峰 + 语义化: `AIToolbar.vue`, `PreviousSummaryModal.vue`
    *   功能模块前缀 (可选): `ReaderToolbar.vue`, `BookGridItem.vue`
*   **Composable 命名**
    *   `use` 前缀: `useAIToolbar`, `useReaderSettings`, `usePreviousSummary`
    *   功能描述: 清晰表达 Composable 的主要功能。
*   **Store 命名**
    *   功能模块名 (小写): `ai`, `reader`, `user`, `book`
    *   文件名: `ai.s.ts`, `reader.s.ts` (or `ai.store.ts`)
    *   Store ID (Pinia): `'ai'`, `'reader'`
*   **类型命名**
    *   接口大驼峰: `PreviousSummary`, `AIDialogState`, `UserInfo`
    *   枚举大驼峰: `LoadingState`, `DialogType`
    *   文件名: `ai.d.ts`, `user.d.ts`

### ✅ 最佳实践

#### 1. 组件纯粹性

组件应专注于UI渲染和用户事件的初步处理，将复杂逻辑委托给Composables。

````vue
// filepath: src/components/SomeFeatureButton.vue
// ✅ 好的做法
<script setup lang="ts">
import { useSomeFeature } from '@/composables/useSomeFeature'

// isLoading, handleClick are managed by the composable
const { isLoading, handleClick } = useSomeFeature() 
</script>
````

````typescript
// filepath: src/components/BadExample.vue
// ❌ 避免在组件中直接调用API或处理复杂业务逻辑
// <script setup lang="ts">
// import { ref } from 'vue'
// import { getSomeDataAPI } from '@/api/someApi' // Direct API call in component

// const data = ref(null)
// const isLoading = ref(false)

// const fetchData = async () => { // Complex logic in component
//   isLoading.value = true
//   try {
//     const response = await getSomeDataAPI({ /* params */ })
//     data.value = response.data
//   } catch (error) {
//     console.error("Failed to fetch data", error)
//   } finally {
//     isLoading.value = false
//   }
// }
// </script>
````

#### 2. 状态管理

*   **全局状态**: 使用 Pinia Store 管理应用范围内的状态（如用户信息、主题设置、跨组件共享的数据）。
*   **局部状态**: Composable 内部的 `ref` 或 `reactive` 用于管理组件自身或紧密相关组件的局部状态（如弹窗的显示/隐藏、表单数据）。

````typescript
// filepath: src/store/modules/app.s.ts
// ✅ 在 Store 中管理全局状态 (e.g., theme)
// import { defineStore } from 'pinia';
// import { ref } from 'vue';

// export const useAppStore = defineStore('app', () => {
//   const theme = ref<'light' | 'dark'>('light');
//   function toggleTheme() {
//     theme.value = theme.value === 'light' ? 'dark' : 'light';
//   }
//   return { theme, toggleTheme };
// });
````

````typescript
// filepath: src/composables/useDialog.ts
// ✅ 在 Composable 中管理局部状态 (e.g., dialog visibility)
// import { ref } from 'vue';

// export function useDialog() {
//   const isVisible = ref(false);
//   function openDialog() {
//     isVisible.value = true;
//   }
//   function closeDialog() {
//     isVisible.value = false;
//   }
//   return { isVisible, openDialog, closeDialog };
// }
````

#### 3. 错误处理

*   **Composable/Store**: API 调用和核心业务逻辑的错误应在 Composable 或 Store 的 Action 中捕获和处理。
*   **UI反馈**: 可以通过 `ElMessage` 等UI组件向用户显示友好的错误提示。
*   **日志记录**: 在 `catch` 块中使用 `console.error` 记录详细错误信息，便于调试。

````typescript
// filepath: src/composables/useFeatureX.ts
// ✅ 在 Composable 中统一处理错误
// import { ElMessage } from 'element-plus'; // Example
// import { useFeatureXStore } from '@/store/modules/featureX.s';

// export function useFeatureX() {
//   const store = useFeatureXStore();
//   const performAction = async (params: any) => {
//     try {
//       await store.fetchDataWithAction(params);
//       ElMessage.success('Operation successful!');
//     } catch (error) {
//       ElMessage.error('Operation failed. Please try again.');
//       console.error('FeatureX action error:', error);
//     }
//   };
//   return { performAction };
// }
````

#### 4. 类型安全

*   **全面定义**: 为 Props, Emits, Composable 函数返回值, Store State/Actions, API 参数/响应等提供完整的 TypeScript 类型定义。
*   **利用泛型**: 在需要的地方使用泛型增强代码的灵活性和复用性，同时保持类型安全。

````typescript
// filepath: src/composables/useTypedFeature.ts
// ✅ 完整的类型定义
// import { ref } from 'vue';
// import type { Ref } from 'vue';

// interface FeatureOptions {
//   id: string;
//   isEnabled?: boolean;
// }

// interface FeatureResult {
//   status: Ref<string>;
//   updateOptions: (options: Partial<FeatureOptions>) => Promise<void>;
// }

// export function useTypedFeature(initialOptions: FeatureOptions): FeatureResult {
//   const status = ref('idle');
//   // ... implementation ...
//   const updateOptions = async (options: Partial<FeatureOptions>) => {
//     status.value = 'updating';
//     // ... async logic ...
//     status.value = 'updated';
//   };
//   return { status, updateOptions };
// }
````

### 🎯 开发流程

1.  **设计阶段 (Types)**: 首先定义相关功能的 TypeScript 类型和接口 (`*.d.ts`)，明确数据结构和契约。
2.  **数据层 (Store)**: 如果涉及全局状态或复杂数据交互，实现 Pinia Store (`*.s.ts`)，定义 State, Getters, Actions，封装 API 调用和数据缓存逻辑。
3.  **逻辑层 (Composable)**: 开发 Composable 函数 (`use*.ts`)，封装业务逻辑、调用 Store Actions、处理副作用、管理局部状态。
4.  **展示层 (Component)**: 创建 Vue 组件 (`*.vue`)，专注于 UI 渲染和用户交互，调用 Composable 获取数据和方法。
5.  **API层**: 定义和实现与后端交互的 API 调用函数 (e.g., in `src/api/`).
6.  **测试**: 编写单元测试和集成测试，确保各层职责清晰、功能正确。

通过这种架构，我们能够实现高内聚、低耦合的代码组织，提升项目的可维护性、可扩展性和团队协作效率。

---

## 四、路由设计

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

## 五、页面视图设计

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
  - AI 阅读助手核心功能集成，实现“前情提要”和“名词解释”功能，采用 SSE 流式加载优化体验，并对 AI 交互弹窗（如 Think 标签折叠）进行优化。

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
    │   ├── useAIToolbarStore.ts          # AI 工具栏逻辑 (已扩展支持新AI功能)
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
  - **AI 功能相关 Composables**：新增 `useTextSelector.ts` (文本选择逻辑复用) 和 `useAIToolbar.ts` (AI工具栏功能封装，进一步细化) 等，用于管理 AI 交互的复杂逻辑。

- **功能增强**：
  - **AI 助手**：集成“前情提要”和“名词解释”功能，通过 `AIToolbar.vue` 触发。
    - **前情提要**：用户可请求当前章节之前的内容概要，通过流式 SSE 技术实时展示。
    - **名词解释**：用户选中书中特定名词后，可请求 AI 进行解释，同样支持流式展示和缓存。

- **待办事项**：
  - 完善翻页模式（滚动/章节翻页）。
  - 对接后端 API 实现书签、书架持久化。
  - ~~实现 AI 工具栏各功能~~ (核心功能“前情提要”、“名词解释”已实现，持续迭代)。
  - 扩展 AI 对话、剧情推演等高级 AI 功能。
  - 优化 UI/UX 细节与性能，包括 AI 交互体验。

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

## 六、组件设计

### 1. 公共组件

- **AppHeader.vue**：顶部导航栏（Logo、搜索、用户头像、登录/注册）
  - **功能**：
    - 品牌展示区：渐变 LOGO 文字，点击跳转首页。
    - 分类导航系统：智能下拉菜单，网格布局分类项，边界检测逻辑。
    - 用户状态系统：头像悬浮效果，登录按钮组，用户菜单。
  - **样式特点**：
    - **渐变 LOGO**：通过 `background-clip: text` 实现文字裁剪效果。
    - **智能下拉菜单**：绝对定位实现悬浮效果，网格布局分类项。
    - **头像悬浮效果**：圆形裁剪，缩放动画。
    - **动态投影系统**：伪元素创建多层阴影效果。
    - **箭头动画系统**：通过 `transform` 实现箭头旋转动画。
    - **响应式适配**：媒体查询优化移动端布局。
  - **实现技术**：
    - 使用 Element Plus 的 `<el-dropdown>` 深度定制。
    - 共享渐变配色系统，统一过渡动画时长。
    - 用户登录状态通过 Pinia 全局管理。

- **SearchBar.vue**：关键词搜索、分类筛选
  - **功能**：
    - 输入控制系统：支持回车搜索与按钮点击双模式。
    - 搜索按钮系统：渐变背景，动态投影，精准高度匹配输入框。
  - **样式特点**：
    - **焦点动画系统**：输入框聚焦时产生上移效果。
    - **压力反馈设计**：按钮按下时的状态变化。
    - **移动端适配**：输入框高度调整优化触控体验。
  - **实现技术**：
    - 使用 Element Plus 输入框深度定制。
    - 搜索参数通过路由 `query` 传递。
    - 父组件通过 `showSearch` prop 控制显隐。

- **Pagination.vue**：分页组件
  - **功能**：
    - 基于 Element Plus 二次封装，支持背景色、渐变激活状态、悬停动效等视觉效果。
    - 响应式布局，自动适配移动端。
    - 提供上一页、下一页、页码跳转功能。
  - **样式特点**：
    - **毛玻璃效果**：通过 `backdrop-filter: blur()` 实现背景模糊。
    - **悬停动效**：按钮悬停时产生浮动效果和渐变高亮。
    - **激活状态**：选中页码时使用蓝紫色渐变背景和深层阴影。
    - **响应式处理**：移动端隐藏跳转框，缩小按钮尺寸。
  - **实现技术**：
    - 使用 `::v-deep` 穿透 scoped 样式限制，覆盖 Element 默认样式。
    - 动态主题支持，通过 CSS 变量实现主题切换。
    - 性能优化，使用 `transform` 硬件加速动画。
- **LoadingSpinner.vue**：加载提示
- **ConfirmDialog.vue**：确认对话框

### 2. 用户相关组件

- **UserAuth.vue**：用户认证组件
  - **功能**：
    - 双模态框切换：支持登录与注册弹窗的无缝切换。
    - 表单验证体系：即时反馈，支持用户名、密码、邮箱格式验证及密码一致性验证。
    - 数据交互：支持真实 API 与 Mock API 切换，登录成功后存储用户信息到 Pinia 状态库。
    - 用户体验优化：回车键提交、加载状态按钮、关闭弹窗自动重置表单。
  - **样式特点**：
    - **统一视觉风格**：固定宽度弹窗，渐变蓝色标题栏，输入框聚焦光晕效果。
    - **动态效果**：弹窗入场动画，按钮悬停渐变效果，链接下划线生长动画。
    - **响应式设计**：优化移动端布局，输入框最大宽度限制。
  - **实现技术**：
    - 使用 `modelValue` 实现父组件对弹窗显示状态的控制。
    - 表单验证分层设计，支持自定义验证器和即时反馈。
    - Pinia 状态管理存储用户信息，支持 API 策略模式切换。
    - 动画系统：CSS 动画实现弹窗入场效果，按钮特效增强交互体验。

- **LoginModal.vue**：登录弹窗
  - **功能**：
    - 用户名和密码验证（3-20字符，5-20字符）。
    - 支持回车键提交。
    - 登录成功后存储用户信息到 Pinia 状态库。
  - **样式特点**：
    - **渐变标题栏**：通过 `background: linear-gradient(135deg, #409eff, #3375ff)` 实现。
    - **按钮悬停效果**：流光动画增强视觉效果。
    - **响应式适配**：优化输入框布局和触控体验。
  - **实现技术**：
    - 使用 `emit('switch-to-register')` 实现与注册弹窗的切换。
    - 表单验证规则使用 `reactive` 对象避免重复创建。
    - 错误提示统一通过 `ElMessage` 实现。

- **RegisterModal.vue**：注册弹窗
  - **功能**：
    - 用户名、邮箱格式、密码验证（3-20字符，6-20字符）。
    - 密码一致性验证。
    - 支持确认密码框回车键提交。
  - **样式特点**：
    - **动态标题栏**：与登录弹窗一致的渐变视觉效果。
    - **输入框聚焦光晕**：通过 `box-shadow` 实现。
    - **移动端优化**：顶部布局的 label 提升触控体验。
  - **实现技术**：
    - 使用 `emit('switch-to-login')` 实现与登录弹窗的切换。
    - 自定义验证器实现密码一致性验证。
    - API 交互支持真实与 Mock 数据切换。

### 3. 书籍展示相关组件

- **BookGridItem.vue**：网格项（封面、书名）
  - **新增功能**：实现鼠标悬停时的3D翻页效果，封面产生立体翻页动效，同时伴随书脊阴影变化。
    - **实现原理**：
      - **3D空间构建**：通过`perspective: 1800px`创建3D视域，`transform-style: preserve-3d`保持子元素3D变换。
      - **轴心控制**：`transform-origin: left center`设置翻页轴心为左侧中线。
      - **动态角度**：通过`rotateY(-25deg)`实现Y轴旋转，配合`cubic-bezier`曲线实现物理回弹效果。
      - **书脊阴影**：`.book-spine`使用线性渐变模拟书脊光影，通过`rotateY(-60deg)`与主封面形成立体夹角。

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
  - **说明**：AI 工具栏 (`AIToolbar.vue`) 进一步封装，负责触发“前情提要”、“名词解释”等 AI 功能模态框。
- **ReaderSettingsPanel.vue**：阅读设置
- **BookmarkManager.vue**：书签管理
- **ReadingProgressBar.vue**：进度条
- **AIToolbar.vue**：AI 工具栏（已独立为 `toolbar/AIToolbar.vue`，并扩展支持新功能）
- **CatalogModal.vue**：目录模态框
- **SettingsModal.vue**：设置模态框
- **GuideToolbar.vue**：阅读指南模态框
- **PreviousSummaryModal.vue** (`components/reader/modals/PreviousSummaryModal.vue`)：前情提要弹窗组件
  - **功能**：左侧滑入式弹窗，用于流式展示 AI 生成的前情提要内容。支持暗色模式。
  - **交互**：支持加载状态显示，用户可中断内容生成。
- **TermExplanationModal.vue** (`components/reader/modals/TermExplanationModal.vue`)：名词解释弹窗组件
  - **功能**：用于展示选中名词的 AI 解释，支持流式输出和内容缓存。
  - **Think 标签处理**：AI 思考过程（标记为 "Think"）的内容支持折叠/展开，优化阅读体验。采用渐变背景、图标切换和紧凑布局。
- **ChapterBookmark.vue**：章节书签按钮
- **TextSelector.vue**：文本选择工具
- **RightControls.vue**：右侧控制按钮组
- **NavigationButtons.vue**：章节导航按钮

> 说明：阅读器相关组件已按功能模块进一步细分，提升了可维护性和复用性。

### 4. 交互特效组件

- **HoverRipple.vue**：鼠标跟随涟漪效果
  - **功能**：光标移动时产生粒子光晕跟随效果。
  - **实现原理**：
    - **坐标捕获**：通过`@mousemove`事件获取相对容器的精确坐标。
    - **CSS变量注入**：将坐标值通过`--x`/`--y`变量传递到样式。
    - **渐变渲染**：使用`radial-gradient`创建圆形透明渐变，`closest-side`保证渐变区域自适应。
    - **性能优化**：`pointer-events: none`避免涟漪层阻挡鼠标事件。

### 5. 分类标签组件

- **CategoryRibbon.vue**：分类标签斜角飘带
  - **功能**：分类标签以45度角呈现立体飘带效果。
  - **实现原理**：
    - **定位技巧**：通过`right: -24px`将元素右移，配合`rotate(45deg)`旋转形成斜角。
    - **透视处理**：`transform: translateZ(10px)`提升层级，避免被封面图片遮挡。
    - **阴影叠加**：多层`box-shadow`营造立体层次感。
    - **自适应文字**：`padding`与`font-size`比例控制，确保不同文字长度下呈现一致效果。

---

## 七、交互与数据流设计

### 1. 状态管理（Pinia）

- **userStore**：用户信息、登录状态、阅读偏好
- **bookStore**：书籍列表、当前阅读、搜索结果
- **readerStore**：阅读进度、书签、阅读设置
- **aiStore**：AI 对话历史、内容缓存。
  - **扩展**：新增状态管理 AI 功能，如 `explanationState` 用于名词解释（管理可见性 `isVisible`、加载状态 `isLoading`、流式状态 `isStreaming`、内容 `content`、当前术语 `currentTerm`），以及类似状态管理前情提要。

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
- **AI 功能交互**：
  - **前情提要**：用户点击 AI 工具栏“前情提要”按钮 → `PreviousSummaryModal.vue` 滑出 → 调用 `streamChat` API → SSE 流式接收并展示内容 → 用户可中断。
  - **名词解释**：用户在阅读内容中划词 → 触发文本选择工具 (`TextSelector.vue`) → 点击“名词解释” → `TermExplanationModal.vue` 弹出 → 调用 `explanation` API (传递 `bookId`, `chapterTitle`, `prompt` 等参数) → SSE 流式接收并展示内容 (Think 标签可折叠) → 用户可中断。
- **用户数据管理**：登录/注册 → 用户中心 → 管理书架/书签/偏好

### 3. API 请求流程

1. 组件调用 API 方法（如 `loginAPI` 或 AI 服务 API）
2. API 方法通过 `request.ts` (通用请求) 或特定服务封装 (如 AI 服务，可能使用 `fetch` API 配合 `AbortController` 实现可取消的流式请求) 发送请求。
3. 请求拦截器自动添加 token（从 Pinia 获取）
4. 服务器响应 (AI 服务可能为 `text/event-stream` 类型)
5. 响应拦截器处理状态码、错误（如 401 跳转登录页）。对于流式响应，客户端实时处理数据片段。
6. 组件获取结果，更新 UI 或状态。

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

#### AI 服务流式请求处理
- **技术选型**：采用 `fetch` API 结合 `AbortController` 实现可取消的流式请求，通过 Server-Sent Events (SSE) 接收实时数据。
- **实现**：
  ```typescript
  // 示例：使用fetch + AbortController实现可取消的流式请求
  // const currentController = new AbortController();
  // const response = await fetch(url, {
  //   method: 'GET', // or 'POST'
  //   headers,
  //   signal: currentController.signal,
  //   // body: JSON.stringify(payload) // if POST
  // });
  // const reader = response.body?.getReader();
  // // 实时处理数据流，支持用户通过 currentController.abort() 中断
  ```
- **优势**：提升用户体验，AI 生成内容无需等待完整响应即可逐步展示；用户可随时中断耗时操作。

---

## 八、用户相关接口与类型定义

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

## 八点五、AI 服务接口 (新增或调整章节号)

### 1. 前情提要 (流式输出)

- **路径**：`GET /api/v1/AIService/streamChat` (或 POST，根据实际情况调整)
- **请求参数/体**：
  - `bookId`: string (书籍ID)
  - `chapterId` (或 `chapterTitle`): string (章节标识)
  - 其他必要参数 (如用户历史、上下文等)
- **响应类型**：`text/event-stream`
- **功能**：根据书籍和章节信息，流式返回前情提要内容。支持基于书籍ID和章节号的缓存。

### 2. 名词解释

- **路径**：`POST /api/v1/AIService/explanation`
- **请求体**：
  ```json
  {
    "bookId": "string",
    "chapterTitle": "string",
    "prompt": "string" // 用户选中的文本或处理后的查询词
  }
  ```
- **响应类型**：`text/event-stream` (如果也采用流式) 或 `application/json`
- **功能**：解释用户选中的名词或短语。支持基于完整参数键的缓存策略。

---

## 九、API 接口封装示例

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

## 十、模拟接口实现（Mock）

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

## 十一、组件中使用 API 示例

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

## 十二、总结

本技术文档介绍了项目的整体架构、目录结构、核心技术栈、主要页面与组件设计、状态管理、API 封装与数据流、类型定义、模拟接口实现及组件实际用法。通过模块化、类型安全和高效的通信机制，保障了前端开发的高效与可维护性。

---

## 十三、开发进度与优化记录

### 1. ReaderPage.vue 基本实现（2024.4.22）

- 完成章节内容加载、章节导航、三栏式布局、目录/书签/设置/AI 工具栏等基础功能。
- 支持亮/暗主题切换、响应式布局、文本选择交互、AI 工具栏占位。

### 2. ReaderPage.vue 组件拆分优化（2024.4.23）

- 针对代码量大、职责不清晰等问题，采用“关注点分离”原则，拆分为 Pinia Store、Composables、Components 三层。
- 组件层按功能模块分类，命名语义化，职责单一。
- 业务逻辑层实现逻辑复用，UI 与逻辑解耦。
- 数据管理层集中管理应用状态，支持持久化。
- 优化后代码组织更清晰，复用性和可维护性大幅提升。

### 3. AI 阅读助手核心功能上线 (2025.6.10)

- **概述**：集成了 AI阅读助手的核心功能，包括“前情提要”和“名词解释”。重点优化了 AI 内容的流式加载体验 (SSE) 和交互细节。
- **主要成果**：
  - **功能实现**：成功对接 `/api/v1/AIService/streamChat` 和 `/api/v1/AIService/explanation` API。
  - **技术亮点**：应用 SSE 技术实现 AI 内容实时流式输出；通过 `AbortController` 实现用户可中断的请求；`Pinia` 集中管理 AI 功能状态；对 AI 思考过程的 "Think" 标签进行特殊可折叠处理。
  - **组件化**：新增 `PreviousSummaryModal.vue` 和 `TermExplanationModal.vue` 等专用组件。
  - **体验优化**：提升了加载、中断等交互的即时反馈和视觉效果，支持暗色模式。
  - **问题解决**：处理了流式响应强制关闭、Think 标签样式、热重载兼容性等问题。
- **状态**：核心功能完整，已投入使用。详细技术实现已融入本文档相关章节。
- **后续**：规划性能优化（智能缓存）、功能扩展（AI对话、剧情推演）、用户定制及多语言支持。

---