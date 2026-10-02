import { Download, Edit3, Plus, Share2 } from "lucide-react";

type Props = {
  busy: "download" | "share" | null;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onReset: () => void;
};
export function ActionButtons({
  busy,
  onDownload,
  onShare,
  onEdit,
  onReset,
}: Props) {
  return (
    <div className="action-buttons" aria-label="Ticket actions">
      <div className="primary-actions">
        <button
          className="button button-primary"
          onClick={onDownload}
          disabled={busy !== null}
        >
          <Download size={17} aria-hidden="true" />
          {busy === "download" ? "Saving ticket…" : "Download ticket"}
        </button>
        <button
          className="button button-outline"
          onClick={onShare}
          disabled={busy !== null}
        >
          <Share2 size={17} aria-hidden="true" />
          {busy === "share" ? "Sharing…" : "Share ticket"}
        </button>
      </div>
      <div className="secondary-actions">
        <button
          className="text-button"
          onClick={onEdit}
          disabled={busy !== null}
        >
          <Edit3 size={14} aria-hidden="true" />
          Edit ticket
        </button>
        <button
          className="text-button"
          onClick={onReset}
          disabled={busy !== null}
        >
          <Plus size={15} aria-hidden="true" />
          Create another
        </button>
      </div>
    </div>
  );
}
