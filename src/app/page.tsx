import Input from "@/components/Input";
import Badge from "@/components/Badge";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
        <div className="flex h-screen items-center justify-center">
      <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-gray-900">2024년 기술 동향</h5>
          <p className="mb-3 font-normal text-gray-700">
            최신 기술 동향에 대한 기사를 통해 혁신적인 아이디어와 트렌드를
            탐구해보세요. 이 글에서는 인공지능과 머신러닝의 발전이 우리 생활에
            미치는 영향을 다룹니다.
          </p>
          <button className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white">더보기</button>
        </div>
      </div>
    </div>
    <div className="space-y-2 p-4">
        <Input type="text" placeholder="안녕하세요" />
        <Input type="text" className="w-64 border-red-400" />
    </div>
    <div className="space-x-2 p-4">
        <Badge>default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge className="bg-blue-500 text-white">custom</Badge>
     </div>
     <div className="space-y-2 p-4">
        <Card>
          <h2 className="mb-4 text-xl font-bold">제목</h2>
          <p className="text-gray-600">내용</p>
        </Card>
        {/* 옵션 지정 */}
        <Card variant="outlined" padding="lg" radius="lg">
          <h2 className="mb-4 text-xl font-bold">제목</h2>
          <p className="text-gray-600">내용</p>
        </Card>
        {/* 외부 className 추가 (tailwind-merge 덕분에 충돌 없이 적용) */}
        <Card variant="elevated" className="max-w-lg bg-red-100">
          <h2 className="mb-4 text-xl font-bold">제목</h2>
          <p className="text-gray-600">내용</p>
        </Card>
     </div>
    </>

  );
}
