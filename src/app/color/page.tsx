export default function Home() {
  return (
    <div>
        <div className="h-24 w-24 bg-red-500 sm:bg-yellow-500 md:bg-green-500 lg:bg-blue-500"></div>
        <div className="flex sm:justify-center">
            <div className="h-64 w-64 bg-black text-white">
                모바일 사이즈에서 중앙정렬인가?
            </div>
        </div>
        {/* <main className="mx-auto">
            <h1 className="tablet:bg-red-500 laptop:bg-blue-500 desktop:bg-green-500">
                안녕
            </h1>
        </main> */}
        <div>
            <div className="w-[clamp(200px,50%,600px)] bg-amber-200">
            <h1 className="text-[clamp(1.5rem,4vw,3rem)]">웹사이트 접근성</h1>
        </div>
    </div>
    </div>

  );
}