// 自定义导航
import { goBack, isTabPage, APP_NAME, ui, g } from '@util'

Component({

  properties: {
    statusBar: { type: Boolean, value: true },
    nav: { type: Boolean, value: true },
    customStyle: { type: String, value: 'background: #000' },
    title: { type: String, value: APP_NAME },
  },

  observers: {
    'title': function(title) { g.setNavigationBarTitle({ title }) },
  },

  lifetimes: {
    attached() { this.init() },
  },

  data: {
    isTabPage: true,
  },

  methods: {
    goBack() { this.data.isTabPage || goBack() },
    noop() {},

    init() {
      this.setData({
        navbarInfo: ui.getNavbarInfo(),
        isTabPage: isTabPage(),
      })
    },

  },
})
