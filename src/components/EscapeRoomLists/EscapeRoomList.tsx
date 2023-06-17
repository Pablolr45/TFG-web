import CardSala from "../Cards/CardSala";

const escaperooms = [
  { title: "Piso", value: "piso", url: "/escape-room/piso.png" },
  { title: "Isla", value: "isla", url: "/escape-room/isla.png" },
];

export default function EscapeRoomList({
  handleValue,
  value,
}: {
  handleValue: (value: string) => void;
  value: string;
}) {
  return (
    <div className="flex gap-2">
      {escaperooms.map((escaperoom) => (
        <CardSala
          active={escaperoom.value === value}
          onClick={() => handleValue(escaperoom.value)}
          title={escaperoom.title}
          key={escaperoom.value}
        />
      ))}
    </div>
  );
}
