"use client";

import { useState } from "react";

type Status = "idle" | "running" | "done";

export default function Home() {
  // 1. 뒤집힌 상태 저장
  const [isFlipped, setIsFlipped] = useState(false);

  // 항상 오른쪽으로만 회전
  // const [rotation, setRotation] = useState(0);

  // 1. status: 현재 다운로드 진행 상황
  const [status, setStatus] = useState<Status>("idle");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      {/* 카드 플립 */}
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

      {/* 프로그레스 바 */}
      <div className="flex flex-col items-center gap-6">
        <button
          // 2. 버튼 클릭 시 다운로드 시작
          onClick={() => {
            setStatus("running");
          }}
          // 다운로드 시작 후에는 disabled 처리
          disabled={status !== "idle"}
          className="rounded bg-blue-500 px-6 py-2 text-white disabled:opacity-50"
        >
          다운로드
        </button>

        <div className="h-6 w-80 overflow-hidden rounded-full bg-gray-200">
          <div
            // tailwind css로 duration을 따로 적용할 수 없어서 inline style로 적용
            style={{
              transitionProperty: "background-color, width",
              transitionDuration: "0.8s, 3s", // background-color는 0.8초, width는 3초
              transitionTimingFunction: "ease-in-out",
            }}
            className={`h-full rounded-full ${
              status === "idle" ? "w-0 bg-blue-500" : "w-full bg-green-500"
            }`}
            onTransitionEnd={(e) => {
              console.log("onTransitionEnd 이벤트 호출 횟수 확인하기");
              if (e.propertyName === "background-color") {
                // 0.8초 만에 색상만 먼저 변경 완료
                // 여기서 "done" 처리하면? -> 바가 아직 10%도 안 찼는데 완료 표시가 됨
                console.log(
                  `색상 변경 완료 (${e.elapsedTime}초) - 아직 진행 중!`,
                );
              }

              if (e.propertyName === "width" && status === "running") {
                // 3초 후 width 변경 완료 = 진짜 다운로드 완료
                console.log(`다운로드 완료! (${e.elapsedTime}초 소요)`);
                setStatus("done");
              }
            }}
          />
        </div>

        <p className="text-lg font-medium">
          {status === "idle" && "대기 중"}
          {status === "running" && "다운로드 중..."}
          {status === "done" && "다운로드 완료!"}
        </p>
      </div>
    </div>
  );
}
