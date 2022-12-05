module.exports = {
  title: 'test', // 网站标题
  base: '/plug-in-set/',
  description: '网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中',
  plugins: [
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
      },
    ],
  ],
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }], // 标签页的icon
  ],
  // plugins: ['vuepress-plugin-demo-container'],
  themeConfig: {
    // logo: '/logo.png',  // 导航栏logo
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      // { text: 'Home', link: '/' },
      { text: '布局', link: '/layout/pageListBox' },
      { text: '组件', link: '/fontcom/pagination' },
      { text: '代码库demo', link: '/demo/superslide' },
      { text: 'utils', link: '/utils/function' },
    ],
    sidebar: {
      //对象的默认路径
      '/layout/': [
        // '',
        {
          title: '布局',
          collapsable: false,
          children: ['pageListBox'],
        },
      ],
      '/fontcom/': [
        // '',
        {
          title: '组件',
          collapsable: false,
          children: ['ellipsis', 'pagination'],
        },
      ],
      '/demo/': [
        {
          collapsable: false,
          children: ['superslide', 'screenfull', 'pie3d', 'hyjz'],
        },
      ],
      '/utils/': [
        {
          collapsable: false,
          children: ['function'],
        },
        {
          collapsable: false,
          children: ['dom'],
        },
        {
          collapsable: false,
          children: ['reg-exp'],
        },
        {
          collapsable: false,
          children: ['weather'],
        },
      ],
    },
    sidebarDepth: 1, // 默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
  },
}
