const ROW1 = ["Instagram Ready", "WhatsApp Ready", "Smart Auto", "100% Offline", "No Login", "Zero Upload", "Private by Design", "Photo & Video"];
const ROW2 = ["Browser Native", "Instant Results", "No Account", "Client-Side", "Lossless Quality", "Social Optimized", "Zero Telemetry", "Open & Compress"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div
        className={`flex whitespace-nowrap ${reverse ? "marquee-right" : "marquee-left"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-8 text-[11px] font-medium tracking-[0.2em] uppercase select-none"
            style={{ color: i % 4 === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)" }}
          >
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.12)" }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse />
    </div>
  );
}
