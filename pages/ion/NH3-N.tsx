import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function NH3_N_Flow() {
  const sections = [
    {   
      title: "개요·적용",
      bullets: [
        "원리: 페놀-하이포클로라이트(인도페놀 청색) 반응을 촉매(Na-니트로프루시드)로 가속 → 630 nm에서 흡광 측정",
        "적용: 지표수·지하수·하·폐수 / 정량한계(예) 0.01 mg/L",
      ],
    },
    {
      title: "간섭/전처리(아주 중요)",    
      accent: true,
      bullets: [
        "잔류 염소가 있으면 암모니아가 소모됨 → 적정량의 환원제(예: 티오황산나트륨)로 제거(과량 금지)",
        "시료는 밀폐·냉암소 보관, 가급적 즉시 분석(암모니아 휘발·흡착 방지)",
        "탁·착색 심한 시료는 필요 시 증류 전처리 후 분석(증류장치 사용)",
      ],
    },
    {
      title: "장비/시약(요지)",
      bullets: [
        "분광광도계(630 nm), 10 mm 셀",
        "건조 과산화물 주의한 NaOCl(약 1%) 용액 — 유효염소는 요오드적정으로 확인",
        "나이트로프루시드나트륨 용액(0.15%)",
        "나트륨 페놀라이트 용액(12.5%)",
        "수산화나트륨 용액(4%, 20%)",
        "표준: 무수 염화암모늄(NH4Cl)로 100 mg/L 원액 → 5 mg/L 작업용",
      ],
    },
    {
      title: "분석 절차(630 nm)",
      bullets: [
        "시료 적당량(암모니아성 N으로 ≤0.04 mg 포함) → 50 mL 비색관에 취함",
        "나트륨 페놀라이트(12.5%) 10 mL + 나이트로프루시드(0.15%) 1 mL 첨가, 혼합",
        "하이포염소산나트륨(1%) 5 mL 첨가, 혼합",
        "20–25 ℃에서 30분 발색 유지",
        "10 mm 셀로 옮겨 630 nm에서 흡광 측정(대조: 정제수 동일 절차)",
      ],
    },
    {
      title: "검정곡선",
      bullets: [
        "5 mg/L 표준용액 0–10 mL → 50 mL 정용(≥3점)",
        "시료와 동일 절차로 발색시켜 농도–흡광도 검정곡선 작성",
        "적합성: R² ≥ 0.98 또는 RF RSD ≤ 25%",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "암모니아성 N (mg/L) = (y − b) / a × I",
        "y: 흡광도, a: 기울기, b: 절편, I: 희석배수",
      ],
    },
    {
      title: "QA/QC",
      bullets: [
        "방법바탕 1/시료군(결과는 MDL 이하)",
        "정확도 75–125%, 정밀도(RSD) ≤ 25%",
        "검정곡선 검증: 각 시료군 1회(중간농도) — ±25% 이내 일치",
      ],
    },
    {
      title: "증류 전처리(필요 시)",
      bullets: [
        "증류장치 준비(1 L 플라스크·냉각기). 간섭이 심한 시료는 알칼리 조건에서 암모니아를 증류·포집 후 분석",
        "유출 속도는 일정하게 유지, 냉각관·수집기 린스액을 합쳐 정용",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "페놀, 차아염소산나트륨(산화제) 취급 — 흄후드·보안경·내화학 장갑",
        "잔류 염소 제거 시 환원제 과량 사용 금지(측정치 저하)",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04355.1c · 암모니아 질소(자외·가시선 분광법) 플로우차트"
        subtitle="NH3-N = Ammonium Nitrogen"
        description="NH3-N = Ammonium Nitrogen-UV/Visible Spectrometry"
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