export const ticketTypes = ["Classic", "Concert", "VIP"] as const;
export type TicketType = (typeof ticketTypes)[number];
export type TicketDetails = {
  name: string;
  event: string;
  date: string;
  time: string;
  venue: string;
  message: string;
};
export type FieldName = keyof TicketDetails;
export const emptyDetails: TicketDetails = {
  name: "",
  event: "",
  date: "",
  time: "",
  venue: "",
  message: "",
};
export const requiredFields: FieldName[] = [
  "name",
  "event",
  "date",
  "time",
  "venue",
];

export function newTicketNumber() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0];
  return String(random % 1_000_000).padStart(6, "0");
}
export function validateField(field: FieldName, value: string) {
  if (field === "message") return "";
  const messages: Record<FieldName, string> = {
    name: "Add the name you’d like on your ticket.",
    event: "Give your event a title.",
    date: "Choose your event date.",
    time: "Choose your event time.",
    venue: "Add a venue or city.",
    message: "",
  };
  if (!value.trim()) return messages[field];
  if (field === "date") {
    const parsed = new Date(`${value}T12:00:00`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      Number.isNaN(parsed.getTime()) ||
      parsed.getFullYear() < 1900 ||
      parsed.getFullYear() > 9999 ||
      `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}` !==
        value
    )
      return "Choose a valid date between 1900 and 9999.";
  }
  if (field === "time" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value))
    return "Choose a valid event time.";
  return "";
}
export function isTicketValid(details: TicketDetails) {
  return requiredFields.every((field) => !validateField(field, details[field]));
}
export function formatDate(value: string) {
  if (!value || validateField("date", value)) return "Your date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
export function formatTime(value: string) {
  if (!value || validateField("time", value)) return "Your time";
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}
export function shareSummary(
  details: TicketDetails,
  type: TicketType,
  number: string,
) {
  return `${details.event.trim()}\nMade for ${details.name.trim()}\n${formatDate(details.date)} · ${formatTime(details.time)}\n${details.venue.trim()}${details.message.trim() ? `\n“${details.message.trim()}”` : ""}\n${type} · No. ${number}\nMY TICKET — Digital ticket design preview. Decorative preview; not valid for event entry.`;
}
