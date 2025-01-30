module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:8080',   ///api로 시작하는 요청은 로컬에서 실행 중인 http://localhost:8080 서버로 전달
          }
      }
  }
}
//url을 간소화하게 하기 위해서 미리 위와 같이 설정을 하면 
// axios.get('http://localhost:8080/api/items')같이 길게 코드를 쓸 필요가 없다..