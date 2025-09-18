import { motion } from "framer-motion";
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function Turbidity_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "탁도계로 물의 흐림 정도를 측정(NTU 단위)",
        "적용: 지표수·지하수",
      ],
    },
    {
      title: "간섭(전처리 유의)",
      accent: true,
      bullets: [
        "큰 입자는 빨리 가라앉아 측정값이 낮아질 수 있음 → 시료 취급 즉시 측정",
        "거품은 빛 산란으로 높게 나올 수 있음 → 용기 벽면을 따라 조심히 주입",
        "착색 시료는 흡광으로 낮게 나올 소지 → 해석 시 유의",
      ],
    },
    {
      title: "장비 사양(요지)",
      bullets: [
        "NTU 탁도계: 검출한계 ≤ 0.02 NTU",
        "광원: 텅스텐 필라멘트 2,200–3,000 K",
        "광학: 투사광–산란광 통과거리 ≤ 10 cm, 검출각 90°±30°",
      ],
    },
    {
      title: "시약/표준용액",
      bullets: [
        "정제수(Blank ≤ 0.02 NTU)",
        "황산하이드라진용액(주의: 발암성)",
        "헥사메틸렌테트라아민용액",
        "포르마진 400 NTU(표준원액, 1개월) → 40 NTU 표준용액(사용 시 조제)",
      ],
    },
    {
      title: "교정(예: 1·10·20·30 NTU)",
      bullets: [
        "40 NTU 표준용액을 희석해 1, 10, 20, 30 NTU를 준비(100 mL 기준)",
        "기기 ‘측정’ → 첫 표준 투입 ‘입력’ → 순차 측정·입력 → 마지막 입력 후 저장",
        "(기기별 지침 허용)",
      ],
    },
    {
      title: "측정 절차",
      bullets: [
        "시료를 표시선까지 채우고 뚜껑 → 용기 외부 수분 제거·김서림 해소",
        "용기 표면 닦기(오염 심하면 실리콘 오일 사용) → 투입 후 측정",
        "주의: 시료 탁도는 40 NTU를 넘지 않게, 넘으면 희석",
      ],
    },
    {
      title: "침전 후 탁도(선택)",
      bullets: [
        "진동 없는 곳에서 약 24 h 방치해 큰 입자 침전",
        "상등액을 조심히 채취해 동일 절차로 측정",
      ],
    },
    {
      title: "QA/QC·보고",
      bullets: [
        "정밀도 RSD ≤ 25 %, 정확도 75–125 %",
        "결과는 NTU로 보고",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "황산하이드라진: 발암성·흡입/접촉 금지 — 흄후드·보호구",
        "측정용기는 긁힘·오염 방지(전·후 세척)",
      ],
    },
  ];

  return (
     <PageLayout>
      <PageHeader 
        title="ES 04313.1c · 탁도(Turbidity) "
      />

        <div className="relative space-y-5">
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
        </div>

      </PageLayout>
  );
}
