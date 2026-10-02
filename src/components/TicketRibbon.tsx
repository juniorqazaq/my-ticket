export function TicketRibbon() {
  return (
    <div className="ticket-ribbon">
      <svg viewBox="0 0 70 32" aria-hidden="true" className="ribbon-art">
        <path d="M1 31V17a15 15 0 0 1 30 0v14" fill="var(--ticket-petal)" />
        <path
          d="M20 31V17a15 15 0 0 1 30 0v14"
          fill="var(--ticket-secondary)"
        />
        <path d="M39 31V17a15 15 0 0 1 30 0v14" fill="var(--ticket-color)" />
      </svg>
      <span>GOOD TIMES, KEPT.</span>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="ribbon-flower">
        <path
          d="M16 8C8 0 0 8 8 16C0 24 8 32 16 24C24 32 32 24 24 16C32 8 24 0 16 8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
