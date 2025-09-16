import { useMemo } from "react";    
import PageLayout from "../Common/PageLayout";
import PageHeader from "../Common/PageHeader";
import AnimatedSection from "../Common/AnimatedSection";


export default function TN_UVVis_Oxidation_Flow() {
  const steps = useMemo(
    () => [
      {
        title: "준비",
        details: [
          "기구: 고압증기멸균기(약 120 ℃ 가열 가능), 여과용 유리섬유여과지(GF/C)",
          "분석 파장: 220 nm (UV/Vis)",
          "시약: 알칼리성 과황산칼륨용액(3 %), 염산(1+16), 표준용액(KNO₃)"
        ],
      },
      {
        title: "시약 조제(요지)",
        details: [
          "알칼리성 과황산칼륨(3 %): 정제수 500 mL + NaOH 20 g 용해 → K₂S₂O₈ 15 g 용해 (사용 직전 조제)",
          "염산(1+16): 진한 HCl 10 mL + 정제수 160 mL 혼합",
          "표준원액(100 mg/L as N): 건조한 KNO₃ 0.7218 g → 1 L로 정용",
          "표준용액(20 mg/L): 표준원액 20 mL → 100 mL로 희석"
        ],
      },
      {
        title: "전처리(산화)",
        details: [
          "시료 50 mL(고농도는 희석) + 알칼리성 과황산칼륨 10 mL",
          "마개 후 혼합 → 고압증기멸균기 투입",
          "약 120 ℃에서 30분 가열 분해 → 냉각"
        ],
      },
      {
        title: "여과 및 산성화",
        details: [
          "상층액을 GF/C로 여과(초기 5–10 mL 폐기)",
          "여과액 25 mL 정확히 취해 비색관 또는 비커에",
          "염산(1+16) 5 mL 첨가해 pH 2–3 조정",
          "10 mm 셀에 일부 옮겨 시료용액 준비"
        ],
      },
      {
        title: "대조액(방법 바탕)",
        details: [
          "정제수 50 mL를 동일 전처리·측정 절차로 처리",
          "대조액으로 사용하여 흡광도 보정"
        ],
      },
      {
        title: "측정(220 nm)",
        details: [
          "대조액을 기준으로 220 nm에서 시료의 흡광도 측정",
          "사전 작성한 검정곡선으로 질소량 a(mg) 산출"
        ],
      },
      {
        title: "검정곡선 작성(요약)",
        details: [
          "20 mg/L 표준용액 0–10 mL → 100 mL 정용(≥3점)",
          "각각 25 mL 취해 염산(1+500) 5 mL 첨가",
          "시료와 동일 조건으로 측정하여 농도–흡광도 관계선 작성",
          "적합성: R² ≥ 0.98 또는 RF의 RSD ≤ 25 %"
        ],
      },
      {
        title: "계산 및 보고",
        details: [
          "절대 검정곡선으로 구한 a(mg)와 시료량 V(mL)로 총질소(mg/L) 계산(식 1)",
          "정량한계 0.1 mg/L, 결과는 적절한 자릿수로 보고"
        ],
      },
      {
        title: "QA/QC 체크리스트",
        details: [
          "방법바탕시료: 각 시료군마다 1개, 결과는 MDL 이하",
          "정확도 75–125 %, 정밀도 RSD ≤ 25 %",
          "고농도 시료 뒤에는 바탕시료 측정으로 오염 점검"
        ],
      },
      {
        title: "주의(간섭 및 적용범위)",
        details: [
          "자외부에서 흡광 나타내는 물질 간섭: Br⁻(≈10 mg/L), Cr(≈0.1 mg/L)",
          "해수 등에는 적용 불가"
        ],
      },
    ],
    []
  );

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04363.1a · 총질소(자외·가시선 분광법·산화법) 플로우차트"
        subtitle="TN = Total Nitrogen"
        description="UVVisOxidation = Ultraviolet Visible Spectrometry-Oxidation Method"
      />

        <ol className="relative space-y-5">
          {steps.map((s, i) => (
            <li key={i} className="list-none">
              <AnimatedSection index={i}>
                <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-900 text-white">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-800">
                      {s.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </PageLayout>
  );
}

function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-gray-400"
      aria-hidden
    >
      <path d="M12 3a1 1 0 0 1 1 1v12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L11 16.586V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
