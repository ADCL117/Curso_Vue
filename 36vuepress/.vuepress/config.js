module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/newGuide/' },
          { text: 'External', link: 'https://google.com' }
        ],
        sidebar: {
            '/newGuide/':[
                '',
                'vuepress-guide'
            ]
        }
      }
}