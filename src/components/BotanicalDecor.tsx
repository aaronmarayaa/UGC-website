export function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical-sprig ${className}`}
      viewBox="0 0 160 300"
      fill="none"
      aria-hidden="true"
    >
      <path d="M73 288C99 205 55 131 93 16" stroke="#596949" strokeWidth="2" />
      {Array.from({ length: 7 }, (_, index) => (
        <g
          key={index}
          transform={`translate(${78 + Math.sin(index) * 8} ${45 + index * 32}) rotate(${index % 2 ? 8 : -8})`}
        >
          <path
            d="M0 17C-11-12-45-18-60-5C-52 14-30 27 0 17Z"
            fill={index % 2 ? "#69845b" : "#80916b"}
          />
          <path d="M0 17L-48-2" stroke="#d4dbb8" strokeWidth=".8" />
          <path
            d="M0 24C9-6 36-17 59-11C58 12 36 29 0 24Z"
            fill={index % 2 ? "#59774f" : "#8a9d76"}
          />
          <path d="M0 24L49-7" stroke="#d4dbb8" strokeWidth=".8" />
        </g>
      ))}
      <path d="M93 29C76 11 85 2 95 0C106 9 101 21 93 29Z" fill="#71845c" />
    </svg>
  );
}

export function PencilNotes({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pencil-notes ${className}`}
      viewBox="0 0 220 180"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 40C5 12 2 49 34 64C72 35 48 17 32 40Z" />
        <path d="M133 65C121 96 96 104 59 98M70 85L57 98L74 110" />
        <path d="M173 19L176 5M177 22L190 16M181 27L193 32M172 29L174 40M167 24L157 28M167 17L161 9" />
        <path d="M151 128C155 97 206 96 201 132C196 155 151 154 150 129C145 104 186 101 190 137C194 156 167 157 160 142" />
      </g>
    </svg>
  );
}
