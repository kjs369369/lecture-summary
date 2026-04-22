import type { LinkItem } from "@/lib/types";

export function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group block border-3 border-ink bg-paper p-4 shadow-brutal-sm transition-transform hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="font-display font-bold">{link.label}</div>
          {link.note && (
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/60">
              {link.note}
            </div>
          )}
          <div className="mt-2 break-all text-xs text-ink/60">{link.url}</div>
        </div>
        <span className="shrink-0 text-lg">↗</span>
      </div>
    </a>
  );
}
