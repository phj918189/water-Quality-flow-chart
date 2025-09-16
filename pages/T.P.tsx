import { useMemo } from "react";
import PageLayout from "../Common/PageLayout";
import PageHeader from "../Common/PageHeader";
import AnimatedSection from "../Common/AnimatedSection";

export default function TP_UVVis_Flow() {
  const steps = useMemo(
    () => [
      {
        title: "준비",
        details: [
          "원리: 모든 인 화합물을 정인산염(PO4^3-)으로 전환 후 몰리브덴산-아스코빈산 환원 발색(청색) → 880 nm 측정",
          "주요 시약: 과황산칼륨(4%), 몰리브덴산암모늄·아스코빈산 혼합용액(사용 시마다 조제), NaOH(20%, 4%), p-나이트로페놀(0.1%)",
          "표준: KH2PO4 표준원액 100 mg/L, 표준용액 5 mg/L",
        ],
      },
      {
        title: "시료 전처리 – 둘 중 선택",
        details: [
          "① 과황산칼륨 분해(일반/분해 쉬운 유기물): 시료 50 mL + 과황산칼륨 4% 10 mL → 고압증기멸균기에서 약 120 ℃, 30분 가열 → 냉각",
          "② 질산-황산 분해(고유기물): 시료 50 mL + HNO3 2 mL 가열 농축(≈10 mL) → HNO3 2–5 mL + H2SO4 2 mL 추가, 백연 발생까지 가열 → 필요 시 HNO3 2–5 mL 반복 → 정제수 ≈30 mL 가열 용해 후 냉각 → p-니트로페놀 지시, NaOH(20%, 4%)로 황색까지 중화 → 50 mL 정용",
          "※ 염화이온 간섭 시 분해 후 NaHSO3(5%) 1 mL 첨가. 탁한 시료는 GF/C로 여과(초기 5–10 mL 폐기)",
        ],
      },
      {
        title: "발색(동일 조건)",
        details: [
          "전처리한 용액 25 mL를 마개 시험관에 취함",
          "몰리브덴산암모늄·아스코빈산 혼합용액 2 mL 첨가, 혼합",
          "20–40 ℃에서 15분 방치",
        ],
      },
      {
        title: "측정",
        details: [
          "10 mm 셀에 옮겨 측정용 시료 준비",
          "바탕용액(정제수 동일 절차)을 대조액으로 사용",
          "파장 880 nm에서 흡광도 측정(불가 시 710 nm)",
        ],
      },
      {
        title: "검정곡선",
        details: [
          "5 mg/L 표준용액 0–20 mL → 100 mL 정용(≥3점)",
          "시료와 동일 조건으로 발색·측정 후 흡광도-농도 관계선 작성",
          "적합성: R² ≥ 0.98 또는 RF의 RSD ≤ 25%",
        ],
      },
      {
        title: "계산 및 보고",
        details: [
          "검정곡선으로부터 a(mg) 산출",
          "과황산칼륨 분해: 식(1) 적용, 질산-황산 분해: 식(2) 적용(표준에 따른 체적 보정 포함)",
          "정량한계(예시): 0.005 mg/L",
        ],
      },
      {
        title: "QA/QC 체크리스트",
        details: [
          "방법바탕시료: 시료군마다 1개, 결과는 MDL 이하",
          "검정곡선 검증: 시료군마다 1회(중간농도), ±25% 이내 일치",
          "정확도 75–125%, 정밀도 RSD ≤ 25%",
          "고농도 시료 뒤 바탕시료 측정으로 오염 점검",
        ],
      },
    ],
    []
  );

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04362.1c · 총인(자외·가시선 분광법) 플로우차트"
        subtitle="TP = Total Phosphorus"
        description="UVVis = Ultraviolet Visible Spectrometry"
      />

        <ol className="relative space-y-5">
          {steps.map((s, i) => (
            <li key={i} className="list-none">
              <AnimatedSection index={i}>
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
              </AnimatedSection>
              {/* {i < steps.length - 1 && (
                <div className="mx-auto flex w-full justify-center py-1">
                  <ArrowDown />
                </div>
              )} */}
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
