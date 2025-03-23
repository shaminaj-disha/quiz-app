export function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#2e2e2e"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset="0"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
