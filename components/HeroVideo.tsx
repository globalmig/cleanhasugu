"use client";

import { useRef, useState } from "react";

const VIDEOS = ["/videos/hero_01.mp4", "/videos/hero_02.mp4"];

export default function HeroVideo() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEOS.length);
  };

  return (
    <video
      ref={videoRef}
      key={index}
      src={VIDEOS[index]}
      autoPlay
      muted
      playsInline
      onEnded={handleEnded}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        filter: "blur(5px)",
        transform: "scale(1.06)",  /* 블러 엣지 잘림 방지 */
      }}
    />
  );
}
