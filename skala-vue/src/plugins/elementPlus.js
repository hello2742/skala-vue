import { ElAlert, ElForm, ElFormItem, ElInput, ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-alert.css'
import 'element-plus/theme-chalk/el-form.css'
import 'element-plus/theme-chalk/el-form-item.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-loading.css'

// Element Plus 등록과 전용 스타일을 앱 진입점에서 분리합니다.
export default {
  install(app) {
    app.component('ElAlert', ElAlert)
    app.component('ElForm', ElForm)
    app.component('ElFormItem', ElFormItem)
    app.component('ElInput', ElInput)
    app.directive('loading', ElLoading)
  },
}
