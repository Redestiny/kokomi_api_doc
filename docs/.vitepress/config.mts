import { defineConfig } from 'vitepress'

const domain = 'https://docs.kokomi-api.cc'

export default defineConfig({
  title: 'Kokomi-api',
  description: 'Kokomi-api API relay documentation',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: domain
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kokomi-api Docs' }],
    ['meta', { property: 'og:url', content: domain }]
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Kokomi-api',
      description: 'Kokomi-api API 中转站文档',
      themeConfig: {
        nav: [
          { text: '快速开始', link: '/quick-start' },
          { text: 'OpenAI 兼容', link: '/openai' },
          { text: 'Claude 兼容', link: '/claude' },
          { text: '常见问题', link: '/faq' },
          { text: '控制台', link: 'https://kokomi-api.cc' }
        ],
        sidebar: [
          {
            text: '开始',
            items: [
              { text: '首页', link: '/' },
              { text: '快速开始', link: '/quick-start' }
            ]
          },
          {
            text: 'API 接入',
            items: [
              { text: 'OpenAI 兼容', link: '/openai' },
              { text: 'Claude/Anthropic 兼容', link: '/claude' }
            ]
          },
          {
            text: '帮助',
            items: [
              { text: '常见问题', link: '/faq' }
            ]
          }
        ],
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '页面目录'
        },
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
          { text: 'Quick Start', link: '/en/quick-start' },
          { text: 'OpenAI Compatible', link: '/en/openai' },
          { text: 'Claude Compatible', link: '/en/claude' },
          { text: 'FAQ', link: '/en/faq' },
          { text: 'Console', link: 'https://kokomi-api.cc' }
        ],
        sidebar: [
          {
            text: 'Start',
            items: [
              { text: 'Home', link: '/en/' },
              { text: 'Quick Start', link: '/en/quick-start' }
            ]
          },
          {
            text: 'API Integration',
            items: [
              { text: 'OpenAI Compatible', link: '/en/openai' },
              { text: 'Claude/Anthropic Compatible', link: '/en/claude' }
            ]
          },
          {
            text: 'Help',
            items: [
              { text: 'FAQ', link: '/en/faq' }
            ]
          }
        ]
      }
    }
  },
  themeConfig: {
    logo: '/kokomi-api.png',
    siteTitle: 'Kokomi-api',
    search: {
      provider: 'local'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/',
        ariaLabel: 'GitHub placeholder'
      }
    ],
    footer: {
      message: 'Kokomi-api API relay documentation.',
      copyright: 'Copyright © 2026 Kokomi-api'
    }
  }
})
