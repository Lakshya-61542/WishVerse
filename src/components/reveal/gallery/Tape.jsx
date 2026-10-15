const rotations = [-8, 5, -3, 7, -5];
const colors = [
  "bg-yellow-100/70",
  "bg-pink-100/70",
  "bg-blue-100/70",
  "bg-green-100/70",
  "bg-orange-100/70",
];

export default function Tape({ index = 0 }) {
  return (
    <div
      className={`absolute left-1/2 top-0 z-20 h-5 w-16 -translate-x-1/2 -translate-y-2 rounded-sm border border-white/20 shadow-md ${colors[index % colors.length]}`}
      style={{
        rotate: `${rotations[index % rotations.length]}deg`,
        backdropFilter: "blur(2px)",
      }}
    />
  );
}