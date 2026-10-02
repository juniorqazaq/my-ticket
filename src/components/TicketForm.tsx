import { ArrowRight } from "lucide-react";
import { TicketHeader, TicketPreview } from "./TicketPreview";
import { TicketRibbon } from "./TicketRibbon";
import {
  ticketTypes,
  validateField,
  type FieldName,
  type TicketDetails,
  type TicketType,
} from "../lib/ticket";

const fields: {
  key: FieldName;
  label: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
}[] = [
  { key: "name", label: "Name", placeholder: "Your name here", maxLength: 40 },
  {
    key: "event",
    label: "Event title",
    placeholder: "What’s the occasion?",
    maxLength: 60,
  },
  { key: "date", label: "Date", placeholder: "", type: "date" },
  { key: "time", label: "Time", placeholder: "", type: "time" },
  {
    key: "venue",
    label: "Venue or city",
    placeholder: "Somewhere worth remembering",
    maxLength: 80,
  },
  {
    key: "message",
    label: "Optional message",
    placeholder: "A little note for the night…",
    maxLength: 120,
  },
];
type Props = {
  details: TicketDetails;
  type: TicketType;
  number: string;
  touched: Partial<Record<FieldName, boolean>>;
  valid: boolean;
  onChange: (field: FieldName, value: string) => void;
  onBlur: (field: FieldName) => void;
  onType: (type: TicketType) => void;
  onSubmit: () => void;
};

export function TicketForm({
  details,
  type,
  number,
  touched,
  valid,
  onChange,
  onBlur,
  onType,
  onSubmit,
}: Props) {
  return (
    <form
      className={`paper-ticket editable-ticket type-${type.toLowerCase()}`}
      aria-label="Create your personal ticket"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="ticket-body">
        <TicketHeader type={type} />
        <TicketRibbon />
        <div className="ticket-fields">
          {fields.map((field) => {
            const error = touched[field.key]
              ? validateField(field.key, details[field.key])
              : "";
            const id = `field-${field.key}`;
            return (
              <div
                className={`ticket-field field-${field.key} ${error ? "has-error" : ""}`}
                key={field.key}
              >
                <label htmlFor={id}>
                  {field.label}
                  {field.key !== "message" ? (
                    <span aria-hidden="true"> *</span>
                  ) : null}
                </label>
                {field.key === "message" ? (
                  <textarea
                    id={id}
                    rows={1}
                    value={details.message}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    id={id}
                    type={field.type || "text"}
                    required
                    value={details[field.key]}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    autoComplete={field.key === "name" ? "name" : "off"}
                    min={field.key === "date" ? "1900-01-01" : undefined}
                    max={field.key === "date" ? "9999-12-31" : undefined}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    onBlur={() => onBlur(field.key)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                  />
                )}
                {error ? (
                  <p className="field-error" id={`${id}-error`} role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <fieldset className="type-selector">
          <legend>Ticket type</legend>
          <div className="type-options">
            {ticketTypes.map((option) => (
              <label
                className={`type-option ${type === option ? "selected" : ""}`}
                key={option}
              >
                <input
                  type="radio"
                  name="ticket-type"
                  value={option}
                  checked={type === option}
                  onChange={() => onType(option)}
                />
                <span className="radio-mark" aria-hidden="true" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <TicketPreview details={details} number={number} />
      <div className="ticket-create">
        <button
          className="button button-primary create-button"
          type="submit"
          disabled={!valid}
          aria-describedby="create-hint"
        >
          Create ticket <ArrowRight size={18} aria-hidden="true" />
        </button>
        <p id="create-hint">
          {valid
            ? "Your next memory, ready to keep."
            : "Add your details above to make it yours."}
        </p>
        <p className="design-note">Digital ticket design preview</p>
      </div>
    </form>
  );
}
