export default function SaveIcon({ scale = 1 }) {
  return (
    <svg
      width={17 * scale}
      height={16 * scale}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 4V2C14 1.44772 13.5523 1 13 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V11"
        stroke="#7B8189"
        strokeLinecap="round"
      />
      <path
        d="M15.7499 5.88052L10.8887 11.6569C10.7327 11.8423 10.4522 11.8563 10.2785 11.6874C10.1216 11.5348 10.1092 11.2869 10.2501 11.1195L15.1113 5.34308C15.2673 5.15772 15.5478 5.14369 15.7215 5.31257C15.8784 5.46515 15.8908 5.71305 15.7499 5.88052Z"
        stroke="#7B8189"
      />
      <path d="M5 4H11" stroke="#7B8189" strokeLinecap="round" />
      <path d="M5 7H9" stroke="#7B8189" strokeLinecap="round" />
      <path d="M5 10H8" stroke="#7B8189" strokeLinecap="round" />
    </svg>
  );
}
