import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import Permission from '../components/Permission'
import Config from '../components/Config'
import Message from '../components/Message'
import MessageDetail from '../components/MessageComponents/MessageDetail'
import UserInfo from "../components/User/UserInfo";

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/permission', component: Permission },
  { path: '/config', component: Config },
  { path: '/message', component: Message },
  { path: '/messagedetail', component: MessageDetail },
  { path: '/userinfo', component: UserInfo },
]

const router = new VueRouter({
  routes
})

export default router
