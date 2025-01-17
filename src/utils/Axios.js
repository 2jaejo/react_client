import axios from 'axios';


// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '/', // 서버의 기본 URL
  headers: {
    'Content-Type': 'application/json', // 모든 요청에 JSON 헤더 추가
  },
  withCredentials: true, // 쿠키를 포함하여 요청에 추가
});

// 요청 인터셉터: Authorization 헤더에 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 갱신 또는 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response");
    console.log(response);
    return response; // 정상 응답은 그대로 반환
  },
  (error) => {
    if (error.response) {
      console.log("error");
      console.log(error);

      // 인증 오류일 경우 
      localStorage.removeItem('accessToken');
      // window.location.reload();
  
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
