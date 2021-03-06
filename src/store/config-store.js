import { observable, flow, action } from 'mobx'
import { fetchAction, fly, g } from '@util'

export default new class {
  @observable data = {}
  @observable qiniuMeta = null

  @fetchAction
  fetchData() {
    return fly.get('site_configs')
  }

  setQiniuMeta = flow(function* () {
    const { data } = yield fly.get('qiniu_meta')
    this.qiniuMeta = data
    setTimeout(() => this.clearQiniuMeta(), data.expires_in * 1000)
  })

  @action
  clearQiniuMeta() {
    this.qiniuMeta = null
  }

  // 上传
  async upload(filePath = '') {
    if (!this.qiniuMeta) await this.setQiniuMeta()
    const { bucket_domain, token } = this.qiniuMeta

    try {
      const { data } = await g.p.uploadFile({ url: 'https://upload-z2.qiniup.com', name: 'file', filePath, formData: { token } })
      const key = JSON.parse(data).key
      return `https://${bucket_domain}/${key}`
    } catch (error) {
      this.clearQiniuMeta()
    }

  }

}
