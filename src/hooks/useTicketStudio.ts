import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  emptyDetails,
  isTicketValid,
  newTicketNumber,
  requiredFields,
  shareSummary,
  validateField,
  type FieldName,
  type TicketDetails,
  type TicketType,
} from "../lib/ticket";
export type Phase = "editing" | "closing" | "opening" | "finished";

export function useTicketStudio() {
  const [details, setDetails] = useState<TicketDetails>({ ...emptyDetails });
  const [type, setType] = useState<TicketType>("Classic");
  const [number, setNumber] = useState(newTicketNumber);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [phase, setPhase] = useState<Phase>("editing");
  const [notice, setNotice] = useState("");
  const [manualShare, setManualShare] = useState("");
  const [busy, setBusy] = useState<"download" | "share" | null>(null);
  const ticketRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const valid = isTicketValid(details);

  useEffect(() => {
    if (phase === "closing") {
      const timer = window.setTimeout(() => setPhase("opening"), 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "opening") {
      const timer = window.setTimeout(
        () => setPhase("finished"),
        reducedMotion ? 180 : 600,
      );
      return () => clearTimeout(timer);
    }
    if (phase === "finished") {
      headingRef.current?.focus({ preventScroll: true });
      document.getElementById("ticket-stage")?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    }
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 6000);
    return () => clearTimeout(timer);
  }, [notice]);

  function focusForm() {
    requestAnimationFrame(() => {
      document.getElementById("field-name")?.focus({ preventScroll: true });
      document.getElementById("ticket-stage")?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    });
  }
  function create() {
    if (!valid) {
      setTouched(
        Object.fromEntries(requiredFields.map((field) => [field, true])),
      );
      const invalid = requiredFields.find((field) =>
        validateField(field, details[field]),
      );
      document.getElementById(`field-${invalid}`)?.focus();
      return;
    }
    setNotice("");
    setManualShare("");
    setPhase(reducedMotion ? "opening" : "closing");
  }
  function edit() {
    setPhase("editing");
    setNotice("");
    setManualShare("");
    focusForm();
  }
  function reset() {
    setDetails({ ...emptyDetails });
    setType("Classic");
    setNumber(newTicketNumber());
    setTouched({});
    setPhase("editing");
    setNotice("");
    setManualShare("");
    focusForm();
  }
  async function download() {
    setBusy("download");
    setNotice("");
    try {
      if (!ticketRef.current) throw new Error("Ticket unavailable");
      await document.fonts.ready;
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(ticketRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#ffffff",
        style: {
          transform: "none",
          margin: "0",
          animation: "none",
          boxShadow: "none",
        },
      });
      if (!blob) throw new Error("Image unavailable");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `MY-TICKET-${number}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
      setNotice("Ticket downloaded. A little memory to keep.");
    } catch {
      setNotice(
        "Opening a print-friendly ticket. You can print it or save it as a PDF.",
      );
      window.print();
    } finally {
      setBusy(null);
    }
  }
  async function share() {
    setBusy("share");
    setNotice("");
    setManualShare("");
    const text = shareSummary(details, type, number);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${details.event.trim()} — MY TICKET`,
          text,
        });
        setNotice("Your ticket details have been shared.");
      } else {
        await navigator.clipboard.writeText(text);
        setNotice("Ticket details copied. Ready to share.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(text);
        setNotice("Ticket details copied. Ready to share.");
      } catch {
        setManualShare(text);
        setNotice("Select and copy the ticket details below to share.");
      }
    } finally {
      setBusy(null);
    }
  }
  return {
    details,
    type,
    number,
    touched,
    valid,
    phase,
    notice,
    manualShare,
    busy,
    ticketRef,
    headingRef,
    reducedMotion,
    create,
    edit,
    reset,
    download,
    share,
    change: (field: FieldName, value: string) =>
      setDetails((current) => ({ ...current, [field]: value })),
    blur: (field: FieldName) =>
      setTouched((current) => ({ ...current, [field]: true })),
    setType,
  };
}
