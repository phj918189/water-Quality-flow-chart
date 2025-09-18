import { motion } from "framer-motion";
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";


export default function Hg_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "원리: SnCl₂로 Hg²⁺를 금속수은(Hg⁰)으로 환원 → 기화된 수은을 253.7 nm에서 AAS로 측정",
        "적용: 지표수·하·폐수, 정량한계(LOQ) 0.0005 mg/L",
      ],
    },
    {
      title: "간섭/전처리 결정(아주 중요)",
      accent: true,
      bullets: [
        "Cl⁻ 다량 → 환원 시 유리염소 발생·흡광 간섭 → 염산하이드록실아민으로 환원, 질소 통기로 제거",
        "벤젠·아세톤 등 VOC도 253.7 nm 흡광 → 과망간산 분해 후 헥산 추출로 제거",
      ],
    },
    {
      title: "장치(환원기화) 구성",
      bullets: [
        "환원용기(≈300–350 mL), 건조관(과염소산 Mg 또는 CaCl₂), 유량계(0.5–5 L/min)",
        "석영 흡수셀(길이 10–30 cm), 송기펌프(0.5–3 L/min), 수은 속빈 음극램프",
        "세척병(또는 수은 제거 장치) 포함 — 안전 배출 경로 확보",
      ],
    },
    {
      title: "시약(요지)",
      bullets: [
        "KMnO₄ 5%, K₂S₂O₈ 5%",
        "염산(1+10), 황산(1+1)/(1+4)",
        "염산하이드록실아민 10%",
        "SnCl₂·2H₂O 용액(황산(1+20) 60 mL에 용해 후 정용)",
      ],
    },
    {
      title: "전처리 절차(표준)",
      bullets: [
        "시료(수은으로 0.002 mg 이하) + 정제수로 200 mL",
        "황산(1+1) 20 mL + 질산 5 mL + KMnO₄ 5% 20 mL → 보라색 15분 지속되도록 반복 첨가",
        "K₂S₂O₈ 5% 10 mL 추가 → 95 ℃ 물중탕 2 h",
        "냉각 후 염산하이드록실아민 10%를 한 방울씩 넣어 과잉 KMnO₄ 분해 → 정제수로 250 mL 정용",
        "※ 방해물질이 없는 시료는 전처리 생략 가능(황산(1+1) 20 mL 첨가 후 250 mL 정용)",
      ],
    },
    {
      title: "분석(환원기화·측정)",
      bullets: [
        "전처리액 전량을 환원용기에 옮김 → 장치 연결",
        "SnCl₂ 용액 10 mL 첨가 → 송기펌프 가동하여 Hg⁰ 증기를 흡수셀로 이송",
        "253.7 nm에서 신호가 일정해지면 값을 취하고 바탕으로 보정",
        "개방식 장치: SnCl₂ 투입 후 밀폐, 2분 강하게 흔든 뒤 펌프 가동·콕 개방 → 피크 높이/면적 사용",
        "측정 후 배기콕 개방, KMnO₄ 함유 황산(1+4) 세척병을 통해 안전 배출",
      ],
    },
    {
      title: "검정곡선",
      bullets: [
        "수은 표준 1 mg/L 용액 0–25 mL 단계 취함",
        "황산(1+1) 20 mL + 정제수로 시료와 같은 부피로 맞춘 뒤, 시료와 동일한 분석 절차 수행",
        "검정 R² ≥ 0.99, 검정검증 ±15%",
      ],
    },
    {
      title: "QA/QC·보고",
      bullets: [
        "정량한계 0.0005 mg/L, 정밀도 RSD ≤ 25%, 정확도 75–125%",
        "결과 보고·일반 QA/QC는 금속류 불꽃-AAS 기준(ES 04400.1e) 준용",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "수은증기 극독성 — 전 과정 흄후드, 누출 시 세척병·흡착제 경유",
        "강산·산화제 취급: 보안경·내화학 장갑·실험복, 산-물 혼합 순서 준수",
        "헥산 등 용매 사용 시 인화성·흡입 노출 주의",
      ],
    },
    {
      title: "근거(표준 인용·요약)",
      bullets: [
        "원리·적용/LOQ: 시료에 SnCl₂를 넣어 Hg²⁺ → Hg⁰로 환원, 기화시켜 253.7 nm에서 AAS로 정량. 적용은 지표수·하·폐수, 정량한계 0.0005 mg/L.",
        "주요 간섭과 조치:",
        "• Cl⁻ 다량 → 환원 시 유리염소가 생겨 253.7 nm에서 흡광 간섭 → 염산하이드록실아민 과잉으로 환원·제거 후 질소 통기로 잔류 염소 제거.",
        "• 벤젠/아세톤 등 휘발성 유기물도 253.7 nm에서 흡광 → KMnO₄ 분해 후 헥산 추출로 제거.",
        "장치 구성: 환원용기, 건조관(과염소산 Mg 또는 CaCl₂), 유량계(0.5–5 L/min), 석영 흡수셀(10–30 cm), 송기펌프(0.5–3 L/min), Hg HCL, 세척병/수은 제거장치 등. 구성 예가 도면으로 제시됩니다.",       
        "전처리(표준): 시료(수은 ≤0.002 mg) + 정제수로 200 mL → H₂SO₄(1+1) 20 mL + HNO₃ 5 mL + KMnO₄ 5% 20 mL, 보라색 15분 유지되도록 반복 → K₂S₂O₈ 5% 10 mL, 95 ℃ 물중탕 2 h → 냉각 후 **NH₂OH·HCl 10%**로 과량 KMnO₄ 분해 → 250 mL 정용. 방해물질이 없으면 전처리 생략 가능(H₂SO₄(1+1) 20 mL만 넣고 250 mL 정용).",
        "분석(환원기화): 전처리액 전량을 환원용기에 옮기고 SnCl₂ 용액 10 mL 투입 → 펌프 가동으로 발생한 Hg⁰ 증기를 흡수셀로 보내 신호가 일정할 때 판독, 바탕 시험으로 보정. 측정 후 배기콕 개방해 KMnO₄ 함유 H₂SO₄(1+4) 세척병을 통과시켜 배출. 개방식은 2분 흔들어 피크 높이/면적 사용.",
        "검정곡선: 1 mg/L Hg 표준 0–25 mL → H₂SO₄(1+1) 20 mL 첨가, 시료와 같은 부피로 맞춘 뒤 동일 절차로 분석.",
        "QA/QC 목표: LOQ 0.0005 mg/L, R² ≥ 0.99, 검정검증 ±15%, 정밀도 ≤25%, 정확도 75–125%",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader title="수은-냉증기-AAS" 
      description="Mercury-Cold Vapor-Atomic Absorption Spectrometry"
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
