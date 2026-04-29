"use client";
import { motion, AnimatePresence } from "motion/react";

import { useState, useEffect } from "react";

export const WordChangeAnimation = ({
  prefix,
  suffix,
  words,
  interval = 2000,
}: {
  prefix: string;
  suffix: string;
  words: string[];
  interval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // currentIndex를 현재 단어 개수로 나눈 나머지를 구함
      // 단어가 4개라면 0, 1, 2, 3, 0, 1, 2, 3, ...
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="flex h-12 items-center overflow-hidden text-2xl">
      <span>{prefix}</span>
      <div className="relative mx-2 inline-block w-12 overflow-hidden">
        {/* popLayout: 사라질 때 그 단어가 차지하는 공간을 없애버리기 위함 */}
        <AnimatePresence mode="popLayout">
          <motion.span
            // 키가 달라지면 새로운 애니메이션 생성
            key={currentIndex}
            // 처음에는 아래 50px 위치 및 안보이게
            initial={{ y: 50, opacity: 0 }}
            // 애니메이션 시작 시 원래 위치 차지 및 나타나기
            animate={{ y: 0, opacity: 1 }}
            // 애니메이션 종료 시 위로 50px 이동하면서 사라짐
            exit={{ y: -50, opacity: 0 }}
            // 애니메이션 지속 시간
            transition={{ duration: 0.5 }}
            className="inline-block font-bold text-blue-600"
          >
            {`${words[currentIndex]}`}
          </motion.span>
        </AnimatePresence>
      </div>
      <span>{suffix}</span>
    </div>
  );
};

export const TypingEffect = ({
  text,
  typingSpeed = 150,
}: {
  text: string;
  typingSpeed?: number;
}) => {
  // 현재 입력된 텍스트
  const [displayText, setDisplayText] = useState("");
  // 현재 입력된 텍스트의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    // 현재 입력된 텍스트의 인덱스가 텍스트의 길이보다 작으면
    if (currentIndex < text.length) {
      // 타이핑 효과 실행
      timer = setTimeout(() => {
        // 현재 입력된 텍스트에 새로운 문자 추가
        setDisplayText((prev) => prev + text[currentIndex]);
        // 현재 입력된 텍스트의 인덱스 증가
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
    }

    // useEffect 재실행 전 이전 타이머 정리 & 컴포넌트 unmount 직전 정리
    return () => clearTimeout(timer);
  }, [currentIndex, text, typingSpeed]);

  return (
    <div className="font-mono text-2xl">
      {/* 현재 입력된 텍스트 */}
      {displayText}
      {/* 깜빡거리는 타이핑 커서 */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block h-5 w-2 bg-black"
      />
    </div>
  );
};

export const AnimatedProgressBar = ({ maxValue = 100, height = 12 }) => {
  // API 응답으로 받을 값을 저장할 상태
  const [value, setValue] = useState(0);
  // API 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 호출을 시뮬레이션 (실제로는 여기서 API 요청을 수행)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 실제 API 호출 예시:
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setValue(data.progressValue);

        // API 호출 시뮬레이션 (0.5초 ~ 2초 사이 지연)
        await new Promise((resolve) =>
          setTimeout(resolve, 500 + Math.random() * 1500),
        );

        // 랜덤 값으로 시뮬레이션 (실제로는 API 응답 데이터를 사용)
        const randomValue = Math.floor(Math.random() * 101);
        setValue(randomValue);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 퍼센트로 변환
  const percentage = (value / maxValue) * 100;

  return (
    <div className="w-full">
      {/* 프로그레스바 컨테이너 */}
      <div
        className="w-full overflow-hidden rounded-full bg-gray-200"
        style={{ height: `${height}px` }}
      >
        {!isLoading && (
          <motion.div
            className="h-full bg-blue-500"
            // 초기 width: 0 & 애니메이션 시작 시 width: `${percentage}%`
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        )}
      </div>

      {/* 로딩 및 값 표시 */}
      <div className="mt-2 text-right text-sm">
        {isLoading ? (
          <div className="animate-pulse text-gray-500">데이터 로딩 중...</div>
        ) : (
          <motion.div
            // 애니메이션 시작 시 아래 10px 위치 및 안보이게
            initial={{ opacity: 0, y: 10 }}
            // 애니메이션 종료 시 위로 이동하면서 보이게
            animate={{ opacity: 1, y: 0 }}
            className="font-medium text-blue-600"
          >
            {value} / {maxValue} ({percentage.toFixed(1)}%)
          </motion.div>
        )}
      </div>
    </div>
  );
};

// 여러 프로그레스바를 동시에 보여주는 예제 컴포넌트
const ProgressBarExample = () => {
  return (
    <div className="mx-auto max-w-xl space-y-8 p-6">
      <h2 className="mb-4 text-xl font-bold">
        API 데이터로 애니메이션되는 프로그레스바
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-medium">사용자 진행도</h3>
          <AnimatedProgressBar maxValue={100} height={12} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">다운로드 상태</h3>
          <AnimatedProgressBar maxValue={100} height={8} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">시스템 리소스</h3>
          <AnimatedProgressBar maxValue={100} height={16} />
        </div>
      </div>
    </div>
  );
};

// 사용 예시
export default function WordChangeExample() {
  // 단어 목록
  const words = ["러닝", "게임", "볼링", "요가", "독서"];

  return (
    <div className="flex flex-col gap-12 p-8">
      <WordChangeAnimation
        prefix="오늘은"
        suffix="어떤가요?"
        words={words}
        interval={2000}
      />
      <TypingEffect text="오늘은 러닝 어떤가요?" typingSpeed={100} />
      <ProgressBarExample />
    </div>
  );
}
