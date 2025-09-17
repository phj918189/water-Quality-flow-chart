    import { useMemo } from "react";
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";


export default function P_P_Flow() {
    const phosphate = useMemo(
        () => [
        {
        title: "원리/적용",
        details: [
        "몰리브덴산암모늄 반응 → 몰리브덴청 생성, 아스코빈산으로 환원 후 880 nm 측정(대안 710 nm)",
        "정량한계 0.003 mg/L (지표수·지하수·폐수 적용)"
        ],
        },
        {
        title: "시약/표준(요지)",
        details: [
        "혼합용액: (NH4)6Mo7O24·4H2O + K(SbO)C4H4O6·1/2H2O + H2SO4(2+1) + NH4OSO2NH2 + 7.2% L-아스코빈산 (사용 시 조제)",
        "표준: KH2PO4로 100 mg/L 원액 → 5 mg/L 표준용액"
        ],
        },
        {
        title: "분석 절차",
        details: [
        "(1) 여과한 시료 적당량(PO4-P로 0.05 mg 포함) → 50 mL 플라스크(≈40 mL)",
        "(2) 시료가 산성일 때 p-니트로페놀(0.1%) 지시, NaOH(4%) 또는 NH3(1+10)로 황색까지 중화",
        "(3) 혼합용액 4 mL 첨가 → 표선까지 정용 → 20–40 ℃, 15분 방치(30분 초과 금지)",
        "(4) 10 mm 셀로 옮겨 880 nm에서 흡광(대조: 정제수 40 mL 동일 절차)",
        "(5) 미량 시 DIBK 10 mL로 추출 → 640 nm 측정"
        ],
        },
        {
        title: "검정곡선/계산",
        details: [
        "5 mg/L 표준 0–10 mL → 50 mL 정용(≥3점)",
        "검정식으로 a(mg) 또는 (y-b)/a × I 계산(식 1)",
        "보고: 필요 시 희석배수 반영"
        ],
        },
        {
        title: "QA/QC 체크",
        details: [
        "방법바탕시료: 시료군마다 1개, MDL 이하",
        "검정곡선: R² ≥ 0.98 또는 RF RSD ≤ 25%",
        "정밀도 RSD ≤ 25%, 정확도 75–125%",
        "간섭: As(V) → Na2S2O5로 As(III) 환원, Fe(III) 과다 시 아스코빈산량 증가"
        ],
        },
    ], []
    );

    return (
        <PageLayout>
      <PageHeader 
        title="ES 04360.2c · 인산염인(아스코빈산환원법) 플로우차트"
        subtitle="수질오염공정시험기준에 따른 전체 절차 요약 · 인쇄 친화형"
        description="Phosphorus-P-UV/Visible Spectrometry-Ascorbic Acid Method"
      />    
                <ol className="relative space-y-5">
                    {phosphate.map((s, i) => (
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