// .env 파일을 사용하지 않는경우 app-config.js 파일 사용
// 애플리케이션 전체에서 사용되는 구성 정보를 관리하는데 사용

// 배포전
// const backendHost = 'http://localhost:8080';
// export const API_BASE_URL = `${backendHost}`;


// 배포후
let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'localhost'){
  backendHost = 'http://localhost:8080'; //로컬주소
}else{
  backendHost='http://3.36.63.93:8080'; // 배포주소
}

export const API_BASE_URL = `${backendHost}`;

/**
 * 참고
 * window && window.location && window.location.hostname; 하는 이유?
 * 안정성을 높이기 위해서
 
 * 윈도우가 존재하지 않는 경우
 * ex) 서버측 코드(node.js)에서 실행되는 경우 =  window객체는 존재하지 않음
 
 * window.location이 존재하지 않는 경우
 * ex) 브라우저 환경이 아닌 경우 = window.location 존재하지 않을 수 있음
 * 
 * 


 */