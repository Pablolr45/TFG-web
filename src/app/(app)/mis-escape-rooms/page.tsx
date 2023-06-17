"use client";
import Card from "@/components/Cards/Card";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { EscapeRoomService } from "@/services/escape-room.service";

export default function MisEscapesRooms() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const carrousel = useRef<HTMLDivElement>(null);
  const [escapeRooms, setEscapeRooms] = useState<EscapeRoom[]>([]);
  useEffect(() => {
    new EscapeRoomService()
      .getAll()
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setEscapeRooms(response);
      });
  });
  useEffect(() => {
    if (carrousel.current !== null) {
      const width = carrousel.current.clientWidth;
      carrousel.current.style.transform = `translateX(-${
        Number(width) * 0.95 * page - 9 * page
      }px)`;
    }
  }, [page]);
  const handleClick = () => {
    router.push("escape-room/5");
  };
  const handleClickEscape = () => {
    router.push("escape-room/5");
  };
  return (
    <main className="p-5">
      <section className="relative p-1">
        <div className="flex">
          <div className="ml-auto">
            <Button
              onClick={handleClick}
              startIcon={<AddIcon />}
              className="bg-virtual-500 hover:bg-virtual-700 text-black font-bold py-2 px-4 rounded mb-2"
            >
              Crear Escape Room
            </Button>
          </div>
        </div>

        <div
          onClick={() => setPage(page - 1)}
          className="bg-blue-700 z-20 top-[calc(50%-1.25rem)] left-[-1rem] text-white font-bold absolute p-2 w-10 h-10 flex items-center justify-center rounded-full"
        >{`<`}</div>
        <div
          onClick={() => setPage(page + 1)}
          className="bg-blue-800 z-20 top-[calc(50%-1.25rem)] right-[-1rem] text-white font-bold absolute p-2 w-10 h-10 flex items-center justify-center rounded-full"
        >{`>`}</div>
        <div className="w-full overflow-hidden">
          <div
            ref={carrousel}
            style={{
              flexWrap: "nowrap",
              transition: "all 1s ease-out",
            }}
            className={`flex p-1 flex-row gap-2`}
          >
            {/* 6% -85%  -176*/}
            {escapeRooms &&
              escapeRooms.map((escapeRoom: EscapeRoom) => {
                return (
                  <Card
                    key={escapeRoom._id}
                    onClick={()=>{
                      router.push(`/escape-room/${escapeRoom._id}`)
                    }}
                    title={escapeRoom.titulo}
                  ></Card>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
