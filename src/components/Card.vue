<!-- 개요:그림하나하나에 해당 그림, 제목, 가격, 카트에 담기기능을 하나의 카드 형태로 제공, Home컴포넌트에 컴포넌트로 제공된다.
 **<span class="img" :style="{backgroundImage: `url(${item1.imgPath})` }" />의 설명, :style="객체형태"로 설정

    1.<span class="img" style="background-image: url('images/photo1.jpg');"> </span>의 css스타일을 vue형식으로 바꾼것
    2. :style 스타일을 동적으로 설정한다는 뜻, background-image을 backgroundImage한 이유는 동적으로 할 때는 카멜표기법을 적용
    3. {backgroundImage: `url(${item1.imgPath})`} 스타일을 객체형태로 설정하겠다는 뜻 객체형태-> { color: red} 
    4.``(백틱)안에 ${}를 쓰면 객체.속성에 접근할 수 있다.
    5.동적으로 바인딩 하면(변수를 사용) 변수안에 실제 값이 바뀌어도 따로 코드를 수정할 필요가 없다. 
    
           -->
<template>
  <!-- <span>:특정 부분을 선택해 스타일을 적용하거나 조작할 때 주로 사용 -->
  <!-- <small> 태그: 의미(semantic)를 추가하면서 크기를 작게 만듭니다. -->
        <div class="card shadow-sm">
          <span class="img" :style="{backgroundImage: `url(${item1.imgPath})` }" />
          <!-- *위는 스타일을 css에서 vue형태로 코딩한 것임 ->url을 수시로 바꿀필요도 없고 별도의 css를 작성하지 않아도 된다. -->

          <div class="card-body">
            <p class="card-text">
              <span >{{ item1.name }}&nbsp;</span>  
              <span class="discount badge bg-danger">  
                <!-- 부트스트랩제공(검색할것)badge:짧은 정보를 표시,  작은 크기의 텍스트와 테두리를 포함, 배경색이 채워짐. bg-danger:빨간색 배경 -->
                {{ item1.discountPrice}}% 할인
              </span>
            </p>

            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-primary" @click="addToCart(item1.id)"> <!--**카트에 담는 로직 하단 함수참조    -->
                <i class="fa fa-shopping-cart discount badge " aria-hidden="true"> 담기</i> 
                 <!-- https://fontawesome.com/v4/icon/shopping-cart 에서 중간에 태그를 복사함 -->
              </button>
              <small class="price text-muted">정가:₩{{lib.getCommaFormated(item1.price)  }}
                                                <!-- 3.자바스크립트에서 가져온 함수를 적용 -->
              </small>
          
              <small class="discount text-danger">
                할인가격:₩{{ lib.getCommaFormated(item1.price -(item1.price*item1.discountPrice/100)) }}
              </small>
            </div>
          </div>   <!-- <div class="card-body"> -->
        </div>
     

</template>


<script>
//*1.숫자를 컴마로 변화하는 함수(getCommaFormated)를 자바스크립트 lib.js을을 가져와서 사용
import lib from "@/scripts/lib"  //@->src를 가리킨다.  ../scripts/lib 이렇게 해도 됨
import axios from 'axios';

export default{
  name:'CardComponent',
  props:{
    item1:Object,  //*상단 template에 Home.vue에서 item1의 이름으로 넘어온 객체를 쓸 수 있다.
  },

  setup(){
    const addToCart=(itemId)=>{
     axios.post(`/api/cart/items/${itemId}`).then(()=>{
       console.log("장바구니에 담기 성공:"+itemId);
     })
     //`/api/cart/items/${itemId}`에서 스프링의 @PostMapping("/api/cart/items/{itemId}") 와 일치해야 한다
     //대소문자도 구별한다.  ${itemId}와 스프링의 {ItemId}로 하는 바람에 오류가 발생했다.
    }
    return{lib, addToCart}  //2.가져온 것을 이렇게 선언하면 상단에서 쓸수 있다.
  }
}


</script>

<style scoped>    /* scoped의 역할: 해당 Vue 컴포넌트에서만 스타일을 적용. */
.card .img{
  display:inline-block;
  width:100%;
  height:250px;
  background-size:cover;
  background-position: center;
}

.card .card-body .price{
  text-decoration: line-through;
}
</style>


