interface Props {
  label: string;
  value: string | number;
  tone?: "teal" | "green" | "coral" | "amber" | "blue";
}

const tones = {
  teal: "var(--teal)",
  green: "var(--green)",
  coral: "var(--coral)",
  amber: "var(--amber)",
  blue: "var(--blue)",
};

export default function StatCard({ label, value, tone = "teal" }: Props) {
  return (
    <div className="panel p-4">
      <div className="text-2xl font-semibold" style={{ color: tones[tone] }}>
        {value}
      </div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}
