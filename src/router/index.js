import Vue from 'vue'
import Router from 'vue-router'
import MRIEditor from '@/components/MRIEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MRIEditor',
      component: MRIEditor
    }
  ]
})
