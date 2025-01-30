//숫자에에 컴마를 붙여서 변환해해주는 함수정의의, 구글에서 검색함함
//Card.vue에서 사용
export default{
  getCommaFormated(value){   
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
 
}

