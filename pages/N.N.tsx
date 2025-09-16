import { useMemo } from "react";
import PageLayout from "../Common/PageLayout";
import PageHeader from "../Common/PageHeader";
import AnimatedSection from "../Common/AnimatedSection";

export default function N_N_Flow() {
  const nitrate = useMemo(
    () => [
      {
        title: "원리/적용",
        details: [
          "pH ≥ 12에서 활성탄으로 유기물 흡착 → 혼합산성액으로 산성화·아질산 은폐 → 215 nm에서 NO3-N 흡광 측정",
          "정량한계 0.3 mg/L (지표수·폐수 적용)"
        ],
      },
      {
        title: "시약/표준(요지)",
        details: [
          "NaOH 3.5%",
          "혼합산성용액: H2SO4 + 설파민산(갈색병, 2개월 이내 사용)",
          "표준: ES 04361.2b(부루신법)와 동일 표준용액 사용"
        ],
      },
      {
        title: "분석 절차",
        details: [
          "(1) 여과한 시료 20 mL(≤0.1 mg NO3-N) + NaOH 3.5% 1 mL + 활성탄 20 mg → 마개, 20분 진탕 → 5분 정치",
          "(2) 여과지 사전 세척: NaOH 3.5% 50 mL",
          "(3) GF/C 장착 밀리포아 흡인여과기로 여과",
          "(4) 여과액 10 mL + 혼합산성 1 mL → 일부를 10 mm 셀로",
          "(5) 바탕: 정제수 20 mL 동일 절차 → 215 nm 측정, 검정곡선으로 농도 산출"
        ],
      },
      {
        title: "검정곡선/계산",
        details: [
          "10 mg/L 표준 원액 50 mL 정용 → 이 용액 0/5/10/15 mL를 각각 20 mL로",
          "검정곡선 작성 후 (y-b)/a × I로 계산(식 1)"
        ],
      },
      {
        title: "QA/QC 체크",
        details: [
          "방법바탕시료: 시료군마다 1개, MDL 이하",
          "검정곡선: R² ≥ 0.98 또는 RF RSD ≤ 25%",
          "정밀도 RSD ≤ 25%, 정확도 75–125%"
        ],
      },
    ],
    []
  );

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04361.3c · 질산성질소(자외선/가시선 분광법) 플로우차트"
        subtitle="수질오염공정시험기준에 따른 전체 절차 요약 · 인쇄 친화형"
        description="NN = Nitrate Nitrogen-UV/Visible Spectrometry-Active Carbon Adsorption method"
      />

        <ol className="relative space-y-5">
          {nitrate.map((s, i) => (
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
            </li>
          ))}
        </ol>

    </PageLayout>
  );
}
