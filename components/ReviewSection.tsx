const REVIEWS_A = [
  { name: "김**", area: "서울 은평구", rating: 5, text: "3년째 막혀있던 주방 하수구가 드디어 해결됐어요! 내시경으로 원인 보여주시면서 설명해주셔서 믿음이 갔습니다.", date: "2025.11.03" },
  { name: "박**", area: "경기 고양시", rating: 5, text: "주말에 갑자기 변기가 막혀서 긴급 연락했는데 2시간 안에 오셨어요. 빠른 출동 최고입니다!", date: "2025.10.28" },
  { name: "이**", area: "서울 마포구", rating: 5, text: "욕실 하수구 냄새가 완전히 사라졌어요. 원인을 찾아 설명해 주시니 너무 신뢰가 갔습니다.", date: "2025.10.19" },
  { name: "최**", area: "인천 남동구", rating: 5, text: "다른 업체에서 안 된다고 했는데 여기서는 한 번에 뚫렸어요. 진짜 전문가시네요.", date: "2025.10.12" },
  { name: "정**", area: "경기 일산", rating: 5, text: "세면대랑 주방 싱크대 동시에 막혀서 당황했는데 깔끔하게 모두 해결해주셨어요. 감사합니다!", date: "2025.10.05" },
  { name: "강**", area: "서울 강서구", rating: 5, text: "고압세척 후 물 내려가는 속도가 완전 달라졌어요. 진작 부를걸 그랬어요!", date: "2025.09.30" },
  { name: "윤**", area: "서울 노원구", rating: 5, text: "어르신 혼자 계시는 집인데 친절하고 꼼꼼하게 해주셨다고 연락이 왔어요. 믿고 맡길 수 있는 업체!!", date: "2025.09.22" },
  { name: "조**", area: "경기 파주시", rating: 5, text: "가격도 합리적이고 설명도 상세하게 해주셔서 너무 좋았어요. 재발 방지까지 해주셔서 안심됩니다.", date: "2025.09.15" },
  { name: "임**", area: "서울 송파구", rating: 5, text: "화장실 세 개 모두 점검해 주셨어요. 오래된 아파트라 걱정했는데 전부 깨끗하게 처리됐습니다!", date: "2025.09.08" },
  { name: "한**", area: "경기 남양주", rating: 5, text: "냄새 문제로 수개월 고생했는데 원인이 배관 내부 이물질이었네요. 제거 후 완전히 없어졌어요.", date: "2025.08.28" },
];

const REVIEWS_B = [
  { name: "오**", area: "서울 강남구", rating: 5, text: "처음에 반신반의했는데 내시경으로 직접 보여주시니 믿음이 갔어요. 결과도 완벽했습니다!", date: "2025.08.20" },
  { name: "서**", area: "경기 성남시", rating: 5, text: "이사 온 뒤부터 하수구가 자꾸 막혔는데 이번에 제대로 청소하고 나니 아무 문제 없어요.", date: "2025.08.14" },
  { name: "신**", area: "서울 동작구", rating: 5, text: "긴급 출동 요청했는데 1시간 만에 도착하셨어요. 작업도 빠르고 마무리까지 깔끔했습니다.", date: "2025.08.07" },
  { name: "권**", area: "인천 계양구", rating: 5, text: "변기 막힘 + 세면대 악취 두 가지 문제를 한 번에 해결해 주셨어요. 역시 전문가가 달라요!", date: "2025.07.30" },
  { name: "황**", area: "경기 의정부", rating: 5, text: "자격증 있는 기술자라서 더 믿음이 갔어요. 시공 후 코팅까지 해주셔서 재발 걱정이 없어요.", date: "2025.07.22" },
  { name: "안**", area: "서울 용산구", rating: 5, text: "주방과 화장실 배관을 내시경으로 확인하고 정밀 세척해주셨어요. 진짜 완벽한 서비스!", date: "2025.07.15" },
  { name: "류**", area: "서울 중랑구", rating: 5, text: "공사 없이 세척만으로 해결될 거라고 하셔서 비용도 절약했어요. 정직한 업체네요.", date: "2025.07.08" },
  { name: "전**", area: "경기 구리시", rating: 5, text: "견적 먼저 확인 후 진행하니 추가 비용 없이 깔끔하게 마무리됐습니다. 강력 추천해요!", date: "2025.06.29" },
  { name: "장**", area: "서울 성북구", rating: 5, text: "3개 화장실 전부 고압세척 받았어요. 확연히 다른 물 내려가는 속도에 깜짝 놀랐습니다.", date: "2025.06.22" },
  { name: "홍**", area: "경기 하남시", rating: 5, text: "저희 식당 주방 배관인데 기름때가 엄청났어요. 다 제거해주시고 정기 관리도 부탁드렸어요.", date: "2025.06.14" },
];

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < count ? "#FFB800" : "#e5e7eb"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

function ReviewCard({ review }: { review: (typeof REVIEWS_A)[number] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 240,
        background: "#fff",
        borderRadius: 16,
        padding: "16px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f4",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1f2e" }}>{review.name}</span>
          <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>{review.area}</span>
        </div>
        <Stars count={review.rating} />
      </div>
      <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.65, margin: "0 0 10px" }}>
        {review.text}
      </p>
      <span style={{ fontSize: 11, color: "#d1d5db" }}>{review.date}</span>
    </div>
  );
}

export default function ReviewSection() {
  const doubled_a = [...REVIEWS_A, ...REVIEWS_A];
  const doubled_b = [...REVIEWS_B, ...REVIEWS_B];

  return (
    <section style={{ background: "#fff", paddingTop: 80, paddingBottom: 80 }}>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .track-left  { animation: marquee-left  32s linear infinite; }
        .track-right { animation: marquee-right 32s linear infinite; }
        .review-marquee:hover .track-left,
        .review-marquee:hover .track-right { animation-play-state: paused; }
      `}</style>

      {/* 헤더 */}
      <div style={{ textAlign: "center", padding: "0 20px 32px" }}>
        <div className="section-divider" />
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a1f2e", margin: "0 0 16px" }}>
          고객 후기
        </h2>

        {/* 종합 평점 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {/* 평점 숫자 */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 52, fontWeight: 900, color: "#1a1f2e", lineHeight: 1, margin: 0 }}>4.9</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, margin: "6px 0 4px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FFB800">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>1,247개 리뷰</p>
          </div>

          {/* 별점 분포 바 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 160 }}>
            {[
              { star: 5, pct: 91 },
              { star: 4, pct: 7 },
              { star: 3, pct: 1 },
              { star: 2, pct: 1 },
              { star: 1, pct: 0 },
            ].map(({ star, pct }) => (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: "#6b7280", width: 14, textAlign: "right" }}>{star}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFB800">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div style={{ flex: 1, height: 6, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#FFB800,#FF8C00)", borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", width: 26 }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 마퀴 두 줄 */}
      <div className="review-marquee" style={{ display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
        {/* 1열: 왼쪽으로 */}
        <div className="track-left" style={{ display: "flex", gap: 12, width: "max-content" }}>
          {doubled_a.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>

        {/* 2열: 오른쪽으로 */}
        <div className="track-right" style={{ display: "flex", gap: 12, width: "max-content" }}>
          {doubled_b.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>
    </section>
  );
}
