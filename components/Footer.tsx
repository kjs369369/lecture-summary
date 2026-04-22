export function Footer() {
  return (
    <footer className="mt-20 border-t-3 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              KAEA &amp; AICLab
            </h3>
            <p className="mt-2 text-sm opacity-80">대표자: 김진수</p>
          </div>
          <div className="space-y-1 text-sm">
            <p>
              📞 <a href="tel:01089219536" className="underline">010-8921-9536</a>
            </p>
            <p>
              ✉️ <a href="mailto:info@aiclab2020.com" className="underline">info@aiclab2020.com</a>
            </p>
            <p>
              🌐{" "}
              <a
                href="https://kimjinsoo-info.lovable.app"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                kimjinsoo-info.lovable.app
              </a>
            </p>
            <p className="opacity-80">
              📍 서울특별시 서초구 서초중앙로2길 35 (서초동)
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-paper/30 pt-4 text-xs opacity-60">
          © {new Date().getFullYear()} KAEA &amp; AICLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
