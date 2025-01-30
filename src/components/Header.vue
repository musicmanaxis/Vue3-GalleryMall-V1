<template>
  
  <header data-bs-theme="dark">
  <div class="collapse text-bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        
        <div class="col-sm-4  py-4">
          <h4>사이트맵</h4>
          <ul class="list-unstyled">
              <li>
                <router-link to="/" class="text-white">메인 화면</router-link>                
              </li>

              <li v-if="$store.state.account.id">   <!-- 사용자가 로그인을 하였다면 /orders페이지로 이동 처리 -->
                 <router-link to="/orders" class="text-white">주문 내역</router-link>                
              </li>

              <li>
                <router-link to="/login" class="text-white" v-if="!$store.state.account.id">로그인</router-link>
                <!-- !$store.state.account.id가 없으면 로그인이 보이고 있으면 로그아웃이 보인다. -->
                <a to="/login" class="text-white" @click="logout()" v-else>로그아웃</a>                  
              </li>
<!-- <router-link>:Vue Router 라이브러리가 제공하는 컴포넌트(<a> 태그와 유사하게 동작), 
     페이지를 새로 고침하지 않고 URL을 변경하며, 라우트와 연결된 컴포넌트를 표시,  to="/"는 라우터에서 정의된 루트 경로로 이동
     $는 Vue가 기본적으로 제공하는 객체나 메서드라는 것을 명시적 표기법. 사용자가 정의한 변수나 메서드와 구분역할. 뷰에서 제대로 동작않 할 수도 있음
     -->
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <strong>Gallery</strong>
      </router-link>
      
      <router-link to="/cart" class="cart btn" v-if="$store.state.account.id"> <!-- 로그인으르 했을 때만 카트를 보여주기 -->
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>  <!-- https://fontawesome.com/v4/icon/shopping-cart 에서 복사함 -->
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>

</template>

<script>
import router from '@/scripts/router';   //해당 스크립트에서 export한 명칭을 import문에 사용한다.
import store from '@/scripts/store';
import axios from 'axios';

export default{
  name:'HeaderComponent',

  setup(){
    const logout=()=>{
        axios.post("/api/account/logout").then((res)=>{
        store.commit('setAccount', 0);  // 로그아웃시  Vuex 상태 초기화, store.js의 setAccount에 0을 넘겨줌
        alert(res.data);
        router.push({path:'/'});        // 로그아웃이후 메인페이지로 이동
        //sessionStorage.removeItem("id"); //세션 스토리지에서 사용자 ID삭제 - 현재는 Vuex로 상태를 관리하므로 비활성화
        //새로고침을 할 경우 다시 sessionStorage에서 id를 가져오는 로직이 없으므로 sessionStorage.removeItem("id")을 생략해도 무방
        //하지만 보안을 위해서 추가하는 것이 합당
        console.log("HTTP 상태 코드:", res.status);       // 200
        console.log("상태 텍스트:", res.statusText);      // "OK"
        console.log("응답 데이터:", res.data);  
        
      });
    }
    return{logout}
  }
// 로그아웃  완벽 처리->프론트엔드(Vue)와 백엔드(Spring) 양쪽에서 처리.
//1.백엔드(Spring):서버에 남아 있는 인증 정보를 삭제해야 하며, 보통 쿠키를 활용하여 처리. 
//               예를 들어, 쿠키의 값을 비우거나 만료시켜 클라이언트가 더 이상 인증 정보를 보낼 수 없도록 한다.
//2.프론트엔드(Vue):백엔드에서 인증 정보가 삭제된 후, 클라이언트 측에서도 Vuex 상태를 초기화하고, 
//               필요한 경우 리다이렉션(예: 메인 페이지 이동)을 처리한다.
   
}
</script>

<style scoped>
header ul li a {
  cursor: pointer;    /* 포인터 지정:테두리를 그린다. */
}

header .navbar .cart{
  margin-left:auto;    /* cart를 오른쪽으로 이동 */
  color: white;
}
</style>


