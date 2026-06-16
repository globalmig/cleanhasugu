"use client";

export default function BgVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        filter: "blur(4px)",
        transform: "scale(1.06)",
      }}
    />
  );
}
