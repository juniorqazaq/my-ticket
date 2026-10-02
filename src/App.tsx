import { Check } from "lucide-react";
import { TicketForm } from "./components/TicketForm";
import { FinishedTicket } from "./components/FinishedTicket";
import { ActionButtons } from "./components/ActionButtons";
import { Decorations } from "./components/Decorations";
import { PrinterReveal } from "./components/PrinterReveal";
import { useTicketStudio } from "./hooks/useTicketStudio";

export default function App() {
  const studio = useTicketStudio();
  const finished = studio.phase === "opening" || studio.phase === "finished";
  const revealing = studio.phase === "closing" || studio.phase === "opening";
  return (
    <>
      <a className="skip-link" href="#ticket-stage">
        Skip to your ticket
      </a>
      <header className="site-header">
        <p className="wordmark">
          <span className="brand-spark" aria-hidden="true" />
          MY TICKET
        </p>
        <p className="header-step">
          <span>{finished ? "02" : "01"}</span>
          <span className="step-slash">/</span>
          {finished ? "ALL YOURS" : "MAKE IT YOURS"}
        </p>
      </header>
      <main className="studio">
        <h1 className="sr-only">Create a personalized digital ticket</h1>
        <Decorations />
        <div
          id="ticket-stage"
          className={`ticket-stage ${studio.phase === "opening" ? "is-opening" : ""}`}
        >
          {finished ? (
            <FinishedTicket
              ref={studio.ticketRef}
              headingRef={studio.headingRef}
              details={studio.details}
              type={studio.type}
              number={studio.number}
            />
          ) : (
            <TicketForm
              details={studio.details}
              type={studio.type}
              number={studio.number}
              touched={studio.touched}
              valid={studio.valid && !revealing}
              onChange={studio.change}
              onBlur={studio.blur}
              onType={studio.setType}
              onSubmit={studio.create}
            />
          )}
          {studio.phase === "finished" ? (
            <ActionButtons
              busy={studio.busy}
              onDownload={studio.download}
              onShare={studio.share}
              onEdit={studio.edit}
              onReset={studio.reset}
            />
          ) : null}
          <div
            className={`notice ${studio.notice ? "visible" : ""}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {studio.notice ? (
              <>
                <Check size={15} aria-hidden="true" />
                {studio.notice}
              </>
            ) : null}
          </div>
          {studio.manualShare ? (
            <div className="manual-share">
              <label htmlFor="share-text">Your ticket details</label>
              <textarea
                id="share-text"
                readOnly
                value={studio.manualShare}
                rows={8}
                onFocus={(event) => event.target.select()}
              />
              <button
                className="text-button"
                onClick={() => document.getElementById("share-text")?.focus()}
              >
                Select text to copy
              </button>
            </div>
          ) : null}
        </div>
      </main>
      <footer className="site-footer">
        powered by <span>Bogenbayev Sanat</span>
      </footer>
      {revealing && !studio.reducedMotion ? (
        <PrinterReveal
          details={studio.details}
          type={studio.type}
          number={studio.number}
        />
      ) : null}
      <span className="sr-only" role="status">
        {revealing
          ? "Creating your ticket."
          : studio.phase === "finished"
            ? "Your ticket is ready."
            : ""}
      </span>
    </>
  );
}
