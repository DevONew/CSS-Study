"use client";

import { useState } from "react";

export default function Home() {
  // 1. 뒤집힌 상태 저장
  const [isFlipped, setIsFlipped] = useState(false);

  // 항상 오른쪽으로만 회전
  // const [rotation, setRotation] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        // 7. perspective-midrange 클래스로 원근감 추가하기
        // 마치 카메라 같은 역할을 하므로 3d 피사체(transform-3d)보다 부모 요소에 추가하기
        className="cursor-pointer perspective-midrange"
        // 3. 클릭을 통해 isFilpped 상태 변화
        onClick={() => setIsFlipped(!isFlipped)}
        // 항상 오른쪽으로만 회전
        // onClick={() => setRotation(rotation + 180)}
      >
        <div
          // 4. 클릭 시 isFlipped 상태에 따라 rotate-y-180 클래스 추가/제거
          // 5. transform-3d 클래스로 3d로 회전할 수 있게 추가하기
          // 6. transition-transform duration-700 클래스로 0.7초 동안 회전하도록 추가하기
          className={`relative h-96 w-64 transition-transform duration-700 transform-3d ${isFlipped ? "rotate-y-180" : ""}`}
          // 항상 오른쪽으로만 회전
          // style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <div className="absolute flex h-full w-full items-center justify-center rounded-xl bg-white p-4 shadow-lg">
            <div>카드앞면</div>
          </div>
          {/* 2. backface-hidden으로 180도 뒤집힌 부분을 보이제 않게 숨김 */}
          <div className="absolute flex h-full w-full rotate-y-180 items-center justify-center rounded-xl bg-blue-500 p-4 text-white shadow-lg backface-hidden">
            <div>카드뒷면</div>
          </div>
        </div>
      </div>
    </div>
  );
}
