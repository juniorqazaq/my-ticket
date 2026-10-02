import { Ticket } from "lucide-react";
import {
  formatDate,
  formatTime,
  type TicketDetails,
  type TicketType,
} from "../lib/ticket";

const squares = Array.from({ length: 361 }, (_, index) => ({
  x: index % 19,
  y: Math.floor(index / 19),
})).filter(
  ({ x, y }) =>
    (x * 31 + y * 17 + x * y * 7) % 11 < 6 &&
    x !== y &&
    x !== 18 - y &&
    !(x > 5 && x < 13 && y > 5 && y < 13),
);

export function DecorativePattern() {
  return (
    <div className="pattern-block">
      <svg
        viewBox="0 0 23 23"
        role="img"
        aria-label="Decorative preview pattern. No encoded data; not valid for event entry."
      >
        <rect width="23" height="23" fill="white" />
        {squares.map(({ x, y }) => (
          <rect
            key={`${x}-${y}`}
            x={x + 2}
            y={y + 2}
            width=".93"
            height=".93"
            fill="#262626"
          />
        ))}
        <path
          d="M11.5 7.5 12.4 10.6 15.5 11.5 12.4 12.4 11.5 15.5 10.6 12.4 7.5 11.5 10.6 10.6Z"
          fill="#d84338"
        />
      </svg>
      <span>Decorative preview</span>
    </div>
  );
}
export function TicketHeader({ type }: { type: TicketType }) {
  return (
    <div className="ticket-header">
      <span>
        <Ticket size={23} strokeWidth={1.5} aria-hidden="true" />
        PERSONAL EDITION
      </span>
      <span className="type-badge">{type}</span>
    </div>
  );
}
export function TicketPreview({
  details,
  number,
}: {
  details: TicketDetails;
  number: string;
}) {
  return (
    <div className="ticket-stub live-stub" aria-label="Live ticket preview">
      <div className="stub-preview">
        <p className="preview-name">{details.name.trim() || "Your name"}</p>
        <p className="preview-event">{details.event.trim() || "Your event"}</p>
        <p className="preview-date">
          {details.date || details.time
            ? `${formatDate(details.date)} · ${formatTime(details.time)}`
            : "The good times start here."}
        </p>
        <span className="ticket-number">NO. {number}</span>
      </div>
      <DecorativePattern />
    </div>
  );
}
