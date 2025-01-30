//  주문을 하고 결제한 내역을 보여주는 페이지
<template>
    <div class="orders"> <!-- 여기 수정  -->
<!-- 아래하단 부터 https://getbootstrap.com/docs/5.0/examples/checkout/에서 소스보기 한 것을 복사해서 붙여넣기 -->
      <div class="container">   
       
       <table class="table table-bordered">
        <thead>
          <tr>
            <th>번호</th>
            <th>주문자명</th>
            <th>주소</th>
            <th>결제수단</th>
            <th>구입항목</th>
            <th>주문날짜</th>
           </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index1) in state.orders" :key="index1">
              <td>{{ state.orders.length-index1 }} </td>
              <td>{{ order.name }}</td>
              <td>{{ order.address}}</td>
              <td>{{ order.payment }}</td>
              <td>
                <div v-for="(item, index2) in order.items" :key="index2">{{item.name }}</div>
                <!-- v-for 디렉티브를 중첩하여 사용할 때, 상위 v-for에서 가져온 데이터를 하위 v-for에서 활용할 수 있다 -->
                <!--order.items -> [{ "id": 2, "name": "Van-gogh", "imgPath": "/img/van-gogh.jpg", "price": 4500000, "discountPrice": 20 } ] -->
              </td>
              <!-- $$내가 추가 한것 -->
              <td v-if="order.orderDate">{{ order.orderDate.split('T').join('-') }}</td>
              <td v-else>주문날짜 없음</td>
            
            </tr>
          </tbody>
       </table>
      </div>  <!-- container -->
     </div>
</template>

<script>

import axios from 'axios';
import lib from "@/scripts/lib";
import { reactive } from 'vue';

  export default{
    setup(){
      const state=reactive({
          orders:[],
      })
      
      axios.get("/api/orders").then(({data}) => {
      
      state.orders=[];
     //만약 axios.get 호출 전에 state.orders에 데이터가 이미 들어있는 상태라면(어떤 이유로든), 
     // state.orders = [];를 통해 기존 데이터를 초기화하지 않으면 이전 데이터가 새로운 데이터와 섞일 위험이 있습니다.

      for(let object of data){   
        //**data는 배열, 배열에서 객체를 꺼내 json문자열을 객체로 변환뒤 다시 state.orders배열 안에 꺼낸 객체를 집어넣는 과정이다.
        //***items속성이 JSON 문자열이기 때문에 변환과정이 필요, Home.vue의 데이터 처리방식과 차이점!!
        //json은 키에 해당하는 것이 ""로 감싸져 있는데 이것을 제거하는 작업이 자바스크립트 객체로 만드는 parse변환 과정이다.
        
        if(object.items){   //object안에 items가 있다면
          object.items=JSON.parse(object.items);  //items속성이 JSON 문자열이기 때문에 JavaScript 객체(혹은 배열)로 변환하고 다시 덮어씁니다
        }
        state.orders.push(object);  //push는 JavaScript 배열 메서드로 배열의 끝에 하나 이상의 요소를 추가하는 데 사용
      }//for
     })//axios
      
    return {state, lib }
    }
  }

</script>

<style scoped>
.table{
  margin-top: 30px;
}

.table > tbody{
  border-top: 1px solid #eee;
}
</style>