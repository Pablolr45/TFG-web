export default function Card({ title, onClick}: { title: string, onClick: ()=>void  }) {
 
  return (
    <div onClick={onClick} className="grid w-[calc(20%-0.5rem-1%)] first:ml-[calc(2.5%)] shrink-0 grow-0 grid-rows-[150px_70px] rounded-md shadow-md">
      <div className="bg-gray-500 h-full rounded-t-md"></div>
      <div className="p-1 text-center">
        <span className="text-lg font-semibold">
          {title} 
        </span>
      </div>
    </div>
  );
}
