import { createApp } from 'vue'  
import router from "@/scripts/router.js" //라우터 설정, npm i vue-router   라우처를 먼저 설치해야 실행이 된다.
import store from "@/scripts/store.js"  //main.js에서 store.js(Vuex)를 사용하겠다.
import App from './App.vue' //뷰 계층 구조의 루트로 설정



createApp(App).use(store).use(router).mount('#app') 
//createApp() 함수는 새로운 Vue 애플리케이션 인스턴스를 생성