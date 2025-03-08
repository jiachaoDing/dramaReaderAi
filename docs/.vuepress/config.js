import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '剧想·智读',
  description: 'AI驱动的沉浸式阅读与学习平台',
  head: [
    // 标准 favicon - 使用完整路径
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/dramaReaderAi/images/favicon.ico' }],
    // Apple 触摸图标
    ['link', { rel: 'apple-touch-icon', href: '/dramaReaderAi/images/logo.png' }],
    // PWA 图标
    ['link', { rel: 'mask-icon', href: '/dramaReaderAi/images/logo.png', color: '#3eaf7c' }],
    // 备用 favicon
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/dramaReaderAi/images/favicon.ico' }]
  ],

  // GitHub Pages 部署配置
  // 注意：这里的 base 必须与仓库名称完全一致，包括大小写
  base: '/dramaReaderAi/',

  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      { 
        text: '项目介绍', 
        children: [
          { text: '项目概述', link: '/intro/' },
          { text: '技术架构', link: '/intro/tech/' },
          { text: '功能特性', link: '/intro/features/' }
        ]
      },
      { 
        text: '技术文档', 
        children: [
          { text: '前端开发', link: '/tech/frontend/' },
          { text: '后端开发', link: '/tech/backend/' },
          { text: 'AI 模型', link: '/tech/ai/' },
          { text: '知识图谱', link: '/tech/knowledge-graph/' }
        ]
      },
      { text: '开发计划', link: '/roadmap/' },
      { text: '关于我们', link: '/about/' }
    ],
    
    sidebar: {
      '/intro/': [
        {
          text: '项目介绍',
          children: [
            '/intro/README.md',
            '/intro/tech/README.md',
            '/intro/features/README.md',
          ],
        },
      ],
      '/tech/': [
        {
          text: '技术文档',
          children: [
            '/tech/frontend/README.md',
            '/tech/backend/README.md',
            '/tech/ai/README.md',
            '/tech/knowledge-graph/README.md',
          ],
        },
      ],
    },

    repo: 'jiachaoDing/dramaReaderAi',
    editLink: true,
    lastUpdated: true,
    contributors: true,
  }),

  bundler: viteBundler(),
})
