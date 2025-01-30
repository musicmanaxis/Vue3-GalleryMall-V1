<!--
개요:쇼핑몰 갤러리를 운영하는 목적으로 
1.vue서버를 운영하는 프론트 서버와 spring 서버(GalleyrMallBackend)를 백앤드로 둔 프로젝트.

src/
├── main.js         # 애플리케이션 진입점 
├── App.vue         # 최상위 컴포넌트
├── router.js       # Vue Router 설정
├── store           # Vuex 상태 관리 설정
├── assets/         # 정적 파일 (CSS, 이미지 등)
└── components/     # 컴포넌트

2.사전설정
 2-1.package.json에서 로컬pc에서 스프링서버와 충돌을 피하기 위해 뷰서버 포트번호를 3000으로 변경 
     "scripts": {"serve": "vue-cli-service serve --port 3000"}
 2-2.vue.config.js에서 spring서버의 데이터를 받기 위해
     '/api': { target: 'http://localhost:8080'} api로 시작해서  들어오는 서버를 설정, 해당파일 참조 

3.vue.config.js는 url을 간소화하게 하기 위해서 미리 설정, 해당파일 참조
  현재, 스프링을 사용하는 컴포넌트는  Home.vue와 Login.vue에서 axios.get("/api/items")와 axios.post("api/account/login", state.form)로 요청하고 있다.
  http://localhost:3000/api/items로 요청하면 데이터가 날라오는데  http://localhost:3000 → Vue.js(프론트엔드) /api/items → Spring Boot(백엔드)구조로 되어있다.

4.main.js에서는 Vue 앱을 초기화하고, App.vue 컴포넌트를 <div id="app">에 마운트는 역할과 각 페이지 매핑의 라우터 설정을 여기서 한다.

5.설치해야할것:npm, npm install axios, npm install vue-router, npm install bootstrap, npm install, npm install vuex@next --save (password 암호화->store.js도 참조), 
 
6.Home컴포넌트가 첫 접속시 메인페이지가 된다..여기에서 서버에 아이템들을 가져와 전시하는 형태
  현재 Home 컴포넌트는 <RouterView /> 로 대체되어 있다...하단 설명 참조
-->

<template>

<Header />
<RouterView /> 
<!-- <RouterView /> 태그는 router.js에서 vue-router가 제공하는 태그로  router.js에서 설정한 routes경로가 여기에 렌더링 된다. 별도로 import가 필요없음
이것으로 인해서 header와 footer는 가만히 있는 상태에서 url에 따라 중간화면이 home이나 login페이지가 바뀐다-->
<!-- main.js에서 라우터를 설정하여 <Home />가 필요없게 하였다. -->
<!-- <Home /> -->
<Footer />

</template>

<script>
import HeaderComponent from './components/Header.vue';
//import HomeComponent from './pages/Home.vue';
import FooterComponent from './components/Footer.vue';
import store from './scripts/store.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

export default {
  name: 'App',
  components: {
   Header:HeaderComponent,
   //Home:HomeComponent,
   Footer:FooterComponent, 
   
  },
  setup(){
    const check=()=>{  //url이 바뀔때마다 스프링의 AccountController의 check()를 통해 로그인 여부를 체크
      axios.get("/api/account/check").then((Object)=>{
        console.log("App.vue에서 실행->스프링에 요청 후 data:"+Object.data);
        store.commit('setAccount', Object.data || 0);  //얻어온 id값이 있으면 setAccount에 전달, 없으면 0을 전달
        })
    };
//✔ **로그인 여부 체크는 "전역적인 동작"이라 App.vue에서 처리하는 게 적절.

    const route=useRoute();  //router.js에서 만든 라우터객체를 가져옴

    watch(route, ()=>{   //✔ **라우터(URL)가 변경될 때마다 로그인 상태를 확인하는 것도 여기서 하는 게 좋아!
      check();    //라우터에 매핑되어 있는 리스트에서 url이 바뀔때마다 check()를 실행
    }); 
  } //setup()
}

//주석:기존 내용..브라우저의 세션스토리지를 이용해서 로그인여부를 체크

//     const id=sessionStorage.getItem("id");  
//     //sessionStorage는 웹 브라우저가 제공하는 API, 브라우저에서 데이터를 클라이언트 측에 저장하기 위해 사용, 해당 탭을 닫으면 저장된 데이터도 삭제

//     if(id){
//       store.commit('setAccount', id); //이 코드는 새로고침을 했을 때 로그인 상태가 그대로 유지 된다.
//       //commit은 Vuex의 라이브러리에서 제공하는 내장 메서드 -> mutations를 호출하기 위해 사용
//     }
//   }
// }

// 주석:store.commit('setAccount', id)를 호출하면, Vuex의 mutations에 정의된 setAccount 함수가 호출되고, 
// 주석:여기에서 id가 두 번째 인자 값(sendId)로 전달됩니다. ->store.js참조
</script>


<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
</style>
