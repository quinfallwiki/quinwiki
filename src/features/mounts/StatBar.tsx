interface StatBarProps {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
  accent?: string;
}

export function StatBar({ label, value, accent = 'bg-frost-400' }: StatBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-steel-400">
        <span>{label}</span>
        <span className="text-steel-300">{value} / 5</span>
      </div>
      <div className="mt-1 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < value ? accent : 'bg-steel-700/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
