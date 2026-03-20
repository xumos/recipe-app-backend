export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '智能菜谱规划' })
  : { navigationBarTitleText: '智能菜谱规划' }
