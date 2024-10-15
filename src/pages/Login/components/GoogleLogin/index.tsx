export default function GoogleoLogin() {
    const handleGoogleLogin = () => {
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=372018613807-jr3ua4ghk7fslu9sgigd0ve5h0evufdf.apps.googleusercontent.com&redirect_uri=http://localhost:8080/users/login/oauth2/google&response_type=code&scope=email profile`;
        window.location.href = googleLoginUrl; // 구글 소셜 로그인 페이지로 리다이렉트
    };

    return (
        <div
            onClick={handleGoogleLogin} // 클릭 시 구글 로그인으로 이동
            className="cursor-pointer flex items-center justify-center w-[60px] h-[60px] rounded-full"
        >
            <svg 
                width="61" 
                height="60" 
                viewBox="0 0 61 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="1" y="0.5" width="59" height="59" rx="29.5" fill="white"/>
                <rect x="1" y="0.5" width="59" height="59" rx="29.5" stroke="#F0F0F0"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M44.9 30.3404C44.9 29.2768 44.8045 28.254 44.6273 27.2722H30.5V33.0745H38.5727C38.225 34.9495 37.1682 36.5381 35.5795 37.6018V41.3654H40.4273C43.2636 38.754 44.9 34.9086 44.9 30.3404Z" fill="#4285F4"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M30.5002 44.9999C34.5502 44.9999 37.9457 43.6567 40.4275 41.3658L35.5798 37.6021C34.2366 38.5021 32.5184 39.0339 30.5002 39.0339C26.5934 39.0339 23.2866 36.3953 22.1071 32.8499H17.0957V36.7362C19.5639 41.6385 24.6366 44.9999 30.5002 44.9999Z" fill="#34A853"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M22.1068 32.8498C21.8068 31.9498 21.6364 30.9884 21.6364 29.9998C21.6364 29.0112 21.8068 28.0498 22.1068 27.1498V23.2634H17.0955C16.0795 25.2884 15.5 27.5793 15.5 29.9998C15.5 32.4202 16.0795 34.7112 17.0955 36.7362L22.1068 32.8498Z" fill="#FBBC05"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M30.5002 20.9659C32.7025 20.9659 34.6798 21.7227 36.2343 23.2091L40.5366 18.9068C37.9389 16.4864 34.5434 15 30.5002 15C24.6366 15 19.5639 18.3614 17.0957 23.2636L22.1071 27.15C23.2866 23.6045 26.5934 20.9659 30.5002 20.9659Z" fill="#EA4335"/>
            </svg>
        </div>
    );
}
