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
  lang: 'zh',
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
  lastUpdated: true,  // 显示每个页面最后更新时间戳
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",  // 搜索功能启用
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '在懒惰的Morning_Maple写的文档中没有找到你想要的',
                resetButtonTitle: '清空查询条件',
                footer: {
                  selectText: '选一下',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '主站点', link: 'https://morningmaple.top/' },
      // { text: '其他', link: '/测试1/API例子' },
    ],

    sidebar: generateSidebar(vitepressSidebarOptions),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Morning-Maple/blog' }
    ]
  }
})
