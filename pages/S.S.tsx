import PageLayout from "../Common/PageLayout";
import PageHeader from "../Common/PageHeader";
import AnimatedSection from "../Common/AnimatedSection";

export default function SS_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "GF/C 여과지로 시료를 여과 → 105–110 ℃ 건조 → 항량 후 무게차로 부유물질(mg/L) 계산",
        "지표수·지하수·하·폐수 적용",
      ],
    },
    {
      title: "간섭 체크(전처리 전)",
      bullets: [
        "큰 입자(나뭇조각·굵은 모래)는 2 mm 금속망으로 먼저 거른 뒤 분석",
        "해수·고염 폐수 등은 용존염으로 과대값 위험 → 여과지 충분 세척",
        "Ca/Mg/Cl⁻/SO₄²⁻ 고농도: 흡습성 침전 발생 가능 → 건조시간 넉넉히(항량)",
        "오일·그리스·왁스 포함 시: 여과 후 깔때기·여과재를 건조 → 헥산 10 mL로 여러 번 세척 후 절차 계속",
      ],
    },
    {
      title: "여과지 준비(항량)",
      bullets: [
        "GF/C(Ø 47 mm) 장착 → 정제수 20 mL씩 3회 흡인세척",
        "시계접시/포일 접시에 올려 105–110 ℃에서 ≥1 h 건조 → 데시케이터 방냉(항량) → 무게기록",
      ],
    },
    {
      title: "여과 및 세척",
      bullets: [
        "시료 적당량(건조 후 잔류물 ≥1 mg) 주입하며 흡인여과",
        "용기·기벽 부착물은 정제수로 씻어 여과지로 모음",
        "여과지 상 잔류물: 정제수 10 mL씩 3회 세척 + 약 3분 추가 흡인",
        "고염 시료: 흡인 끈 상태로 정제수를 여과지 위에 붓고 → 흡인 반복해 충분 세척",
      ],
    },
    {
      title: "건조·냉각·칭량",
      bullets: [
        "핀셋으로 여과지를 분리 → 105–110 ℃에서 ≥1 h 건조",
        "데시케이터 방냉(항량 도달까지 반복 가능) → 무게 측정",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "부유물질(mg/L) = (b − a) × (1000 / V)",
        "a: 여과 전 여과지 무게(mg), b: 여과 후 여과지 무게(mg), V: 시료량(mL)",
      ],
    },
    {
      title: "문제해결 TIP",
      bullets: [
        "에멀젼으로 층분리가 안 되거나 깔때기·하부여과재에 침전 고착 시: 다이크롬산포타슘·황산용액으로 녹여 세척(장비)",
        "항량은 연속 2회 칭량 차가 미미할 때(실험실 기준)로 판단 — 데시케이터 충분 방냉이 핵심",
      ],
    },
    {
      title: "안전",
      bullets: [
        "105–110 ℃ 건조기·데시케이터 사용 시 내열장갑·집게 필수",
        "헥산·Cr(VI) 포함 산성 크롬세척액 사용 시 흄후드·보호구(보안경·니트릴 장갑) 착용",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04303.1c · 부유물질(SS) 플로우차트"
        subtitle="SS = Suspended Solids"
      />


        <ol className="relative space-y-5">
          {blocks.map((b, i) => (
            <li key={i} className="list-none">
              <AnimatedSection index={i}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-900 text-white">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{b.title}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-800">
                      {b.bullets.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </PageLayout>
  );
}
