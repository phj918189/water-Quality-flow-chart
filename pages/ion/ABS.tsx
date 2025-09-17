import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function ABS_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "메틸렌블루(MB)와 음이온계면활성제의 이온쌍을 클로로폼에 추출 → 650 nm에서 흡광 측정",
        "적용: 지표수·지하수·폐수, 정량한계(LOQ) ≈ 0.02 mg/L",
        "측정 셀: 10 mm, 필요 시 희석 후 측정",
      ],
    },
    {
      title: "간섭/전처리(핵심)",
      accent: true,
      bullets: [
        "동종 음이온성 물질 및 티오시아네이트 등은 간섭 가능 → 검정·바탕으로 보정",
        "시료군마다 방법바탕(Blank)을 운용하고 고농도 시료 뒤에는 시약바탕으로 오염 확인",
      ],
    },
    {
      title: "시약/표준(요지)",
      bullets: [
        "메틸렌블루용액 0.025%",
        "수산화나트륨용액 0.4%",
        "알칼리성 붕산나트륨용액 0.4%",
        "클로로폼(≥98%)",
        "황산 (1+35)",
        "표준: 라우릴황산나트륨(LSS) 500 mg/L 원액 → 10 mg/L 작업용",
      ],
    },
    {
      title: "장치/용기",
      bullets: [
        "250 mL 분별깔때기(유리), 마개 달린 흡수셀, 유리피펫/버럴",
      ],
    },
    {
      title: "전처리(분별추출 세팅)",
      bullets: [
        "(공통) 분별깔때기에 시료와 시약을 투입하고 마개 밀봉 → 30–60초 진탕 → 층분리 대기",
        "(A) 저농도용: 시료 50 mL + NaOH 0.4% 10 mL + MB 0.025% 5 mL + 알칼리성 붕산Na 10 mL",
        "(B) 고농도용: 시료 100 mL + 동일 시약 투입 후(필요 시) 황산(1+35) 3 mL 처리 단계 포함",
      ],
    },
    {
      title: "분석방법(요약)",
      bullets: [
        "시료 중 MBAS가 0.002–0.05 mg 범위면 (A) 10 mL, (B) 10 mL씩 단계적 추출(각 1회)",
        "클로로폼층을 모아 필요 시 정확히 25 mL로 맞춤",
        "10 mm 셀에 옮겨 650 nm에서 흡광 측정(대조: 동일 절차의 바탕)",
      ],
    },
    {
      title: "검정곡선",
      bullets: [
        "10 mg/L 표준용액 0–10 mL를 취해 100 mL로 정용(≥3점)",
        "시료와 동일 절차(전처리·추출)로 처리해 농도–흡광도 검정곡선 작성",
        "적합성 기준: 결정계수 R² ≥ 0.98 또는 반응계수(RF) RSD ≤ 25%",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "MBAS (mg/L) = (y − b) / a × I",
        "y: 시료 흡광도, a: 기울기, b: 절편, I: 희석배수(또는 정용배수)",
      ],
    },
    {
      title: "QA/QC",
      bullets: [
        "방법바탕 1/시료군(결과는 MDL 이하)",
        "정확도 75–125%, 정밀도 RSD ≤ 25%",
        "검정곡선 검증: 각 시료군마다 1회(중간 농도 표준의 ±25% 이내)",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "클로로폼(휘발·유해)과 황산 취급은 반드시 흄후드에서 수행, 보안경·내화학 장갑 착용",
        "분별깔때기 흔들 때는 주기적으로 가스빼기(압력 상승 방지)",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04359.1d · 음이온계면활성제(MBAS) 플로우차트"
        
        description="ABS = Anionic Surfactants-UV/Visible Spectrometry"
      />
      <ol className="space-y-5">
        {sections.map((s, i) => (
        <li key={i} className="list-none">
            <AnimatedSection index={i} accent={s.accent}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-900 text-white">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-800">
                    {s.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
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