import PageLayout from "../Common/PageLayout";
import PageHeader from "../Common/PageHeader";
import AnimatedSection from "../Common/AnimatedSection";

export default function TOC_HTC_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "시료를 550 ℃ 이상 촉매 연소로 CO₂로 전환 → 검출(NDIR/전기량적정)하여 총유기탄소(TOC) 산출",
        "적용: 지표수·지하수·하·폐수, 정량한계(LOQ) ≈ 0.3 mg/L",
        "염화물 500 mg/L 이상 시에도 적용 적합(고온연소권장)",
      ],
    },
    {
      title: "용어(초보자 필수)",
      bullets: [
        "TC(총탄소)=유기+무기 탄소 합, IC(무기성 탄소)=탄산염·중탄산염·CO₂",
        "TOC=TC−IC 또는 NPOC(비정화성 유기탄소)로 직접 산출",
        "DOC(용존 유기탄소)=0.45 μm 여과 통과분",
      ],
    },
    {
      title: "전처리 핵심(아주 중요)",
      accent: true,
      bullets: [
        "부유물질 多 시 시료를 초음파로 균질화(저주파 20–40 kHz) → 입경 ≤ 300 μm",
        "자동주입 사용 시 분석 중 연속 교반(침전 방지)",
        "검정곡선 범위에 들도록 필요 시 희석",
      ],
    },
    {
      title: "방법 선택(결정 트리)",
      bullets: [
        "VOC(휘발성 유기물) 수 mg/L 이상? → ‘TC−IC’ 방식 권장",
        "IC가 TC의 50% 초과? → ‘NPOC’ 방식 권장",
      ],
    },
    {
      title: "NPOC 방식",
      bullets: [
        "시료 일부 취해 산으로 pH ≤ 2 조정",
        "정화(purging)하여 IC 제거 → 검정곡선으로 농도 계산(=TOC)",
      ],
    },
    {
      title: "TC−IC 방식",
      bullets: [
        "동일 시료로 각각 TC, IC를 측정(또는 동시 측정 가능)",
        "TOC = TC − IC 로 산출",
      ],
    },
    {
      title: "장비/검출",
      bullets: [
        "연소부: 550 ℃ 이상, 산화 촉매(예: Co/Pt/BaCrO₄) 충전",
        "검출부: NDIR 또는 전기량 적정(기기 권장조건 따름)",
      ],
    },
    {
      title: "표준·검정곡선",
      bullets: [
        "유기 표준: 프탈산수소포타슘(KHP) 100 mg/L → 0–20 mL를 100 mL로 정용(0–20 mg/L)",
        "NPOC 검정: KHP로 작성(필요 시 150 mg/L까지 확장)",
        "TC−IC 검정: KHP + 무기탄소표준(Na₂CO₃/NaHCO₃) 혼합으로 각각 TC, IC 검정",
      ],
    },
    {
      title: "QA/QC 목표값",
      bullets: [
        "R² ≥ 0.98 또는 RF RSD ≤ 20%",
        "정확도 80–120%, 정밀도 ≤ 20%",
        "부유물질 QC: 100 mg/L 기준 평균 80–120 mg/L, RSD < 20%",
      ],
    },
    {
      title: "결과 보고",
      bullets: [
        "NPOC법: TOC = NPOC",
        "TC−IC법: TOC = TC − IC",
        "필요 시 희석배수 반영",
      ],
    },
    {
      title: "안전/운영 팁",
      bullets: [
        "산(pH≤2 조정), 고온로, 가스(정화·캐리어) 취급 — 흄후드/보호구 필수",
        "주입 라인·시린지 오염 방지: 공시험(Blank) 주기 점검",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04311.1d · 총유기탄소(TOC) 고온연소산화법"
        subtitle="TOC = Total Organic Carbon"
      />

        <ol className="relative space-y-5">
          {blocks.map((b, i) => (
            <li key={i} className="list-none">
              <AnimatedSection index={i} accent={b.accent}>
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
