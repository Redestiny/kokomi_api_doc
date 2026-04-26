import { defineConfig } from 'vitepress'

const domain = 'https://docs.kokomi-api.cc'
const base = '/'
const previewImage = `${domain}/kokomi-api.png`

const rootSidebar = [
  { text: '接入信息', link: '/#integration-details' },
  { text: '快速开始', link: '/#quick-start' },
  { text: 'OpenAI 兼容接口', link: '/#openai-compatible-api' },
  { text: 'Anthropic 兼容接口', link: '/#claude-anthropic-compatible-api' },
  { text: 'Codex 配置', link: '/#codex-configuration' },
  { text: 'Claude Code 配置', link: '/#claude-code-configuration' },
  { text: '常见问题', link: '/#faq' },
  { text: '支持', link: '/#support' }
]

const enSidebar = [
  { text: 'Integration Details', link: '/en/#integration-details' },
  { text: 'Quick Start', link: '/en/#quick-start' },
  { text: 'OpenAI-Compatible API', link: '/en/#openai-compatible-api' },
  { text: 'Anthropic-Compatible API', link: '/en/#claude-anthropic-compatible-api' },
  { text: 'Codex Configuration', link: '/en/#codex-configuration' },
  { text: 'Claude Code Configuration', link: '/en/#claude-code-configuration' },
  { text: 'FAQ', link: '/en/#faq' },
  { text: 'Support', link: '/en/#support' }
]

export default defineConfig({
  title: 'Kokomi-api',
  description: 'Kokomi-api API relay documentation',
  base,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: domain
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/kokomi-api.png' }],
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/kokomi-api.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/kokomi-api.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kokomi-api Docs' }],
    ['meta', { property: 'og:title', content: 'Kokomi-api Docs' }],
    ['meta', { property: 'og:description', content: 'Kokomi-api API relay documentation' }],
    ['meta', { property: 'og:url', content: domain }],
    ['meta', { property: 'og:image', content: previewImage }],
    ['meta', { property: 'og:image:alt', content: 'Kokomi-api' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Kokomi-api Docs' }],
    ['meta', { name: 'twitter:description', content: 'Kokomi-api API relay documentation' }],
    ['meta', { name: 'twitter:image', content: previewImage }]
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Kokomi-api',
      description: 'Kokomi-api API 中转站文档',
      themeConfig: {
        nav: [
          { text: '控制台', link: 'https://kokomi-api.cc' }
        ],
        sidebar: rootSidebar,
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: false,
        lastUpdated: {
          text: '最后更新'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Kokomi-api',
      description: 'Kokomi-api API relay documentation',
      themeConfig: {
        nav: [
          { text: 'Console', link: 'https://kokomi-api.cc' }
        ],
        sidebar: enSidebar,
        outline: false
      }
    }
  },
  themeConfig: {
    logo: '/kokomi-api.png',
    siteTitle: 'Kokomi-api',
    search: {
      provider: 'local'
    },
    outline: false,
    aside: false,
    footer: {
      message: 'Kokomi-api API relay documentation.',
      copyright: 'Copyright © 2026 Kokomi-api'
    }
  }
})
