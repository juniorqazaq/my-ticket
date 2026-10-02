import { FinishedTicket } from "./FinishedTicket";
import type { TicketDetails, TicketType } from "../lib/ticket";

type Props = { details: TicketDetails; type: TicketType; number: string };

export function PrinterReveal({ details, type, number }: Props) {
  return (
    <div className="reveal-overlay printer-reveal" aria-hidden="true">
      <div className="printer-page-dim" />
      <div className="reveal-dim" />
      <div className="printer-scene">
        <img
          className="printer-machine"
          src="/assets/printer-reveal.webp"
          alt=""
          width="1536"
          height="1024"
        />
        <div className="print-window">
          <div className="printed-ticket">
            <FinishedTicket details={details} type={type} number={number} />
          </div>
        </div>
        <div className="printer-lip" />
        <p className="printing-caption">PRINTING YOUR MOMENT.</p>
      </div>
    </div>
  );
}
