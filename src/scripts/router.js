import { createRouter,createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Cart from '@/pages/Cart.vue'
import Order from '@/pages/Order.vue'
import Orders from '@/pages/Orders.vue'
import NotFound from '@/pages/NotFound.vue'

//컴포넌트와 경로가 1:1 배열행태로 매핑되게 한다. 위의 컴포넌트 갯수와 아래의 경로 갯수가 같다.

const routes=[
  {path:'/', component:Home},        // '/'로 들어올때는 Home으로 들어와라 는 뜻
  {path:'/login', component:Login},  // http://localhost:3000/login으로 접속해볼 것
  {path:'/cart', component:Cart}, 
  {path:'/order', component:Order},
  {path:'/orders', component:Orders},
  {path: '/:pathMatch(.*)*', component: NotFound },  //없는 주소를 입력했을 때 404 처리
]

const router=createRouter({  //라우터 객체 생성
  history:createWebHistory(),  //기본으로 명시하는게 좋다.안하면 Vue는 createWebHashHistory()를 사용해 URL에 해시(#)를 추가하여 작동
  routes
})

export default router;

