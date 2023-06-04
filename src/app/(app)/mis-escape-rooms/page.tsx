"use client";
import Card from "@/components/Cards/Card";
import { useEffect, useRef, useState } from "react";

export default function MisEscapesRooms() {
  const [page, setPage] = useState(0);
  const carrousel = useRef<HTMLDivElement>(null)
useEffect(()=> {
    if(carrousel.current!==null) {
        const width = carrousel.current.clientWidth;
        carrousel.current.style.transform = `translateX(-${Number(width)*0.95*page-9*page}px)`
    }
}, [page])
  return (
    <main className="p-5">
      <section className="relative p-1">
        <div
          onClick={() => setPage(page - 1)}
          className="bg-blue-800 z-20 top-[calc(50%-1.25rem)] left-[-1rem] text-white font-bold absolute p-2 w-10 h-10 flex items-center justify-center rounded-full"
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
              transition: "all 1s ease-out"
            }}
            className={`flex p-1 flex-row gap-2`}
          >
            {/* 6% -85%  -176*/}
            <Card title="1" />
            <Card title="2" />
            <Card title="3" />
            <Card title="4" />
            <Card title="5" />
            <Card title="6" />
            <Card title="7" />
            <Card title="8" />
            <Card title="9" />
            <Card title="10" />
            <Card title="11" />
            <Card title="12" />
            <Card title="13" />
            <Card title="14" />
            <Card title="15" />
            <Card title="16" />
            <Card title="17" />
            <Card title="18" />
            <Card title="19" />
            <Card title="20" />
            <Card title="21" />
            <Card title="22" />
            <Card title="23" />
          </div>
        </div>
      </section>
    </main>
  );
}
