import { useState } from "react";

export default function CardSala({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
}) {

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col rounded-md shadow-md ${
        active ? "ring-4 ring-virtual-200" : ""
      }`}
    >
      <div className="bg-gray-500 h-full p-6 rounded-t-md flex-grow w-full flex-row justify-between">
        Imagen
      </div>
      <div className="p-1 text-center">
        <span className="text-lg font-semibold">{title}</span>
      </div>
    </div>
  );
}
