"use client";

type Props = {
  enabled: boolean;
  note: string;
  onEnabledChange: (v: boolean) => void;
  onNoteChange: (v: string) => void;
};

export function GiftNoteToggle({
  enabled,
  note,
  onEnabledChange,
  onNoteChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#2a1a14]/10 bg-[#fffaf5] p-4">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#1f6b45]"
        />
        <span>
          <span className="block text-sm font-semibold text-[#2a1a14]">
            Add a gift note
          </span>
          <span className="mt-0.5 block text-xs text-[#5c463c]">
            We’ll include your message when we wrap the piece.
          </span>
        </span>
      </label>
      {enabled && (
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={3}
          placeholder='e.g. "Happy birthday, Maya — with love"'
          className="mt-3 w-full resize-none rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 text-sm text-[#2a1a14] outline-none focus:border-[#1f6b45]"
        />
      )}
    </div>
  );
}
