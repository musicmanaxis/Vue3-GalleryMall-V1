// vuex를 사용하여 Vue 애플리케이션 전체에서 사용자 정보를 관리하기 위한 중심적인 상태 저장소 역할, 아직은 사용자 한명만 관리하는 상태 저장소
// 사용자가 로그인하면 사용자 ID를 Vuex 상태에 저장하고, 애플리케이션의 다른 컴포넌트에서 로그인 정보를 활용할 수 있다
//이를 위해서는 store.js에서 vuex를 만들어 별도로 js형태로 만들고 main.js에서 등록을 하면 다른 컴포넌트에서 import해서 사용할 수 있다.
//vuex를 사용하려면  'npm install vuex@next --save'의 설치가 필요
//현재 login.vue, Header.vue, App.vue에서 사용자 정보를 사용하고 있음

import { createStore } from 'vuex'

const store = createStore({ //createStore 함수로 Vuex 스토어를 생성합니다.
  state () {                //상태:로그인한 사용자 ID와 같은 데이터를 저장.
    return {
      account:{
        id:0,  //로그인한 사용자의 아이디 0으로 일단 초기화
      }
    }
  },
  mutations: {  //변경(mutations): 상태를 업데이트할 때 사용, 
    setAccount(state, sendId){  //setAccount는 state.account.id 값을 변경하는 역할, state는 애플리케이션에서 관리할 데이터를 저장하는 곳
      state.account.id=sendId;    
    }
  }
})

export default store
//*state.account.id같이 처리이유
//객체안에 객체를 넣은 이유는 계정관련은 account 객체, 설정 정보는 settings 객체, 알림 데이터는 notifications 객체에서 관리..
// 이런식으로 그룹별로 처리하기 위해