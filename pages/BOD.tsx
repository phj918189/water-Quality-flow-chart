import PageLayout from '../Common/PageLayout';
import PageHeader from '../Common/PageHeader';
import AnimatedSection from '../Common/AnimatedSection';

export default function BOD_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "목적: 20±1 ℃에서 5일 배양 후 용존산소(DO) 감소량으로 BOD 산출",
        "적용: 하·폐수/지표수/지하수 등",
      ],
    },
    {
      title: "장비/시약(요지)",
      bullets: [
        "BOD 병 300 mL(또는 60 mL), 배양기(20±1 ℃)",
        "pH 조정용 1 M HCl/NaOH, 아황산나트륨 0.025 N(잔류 염소 제거)",
        "인산염완충(pH 7.2), CaCl₂·MgSO₄·FeCl₃ 용액, 식종수/식종희석수",
        "질산화 억제제: TCMP 또는 ATU(필요 시)",
      ],
    },
    {
      title: "전처리(아주 중요)",
      accent: true,
      bullets: [
        "pH 6.5–8.5 범위 확인 → 1 M HCl/NaOH로 pH 7.0–7.2 맞춤",
        "잔류 염소 존재 시: 0.025 N Na₂SO₃로 제거(과량 금지)",
        "온도 적응: 시료를 20 ℃ 부근으로 맞춘 뒤 작업",
        "탁도/부유물 많은 시료는 균질화 후 적정한 희석 배수 선택",
      ],
    },
    {
      title: "희석수·식종 준비",
      bullets: [
        "희석수: pH 7.2 인산염완충 + Ca/Mg/Fe 용액을 1 mL/L씩 첨가, 20 ℃로 평형",
        "식종수: 활성 슬러지/하천수 등으로 준비 후 20–30 mL/L 수준으로 희석수에 가함",
        "식종희석수: 식종수로 접종된 희석수(공시험·검정에 사용)",
      ],
    },
    {
      title: "시료·희석 배치",
      bullets: [
        "BOD 병에 시료를 적절히 희석해 채움(거품·기포 없이)",
        "희석률 범례: 0.1–1.0–5–25–100 % 중에서 DO 소모가 40–70 % 되도록 선정",
        "필요 시 질산화 억제제(TCMP/ATU) 투입",
      ],
    },
    {
      title: "DO 측정·배양",
      bullets: [
        "초기 DO(D₁) 측정 → 같은 조성의 병을 20 ℃에서 5일 배양",
        "5일 후 DO(D₂) 측정(기포 유입 금지)",
        "식종희석 사용 시 식종공시험(B₁, B₂) 병을 함께 운용",
      ],
    },
    {
      title: "계산(보고)",
      bullets: [
        "식종 미사용: BOD (mg/L) = (D₁ − D₂) × P",
        "식종 사용: BOD (mg/L) = { (D₁ − D₂) − (B₁ − B₂) × f } × P",
        "P: 희석배수(병 체적 / 시료량), f: 식종비(x%/y%)",
        "희석 선택이 적절했다면 DO 소모 40–70 % 범위",
      ],
    },
    {
      title: "QA/QC 체크",
      bullets: [
        "표준용액(GGA: 글루코스+글루탐산)으로 성능 확인",
        "정확도 85–115 %, 정밀도(RSD) ≤ 15 %",
        "방법바탕(Blank)과 식종공시험 결과 적합성 확인",
      ],
    },
    {
      title: "안전·메모",
      bullets: [
        "병 채움 시 기포 혼입 금지, 막갈색·탁한 시료는 희석 조정",
        "배양기 20±1 ℃ 유지, 병 밀폐 상태 확인",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04305.1c · 생물화학적 산소요구량(BOD₅, 20 ℃) 플로우차트"
        subtitle="BOD = Biological Oxygen Demand"
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
