import { computed, observable, flow } from 'mobx'

export default class {
  @observable state = 'pending'
  @observable data = []
  @observable meta = { total: 0, page: 1, per_page: 20 }

  fetchApi = new Function() // 传入的 fetchApi 是一个函数 例： fetchApi: param => fly.get('items')
  param = {}

  fetchData = flow(function* () {
    this.state = 'pending'
    try {
      const { data, meta } = yield this.fetchApi({ page: 1, per_page: this.meta.per_page, ...this.param })
      this.data = data
      this.meta = meta
      this.state = 'done'
    } catch (error) {
      this.state = 'error'
      throw error
    }
  })

  tryFetchData() {
    return this.state !== 'done' && this.fetchData()
  }

  fetchMoreData = flow(function* () {
    if (!this.canLoadmore) return

    this.state = 'pending'
    try {
      const { data, meta } = yield this.fetchApi({ page: this.meta.page + 1, per_page: this.meta.per_page, ...this.param })
      this.data.push(...data)
      this.meta = meta
      this.state = 'done'
    } catch (error) {
      this.state = 'error'
      throw error
    }
  })

  findItemById(id) {
    return this.data.find(item => item.id === +id)
  }

  findIndexById(id) {
    return this.data.findIndex(item => item.id === +id)
  }

  removeItemById(id) {
    const index = this.findIndexById(id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.meta.total -= 1
    }
  }

  replaceItem(newItem) {
    const index = this.data.findIndex(item => item.id === newItem.id)
    if (index > -1) this.data.splice(index, 1, newItem)
  }

  unshift(item) {
    this.data.unshift(item)
    this.meta.total += 1
  }

  @computed
  get listStatus() {
    return {
      isNoMore: this.state === 'done' && this.data.length && this.data.length >= this.meta.total,
      isLoadingMore: this.state === 'pending' && this.data.length,
      isEmpty: this.state !== 'pending' && !this.data.length,
    }
  }

  @computed
  get canLoadmore() {
    return this.state === 'done' && this.data.length && this.data.length < this.meta.total
  }
}