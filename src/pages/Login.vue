<template>
   <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="check2" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </symbol>
      <symbol id="circle-half" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
      </symbol>
      <symbol id="moon-stars-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
      </symbol>
      <symbol id="sun-fill" viewBox="0 0 16 16">
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </symbol>
    </svg>

    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
      <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
              id="bd-theme"
              type="button"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              aria-label="Toggle theme (auto)">
        <svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
        <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
            <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#sun-fill"></use></svg>
            Light
            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
          </button>
        </li>
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
            <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
            Dark
            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
          </button>
        </li>
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
            <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#circle-half"></use></svg>
            Auto
            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
          </button>
        </li>
      </ul>
    </div>

    
<div class="form-signin w-100 m-auto">
  
    
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" @keyup.enter="submit()" v-model="state.form.email">  
       <!-- 여기 수정함  @keyup.enter="submit()" 엔터를 누르면 submit() 실행-->
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" @keyup.enter="submit()" v-model="state.form.password"> 
       <!-- v-model="state.form.password"는  input을 state.form.password연결하겠다는 뜻, 양방향 통신상태-->
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
     <label>
        <input type="checkbox" value="remember-me" @keyup.enter="submit()"> Remember me
     </label>
    </div>

    <button class="btn btn-primary w-100 py-2" @click="submit()">Sign in</button>   
    <!-- 여기 수정함 submit()-->
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
  
</div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import store from '../scripts/store.js'  //vuex를 사용
import router from '../scripts/router.js'

export default{
    setup(){
      const state=reactive({
        form:{               //state객체안에 form객체를 가지고 form은 email과 password속성을 가지고 있음
          email:"",
          password:"",
        }
      })

//**로그인시 사용자의 email과 password를 스프링에 전송하여 로그인에 성공하면 id값을 받아와 브라우저의 세션스토리지와 vuex의 상태를 저장시킨다.
//axios.post()는 서버로 데이터를 전송하는 메서드로, 첫번째 인자는 요청 URL, 두번째 인자는 전송할 데이터
//axios.get()은 서버로부터 데이터를 받아오는 메서드로, 인자는 요청 URL

      const submit=()=>{
          axios.post("api/account/login", state.form).then((res)=>{  //form이 아닌 form의 email과 password를 전송, res는 사용자의 임의명칭
          console.log("res.data="+res.data);      //data는 Axios가 응답 객체에 포함시키는 공식 속성 이름이므로 다른 이름으로 변경할 수 없다.
          store.commit('setAccount', res.data) ;  //#1.vuex상태변수에 res.data로 로그인에 성공한 사용자의 ID 값을 저장 
          sessionStorage.setItem("id", res.data); //#2.브라우저가 제공하는 세션 스토리지에 사용자 ID를 저장하여, 페이지 새로고침 후에도 로그인 상태를 유지
          router.push({path:'/'});                //로그인 성공시 홈화면으로 이동
          window.alert("로그인 하였습니다.");
          
        }).catch(()=>{
          window.alert("로그인 실패하였습니다.");
        });
      }
      return {state, submit}  //script에서 정의하고 template에서 사용할 수 있도록 return
    }
  }
//#1, #2 2개를 설정하는 이유->"새로고침 이후에도 사용자가 로그인 상태를 유지하기 위해 Vuex와 세션 스토리지(또는 로컬 스토리지)를 함께 사용한다."
//사용자가 로그인하면  #1.서버에서 받은 사용자 ID를 뷰의 Vuex 상태에 저장. #2동시에 브라우저의  세션 스토리지에도 ID를 저장.
//페이지가 새로고침되면 Vuex 상태가 초기화되므로, 애플리케이션이 세션 스토리지에서 사용자 ID를 가져와 Vuex 상태를 복구.
//이를 통해 새로고침 후에도 사용자는 로그아웃되지 않고, 애플리케이션은 정상적으로 작동합니다.
//**로그인 만료시간은 스프링의 jwtServiceImpl에서 설정 */

//AccountController 참조
// state.form은 클라이언트에서 서버로 전송할 로그인 데이터(email, password)를 담고 있습니다.
// 이 데이터는 Spring AccountController의 @RequestBody Map<String, String> params에 매핑되어 처리됩니다.
// 따라서, state가 아닌 state.form을 전송하는 것이 정확한 데이터 전달을 위한 핵심입니다.
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>