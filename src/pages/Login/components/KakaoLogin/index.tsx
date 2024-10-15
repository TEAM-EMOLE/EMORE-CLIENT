export default function KakaoLogin() {
    // 카카오 로그인 페이지로 리다이렉트하는 함수
    const handleKakaoLogin = () => {
        const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=24e3a6e0e86b5b9dabd9fb686b0d62ca&redirect_uri=http://localhost:8080/users/login/oauth2/kakao`;
        window.location.href = kakaoLoginUrl; // 카카오 로그인 페이지로 이동
    };

    return (
        <svg 
          width="61" 
          height="60" 
          viewBox="0 0 61 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleKakaoLogin} // 클릭 시 카카오 로그인 처리
          className="cursor-pointer flex items-center justify-center w-[60px] h-[60px] rounded-full"
        >
            <rect x="0.5" width="60" height="60" rx="30" fill="#FEE500"/>
            <g clipPath="url(#clip0_769_3918)">
                <path fillRule="evenodd" clipRule="evenodd" d="M30.5001 16C22.2153 16 15.5 21.1883 15.5 27.5872C15.5 31.5668 18.0973 35.075 22.0526 37.1617L20.3884 43.2409C20.2414 43.7781 20.8557 44.2062 21.3275 43.895L28.6223 39.0804C29.2379 39.1398 29.8635 39.1745 30.5001 39.1745C38.7842 39.1745 45.5 33.9864 45.5 27.5872C45.5 21.1883 38.7842 16 30.5001 16Z" fill="black"/>
            </g>
            <defs>
                <clipPath id="clip0_769_3918">
                    <rect width="30" height="30.0001" fill="white" transform="translate(15.5 15)"/>
                </clipPath>
            </defs>
        </svg>
    );
}