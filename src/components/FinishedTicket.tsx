import { forwardRef } from "react";
import { MapPin } from "lucide-react";
import { DecorativePattern, TicketHeader } from "./TicketPreview";
import { TicketRibbon } from "./TicketRibbon";
import {
  formatDate,
  formatTime,
  type TicketDetails,
  type TicketType,
} from "../lib/ticket";

type Props = {
  details: TicketDetails;
  type: TicketType;
  number: string;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
};
export const FinishedTicket = forwardRef<HTMLElement, Props>(
  function FinishedTicket({ details, type, number, headingRef }, ref) {
    return (
      <article
        ref={ref}
        className={`paper-ticket finished-ticket type-${type.toLowerCase()}`}
        aria-label="Finished personal ticket"
      >
        <div className="ticket-body">
          <TicketHeader type={type} />
          <TicketRibbon />
          <h2
            className={`finished-event ${details.event.length > 38 ? "long-title" : ""}`}
            ref={headingRef}
            tabIndex={-1}
            aria-label={`Your ticket is ready. ${details.event.trim()}`}
          >
            {details.event.trim().endsWith(".") ? (
              <>
                {details.event.trim().slice(0, -1)}
                <span className="event-punctuation">.</span>
              </>
            ) : (
              details.event.trim()
            )}
          </h2>
          <div className="finished-attendee">
            <span className="detail-label">MADE FOR</span>
            <p>{details.name.trim()}</p>
          </div>
          <div className="finished-date-time">
            <div>
              <p>{formatDate(details.date)}</p>
              <span className="detail-label">DATE</span>
            </div>
            <div>
              <p>{formatTime(details.time)}</p>
              <span className="detail-label">TIME</span>
            </div>
          </div>
          <div className="finished-venue">
            <MapPin size={22} strokeWidth={1.6} aria-hidden="true" />
            <p>{details.venue.trim()}</p>
          </div>
          {details.message.trim() ? (
            <p className="finished-message">“{details.message.trim()}”</p>
          ) : null}
        </div>
        <div className="ticket-stub finished-stub">
          <DecorativePattern />
          <div className="finished-stub-details">
            <span className="ticket-number">NO. {number}</span>
            <p className="design-note">Digital ticket design preview</p>
            <p className="entry-note">Not valid for event entry.</p>
          </div>
        </div>
      </article>
    );
  },
);
