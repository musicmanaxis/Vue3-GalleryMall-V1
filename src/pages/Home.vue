<!--개요:갤러리몰에서 처음 보여주는 메인 홈페이지
    스프링 서버의 ItemController에서 데이터를 받아와 Card컴포넌트에 값을 넘겨 Card컴포넌트를 화면에 렌더링 하는 방식으로 처리되었음 -->

<template>
 <div class="Home">
  <div class="album py-5 bg-body-tertiary">
   <div class="container">
     <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

       <div class="col" v-for= "(item, index) in state.items" :key="index">  
<!-- state: 상태 관리용 객체. items: state 안의 배열로, 서버에서 가져온 데이터를 담음. item: items 배열의 각 요소로, 객체형태로 처리.-->
         <span style=" background-color: gold; font-size : 20pt; " >Title:{{ item.name }} </span>
         <Card :item1="item"/>
         <!-- 핵심:**item1이라는 이름으로로 Card.vue에 넘긴다. 실제 디비 items테이블의 하나의 행(item)에 해당 
              그림 하나에 해당하는 모든 정보(가격, 이미지, 제목 등)의 row객체를 넘기는 셈
         -->
            
       </div>
     </div>
   </div>
  </div>
 </div>
</template>


<script>
import axios from 'axios';  
//http통신으로 spring서버와 데이터를 받기 위해 설정, npm install axios를 해줘야 함
//Axios는 RESTful API와 통신하기 위해 GET, POST, PUT, DELETE 같은 HTTP 메서드를 쉽게 사용할 수 있게 해줍니다.
import CardComponent from '../components/Card.vue';
import { reactive } from 'vue';

 export default{
  name:'HomeComponent',  //
  components:{
    Card:CardComponent //import CardComponent from 에서 가져온 'CardComponent'라는 명칭으로  Card:오른쪽에 똑같이 위치
  },
  setup(){
    const state=reactive({   //items배열을 갖는 state객체 생성
        items:[]
    });
  
     axios.get("/api/items").then((object)=>{   //then(({data})로 중괄호를 쓰면면 바로 속성에 접급할수 있다.
     state.items=object.data;
    });
    //*spring ItemController에서 받아온 데이터를 state객체의 items 배열로 받는다.
    //axios.get("/api/items")로 요청하면 서버로부터의 응답 객체(object)를 받아 그 객체 속성중에 data속성이 실제 data가 들어있어 처리
    //axios.get("/api/items")가 실행되면 Spring Boot의 getItems() 메서드가 호출, Vue와 Spring Boot이 통신하는 핵심,  vue.config.js파일 참조
    //object.data를 쓴 이유는 axios 라이브러리안에 data속성이 실제 데이터를 담고 있기 때문 
    //필요하면 아래 실행해서 살펴볼것것
    // console.log('object 내용을 보자:'+object);
    //console.log('/api/items에서 가져온 배열:'+object.data+',  배열크기:'+object.data.length);
    
    return{
      state  //*setup() 함수에서 선언한 변수나 메서드는 반드시 return 해야 템플릿에서 사용할 수 있다.
    };
   }  //setup()
  }



</script>

<style >

</style>