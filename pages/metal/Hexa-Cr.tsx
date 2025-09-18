import { motion } from "framer-motion";
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";


export default function HexaCr_Flow() {
    const blocks = [
        {
            title: "개요·적용",
            bullets: [
                "원리: 산성 용액에서 다이페닐카바자이드(DPC)와 반응해 적자색 착화합물 생성 → 540 nm에서 흡광 측정",
                "적용: 지표수·지하수·하·폐수 / 정량한계(LOQ) 0.04 mg/L",
            ],
        },
        {
            title: "간섭/전처리 결정(중요)",
            accent: true,
            bullets: [
                "Mo, Hg, V, Fe, Cu 과량 공존 시 방해 가능 → 필요 시 희석 또는 매질 조절",
                "모든 시료는 0.45 μm 여과 후 24 h 이내 분석(산화/환원 변질 최소화)",
            ],
        },
        {
            title: "시약/표준(요지)",
            bullets: [
                "DPC 용액: DPC 0.250 g을 아세톤 50 mL에 용해(갈색병 보관, 변색 시 재제조)",
                "황산(1+9): 물 90 mL에 황산 10 mL를 서서히 가하여 냉각",
                "표준: K2Cr2O7로 1,000 mg/L 원액 → 100 mg/L → 2 mg/L 단계 희석",
            ],
        },
        {
            title: "분석 절차(540 nm)",
            bullets: [
                "(1) 100 mL 플라스크에 시료 적당량(6가 크롬으로 0.05 mg 이하) + 정제수 ≈90 mL",
                "(2) 황산(1+9) 3 mL 첨가, 혼합",
                "(3) DPC 용액 2 mL 첨가 → 정용(100 mL) → 5분 발색",
                "(4) 10 mm 셀로 옮겨 540 nm에서 흡광도 측정(대조: 바탕시험액)",
            ],
        },
        {
            title: "바탕시험액(대조) 조제",
            bullets: [
                "시료 동량을 비커에 취해 황산(1+9) 3 mL + 소량의 에탄올을 넣고 끓여 Cr(VI)→Cr(III) 환원",
                "15 ℃로 냉각 후 100 mL 플라스크로 옮기고 DPC 2 mL + 정용 → 5분 방치(이 용액을 대조로 사용)",
            ],
        },
        {
            title: "검정곡선",
            bullets: [
                "2 mg/L 표준 2–20 mL를 100 mL 플라스크에 단계적으로 취함",
                "시료와 동일 절차로 반응시켜 농도–흡광도 관계선 작성(매 분석 시 재작성 권장)",
            ],
        },
        {
            title: "계산·보고",
            bullets: [
                "Cr(VI)(mg/L) = (y − b) / a × I (y: 흡광도, a: 기울기, b: 절편, I: 희석/정용배수)",
                "결과 단위: mg/L, 소수 자릿수는 실험실 규정에 따름",
            ],
        },
        {
            title: "QA/QC 목표(부록 표 1)",
            bullets: [
                "정량한계 0.04 mg/L",
                "검정곡선 결정계수 R² ≥ 0.98",
                "정밀도 RSD ≤ 25%",
                "정확도 75–125%",
            ],
        },
        {
            title: "안전 메모",
            bullets: [
                "아세톤(휘발성)·황산(강산) 취급: 흄후드, 보안경·내화학 장갑 필수",
                "폐액은 유기/무기 산성폐수로 분리하여 지정폐기",
            ],
        },
        {
            title: "근거(표준 인용·요약)",
            bullets: [
                "원리·파장·적용·LOQ: DPC 발색 540 nm, 지표수·지하수·하·폐수, LOQ 0.04 mg/L.",
                "간섭물질: Mo, Hg, V, Fe, Cu 과량 시 방해 가능.",
                "시약: DPC 0.250 g/아세톤 50 mL(갈변 시 재제조), 황산(1+9) 제조법.",
                "표준용액: K2Cr2O7로 1,000 → 100 → 2 mg/L 단계 희석.",
                "전처리: 0.45 μm 여과, 24 h 이내 분석.",
                "분석: 황산(1+9) 3 mL + DPC 2 mL, 5분 발색, 540 nm 측정.",
                "대조액(바탕): 시료 동량을 가열·에탄올 첨가로 Cr(VI)→Cr(III) 환원 후 동일 절차.",
                "검정곡선: 2–20 mL(2 mg/L) 표준으로 매 분석 시 작성.",
                "계산식: (y − b)/a × I 적용.",
                "QA/QC: LOQ 0.04 mg/L, R² ≥ 0.98, 정밀도 ≤25%, 정확도 75–125%.",
            ],
        },
    ];

    return (
        <PageLayout>
          <PageHeader title="6가 크롬-자외/가시선"
          description="Hexavalent Chromium-UV/Visible Spectrometry"
          />      
          <div className="relative space-y-5">
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
        </div>
        </PageLayout>
    );
  }
  