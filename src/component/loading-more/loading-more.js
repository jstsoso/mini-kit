// 列表滚动加载底部状态
Component({
  properties: {
    listStatus: Object,
    emptyText: String,

    reachBottomText: {
      type: String,
      value: '到底了',
    },
  },
})
