<template>
    <div class="not-found">
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청한 페이지는 존재하지 않거나 잘못된 경로입니다.</p>
      <router-link to="/" class="home-link">홈으로 돌아가기</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  .not-found h1 {
    font-size: 2rem;
    color: #ff0000;
  }
  
  .not-found p {
    font-size: 1.2rem;
  }
  
  .home-link {
    display: inline-block;
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .home-link:hover {
    background-color: #0056b3;
  }
  </style>
  