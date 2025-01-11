import {DefaultTheme, defineConfig} from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";

/**
 * vitepressSidebar的配置
 */
const vitepressSidebarOptions = {
  documentRootPath: "/docs",
  collapsed: false, //折叠组关闭
  collapseDepth: 2, //折叠组2级菜单
  removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
  prefixSeparator: "_", //删除前缀的符号
  excludePattern: ['assets/'], // 排除目录
  scanStartPath: 'src', // 指定文档存放的目录，也就是从哪里开始出现侧边栏
};

/**
 * 日期更新时间戳配置
 */
const lastUpdatedOptions: DefaultTheme.LastUpdatedOptions = {
  text: 'Lazy man Updated at',
  formatOptions: {
    forceLocale: true,
    timeZone: 'Asia/Shanghai',
    timeZoneName: 'longOffset',
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    hour12: false,
  }
}

const searchOptions: DefaultTheme.LocalSearchOptions = {
  detailedView: "auto",
  translations: {
    button: {
      buttonText: '搜索一下，你就知道',
      // buttonAriaLabel: '搜索',
    },
    modal: {
      displayDetails: '更为详细',
      resetButtonTitle: '清空',
      backButtonTitle: '回退',
      noResultsText: '在文档内找不着相关的内容:',
      footer: {
        selectText: "选择",
        // selectKeyAriaLabel: "选择",
        navigateText: "导航",
        navigateUpKeyAriaLabel: "上一页",
        navigateDownKeyAriaLabel: "下一页",
        closeText: "关掉",
        // closeKeyAriaLabel: "关掉",
      },
    }
  }
}

const notFoundOptions: DefaultTheme.NotFoundOptions = {
  title: "找不到你想要的页面欸",
  quote: "你知道的，我并不是想要阻止你什么，但是你确实是来到了我的未知领域，也许下次来就不是404了？",
  // linkLabel: "",  // 为主页链接设置a标签，貌似没啥用
  linkText: "带我回去",
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 构建类
  lang: 'zh-Hans',
  title: "Morning_Maple",
  titleTemplate: '枫のBlog',
  description: "Morning_Maple的个人博客",
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }]
  ],
  vite: {
    publicDir: '../public'
  },
  srcDir: 'src',
  base: '/',
  cleanUrls: true,  // 支持index.md用index访问，如果平台不支持，请设为false
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: '../dist',
  assetsDir: 'static',  // 静态文件存放地（在outDir内的）
  cacheDir: './.vitepress/cache', // 缓存
  ignoreDeadLinks: false, // 死链，详情看：https://vitepress.dev/zh/reference/site-config#ignoredeadlinks
  metaChunk: false, // 页面过多设为true，能缓存页面元数据并减少服务器带宽

  // Markdown-it配置
  markdown: {
    lineNumbers: true,  // 行号显示
    image: {
      lazyLoading: true,  // md文件内的图片懒加载
    },
    codeCopyButtonTitle: '借鉴一下',  // 代码块右上角复制按钮的文本
  },

  // 主题类
  appearance: true,
  // 显示每个页面最后更新时间戳
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 搜索功能
    search: {
      provider: "local",  // 搜索功能启用
      options: searchOptions,
    },
    // 脚标
    footer: {
      message: `<a href="https://morningmaple.top" style="text-decoration: none">Game & Life</a>`,
      copyright: `Copyright © 2025-${new Date().getFullYear().toString()} <a href="https://github.com/Morning-Maple" style="text-decoration: none">Morning_Maple</a>`,
    },
    // lastUpdated的主题配置
    lastUpdated: lastUpdatedOptions,
    // 中文汉化文本，用于覆盖默认样式
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切到明亮主题',
    darkModeSwitchTitle: '切换黑暗主题',
    sidebarMenuLabel: '收纳盒',
    returnToTopLabel: '↑Top↑',
    // langMenuLabel: '切换语言',  // 没用i18n此配置无效
    // 404页面
    notFound: notFoundOptions,
    outline: {
      level: [2, 6],  // 大纲显示从h2到h6
      label: '大纲',  // 修改右上角的on this page
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '主站点', link: 'https://morningmaple.top/' },
    ],

    sidebar: generateSidebar(vitepressSidebarOptions),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Morning-Maple/blog' }
    ]
  }
})
