import Vue from 'vue'
import App from './App'
import uniPromiseMethods from "./common/js/uni-method-promise.js"

Vue.config.productionTip = false

Vue.prototype.$uniPromiseMethods = uniPromiseMethods;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
