export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '晴宝咱吃啥' })
  : { navigationBarTitleText: '晴宝咱吃啥' }
