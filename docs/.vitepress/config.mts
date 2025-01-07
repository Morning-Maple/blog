import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";

const vitepressSidebarOptions = {
  documentRootPath: "/docs",
  collapsed: false, //折叠组关闭
  collapseDepth: 2, //折叠组2级菜单
  removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
  prefixSeparator: "_", //删除前缀的符号
  excludePattern: ['assets/'], // 排除src目录
  scanStartPath: 'src', // 指定文档存放的目录，也就是从哪里开始出现侧边栏
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 构建类
  lang: 'zh-CN',
  title: "Morning_Maple",
  titleTemplate: '枫のBlog',
  description: "Morning_Maple的个人博客",
  srcDir: 'src',
  base: '/',
  cleanUrls: true,  // 支持index.md用index访问，如果平台不支持，请设为false
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: '../dist',
  assetsDir: 'static',  // 静态文件存放地（在outDir内的）
  cacheDir: './.vitepress/cache', // 缓存
  ignoreDeadLinks: false, // 死链，详情看：https://vitepress.dev/zh/reference/site-config#ignoredeadlinks
  metaChunk: false, // 页面过多设为true，能缓存页面元数据并减少服务器带宽

  // 主题类
  appearance: true,
  lastUpdated: true,  // 显示每个页面最后更新时间戳
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown模板' },
      { text: '其他', link: '/测试1/API例子', }
    ],

    sidebar: generateSidebar(vitepressSidebarOptions),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Morning-Maple/blog' }
    ]
  }
})
