export default function FriendIcon({ isFriend }: { isFriend?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="8" r="2.25" stroke={isFriend ? '#C9CCCF' : 'black'} stroke-width="1.5" />
      <path
        d="M14.2159 16.1262C14.0192 16.2467 13.7353 16.404 13.3719 16.5626C12.5886 16.9044 11.4408 17.25 10 17.25C8.55924 17.25 7.41143 16.9044 6.62808 16.5626C6.26465 16.404 5.98076 16.2467 5.78414 16.1262C5.79246 16.0672 5.80278 16.0027 5.8156 15.9335C5.88356 15.5665 6.01823 15.0866 6.28065 14.6142C6.54065 14.1462 6.92353 13.6893 7.49529 13.3462C8.06592 13.0039 8.8661 12.75 10 12.75C11.1339 12.75 11.9341 13.0039 12.5047 13.3462C13.0765 13.6893 13.4593 14.1462 13.7194 14.6142C13.9818 15.0866 14.1164 15.5665 14.1844 15.9335C14.1972 16.0027 14.2075 16.0672 14.2159 16.1262Z"
        stroke={isFriend ? '#C9CCCF' : 'black'}
        stroke-width="1.5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.8956 10.1566C14.2842 9.62108 14.5133 8.9623 14.5133 8.25C14.5133 7.20639 14.0214 6.27766 13.2568 5.68302C13.7351 5.2581 14.3649 5 15.055 5C16.5508 5 17.7633 6.21256 17.7633 7.70833C17.7633 9.2041 16.5508 10.4167 15.055 10.4167C14.6401 10.4167 14.247 10.3234 13.8956 10.1566Z"
        fill={isFriend ? '#C9CCCF' : 'black'}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.008 12.2202C15.9777 13.519 16.0187 15.715 15.8986 16.8013C17.0309 16.8966 17.8915 16.7036 18.2951 16.5838C18.4572 16.5357 18.5736 16.4035 18.5963 16.236C18.7013 15.461 18.7345 13.1859 15.713 12.3872C15.058 12.2141 14.4935 12.1722 14.008 12.2202Z"
        fill={isFriend ? '#C9CCCF' : 'black'}
      />
    </svg>
  );
}
