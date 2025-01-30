<template>
    <div class="order"> <!-- 여기 수정  -->
<!-- 아래하단 부터 https://getbootstrap.com/docs/5.0/examples/checkout/에서 소스보기 한 것을 복사해서 붙여넣기 -->
<div class="container">   
  <main>
        <div class="py-5 text-center"><h2>주문하기</h2>
          <p class="lead">배송지와 결제 정보를 입력하시면 구매가 완료됩니다. 주문해 주셔서 감사합니다. </p></div>

        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last"><h4
              class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">구입 목록</span>

            <span class="badge bg-primary rounded-pill"> {{ state.items.length }}개 </span></h4>

            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(item, index) in state.items" :key="index">
                <div>
                  <h6 class="my-0">{{ item.name }}</h6>
                </div>
                <span class="text-muted">
                  ₩{{ lib.getCommaFormated(item.price -(item.price*item.discountPrice/100)) }} 원
                </span>
              </li>
            </ul>
            <h3 class="text-center total-price">
              ₩{{ lib.getCommaFormated(computedPrice) }} 원
            </h3>
          </div>
          <div class="col-md-7 col-lg-8"><h4 class="mb-3">주문자 정보</h4>
            <div class="needs-validation" novalidate="">

              <div class="row g-3">
                <div class="col-12"><label for="username" class="form-label">이름</label>
                  <input type="text" class="form-control" id="username" placeholder="주문자 이름" v-model="state.form.name">
                </div>

                <div class="col-12"><label for="address" class="form-label">주소</label>
                  <input type="text" class="form-control" id="address" placeholder="주소 입력" v-model="state.form.address" >
                </div>

              </div>
              <hr class="my-4">
              <h4 class="mb-3">결제 수단</h4>
              <div class="my-3">
                <div class="form-check">
                  <input id="card" name="paymentMethod" type="radio" class="form-check-input" value="card"  v-model="state.form.payment">
                  <label class="form-check-label" for="card">신용카드 </label>   <!-- value값이 전송된다 -->
                </div>

                <div class="form-check">
                  <input id="bank" name="paymentMethod" type="radio" class="form-check-input" value="bank" v-model="state.form.payment">
                  <label class="form-check-label" for="bank">무통장입금</label>
                </div>
              </div>
              <label for="cc-name" class="form-label">카드 번호</label>
              <input type="text" class="form-control" id="cc-name" v-model="state.form.cardNumber" >
              <hr class="my-4">
              <button class="w-100 btn btn-primary btn-lg " @click="submit()">결제하기 </button>
             
            </div>
          </div>
        </div>
      </main>
    
         </div> 
         <!-- container -->

         
    
     </div>
</template>

<script>
// 주문하기페이지:주문하기 위해서 필요한 정보를 입력하는 페이지

import axios from 'axios';
import lib from "@/scripts/lib";
import { reactive, computed } from 'vue';
import router from '@/scripts/router';


  export default{
    setup(){
      const state=reactive({
          items:[],  //배열
          form:{     //객체, 사용자 입력 값이 즉시 반응형으로 업데이트되며, v-model을 통해 입력 폼에 바인딩
            name:"",
            address:"",
            payment:"",
            cardNumber:"",
            items:"",
            orderDate:"",
          }
      });

      const load=()=>{  //장바구니에 있는 아이템을 보여주는 함수
        axios.get("/api/cart/items").then(({data})=>{  
          //스프링의 CartController에서 /api/cart/items해당하는 메서드 반환타입이 List형식이므로 뷰에서 배열(data)로 받는다.
          for (let i = 0; i < data.length; i++) {
            console.log(`아이템 ${i + 1}:`, data[i]); // 배열에서 각 아이템을 출력
          }
        state.items=data;  //배열을 뷰의 배열에 담는다.
       })
      }
      
     const submit=()=>{ 
       if(state.form.cardNumber.length<17){       
        state.form.orderDate = new Date().toISOString().slice(0, 19); // ISO-8601 포맷의 주문 날짜 생성
     //$주문날짜 입력하기 ->아직 실험중  
        console.log("state.form.orderDate:", state.form.orderDate);

        const args=JSON.parse(JSON.stringify(state.form));  //주문자가 입력한 form 양식을 복사 **깊은 복사->하단 내용 참조
        args.items=JSON.stringify(state.items);             //args 객체의 items 속성만 JSON 형식의 문자열로 변환하는 작업

       //JSON.stringify()는 자바스크립트 배열(state.items)를 JSON 형식으로 변환하면서, 키에 다시 ""를 붙이는 작업
       //**뷰에서 스프링으로 데이터를 전송할 때는 json형식으로 전송해야 하기 때문에 이와 같은 과정이 필요->스프링에서 dto로 받아 처리 
        console.log("서버로 보낼 데이터:", args);

        axios.post("/api/orders", args).then(()=>{
        router.push({path:"/orders"})
        alert("주문 완료")
     
      })
     }else{
       alert("카드번호 자리가 16자리를 넘어섰습니다..올바른 번호를 입력하세요")   //카드 넘버가 16자리 이상이면 예외처리  
     }
     }

      const computedPrice = computed(() => {
      let result = 0;

      for (let item of state.items) {
        result += item.price - item.price * item.discountPrice / 100;
       
      }
      
      return result;
     })//computedPrice

     load();
     //사용자가 담아둔 상품 목록을 즉시 확인할 수 있는 역할
     //해당 컴포넌트가 처음으로 로드될 때 데이터를 가져오고 초기화하는 역할을 수행하기 위해서

    return {state, lib, computedPrice, submit }
    }
  }

//왜 깊은 복사를 하는 걸까요?
// 1. 얕은 복사(Shallow Copy)의 문제:
// state.form 객체를 단순히 const args = state.form;처럼 할당하게 되면, args는 state.form을 참조하게 됩니다. 
// 즉, args를 수정하면 state.form도 같이 수정됩니다. 이것은 우리가 원하지 않는 동작일 수 있어요.

// 2. 깊은 복사:
// JSON.parse(JSON.stringify())를 사용하면 state.form 객체의 깊은 복사가 이루어집니다. 
// 이는 객체 내부의 모든 속성과 값을 새로운 메모리 공간에 복사해서 state.form을 수정해도 args는 영향을 받지 않게 해줍니다.

// 어떻게 작동하나요?
// JSON.stringify(state.form)는 state.form 객체를 JSON 문자열로 변환합니다.
// JSON.parse()는 그 JSON 문자열을 다시 자바스크립트 객체로 변환합니다. 
// 이 과정에서 새로운 객체가 생성되기 때문에, 원본 객체와는 독립적인 객체가 됩니다.

// computed()는 반응형 계산된 값을 만들기 위해 사용
// state.items가 변경될 때마다 총 가격을 다시 계산하고, 이전에 계산된 값은 캐시하여 불필요한 계산을 방지. 
// 이로 인해 성능을 최적화하고, 상태가 변경될 때마다 UI가 자동으로 업데이트되도록 할 수 있습니다
//일반함수는 매번 계산->성능 저하

</script>

<style scoped>

</style>