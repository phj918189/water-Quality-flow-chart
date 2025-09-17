import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function NO2_N_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "원리: 설퍼닐아마이드로 디아조화 → α-나프틸에틸렌디아민(일명 NED)과 커플링 → 붉은색 착염 생성, 540 nm 측정",
        "적용 수계: 지표수·지하수·폐수, 정량한계(LOQ) 0.004 mg/L",
        "간섭: 일반적으로 강하지 않으나 강한 산화제/환원제는 농도 변화를 유발할 수 있음, 알칼리도 600 mg/L 이상이면 과소평가 위험",
      ],
    },
    {
      title: "간섭/전처리(아주 중요)",
      accent: true,
      bullets: [
        "탁하거나 착색된 시료: 시료 100 mL + 칼륨명반용액 2 mL → NaOH 4%로 Al(OH)3 플록 생성 → 수분 방치 → 여과 후 여액 사용",
        "잔류 염소 등 산화성 물질: 아황산나트륨용액 0.1 N을 대응량만큼 넣어 환원 후 분석",
      ],
    },
    {
      title: "시약/표준(요지)",
      bullets: [
        "NaOH 4%",
        "설퍼닐아마이드 0.5%(HCl 1+1에 가온 용해)",
        "α-나프틸에틸렌디아민 이염산염 0.1%",
        "칼륨명반용액",
        "표준원액 100 mg/L: NaNO2 0.493 g → 1 L 정용(보존: 클로로폼 2 mL/L)",
        "표준용액 1 mg/L: 표준원액 10 mL → 1 L 정용",
      ],
    },
    {
      title: "분석 절차(540 nm)",
      bullets: [
        "여과한 시료에서 아질산성 질소로서 0.01 mg 이하가 되도록 적당량 취해 50 mL 비색관에",
        "설퍼닐아마이드 0.5% 1 mL 첨가 → 5분 방치",
        "α-나프틸에틸렌디아민 0.1% 1 mL 첨가 → 10–30분 방치",
        "10 mm 셀로 옮겨 540 nm에서 흡광 측정",
        "바탕: 정제수 50 mL를 동일 절차로 처리하여 대조액으로 사용",
      ],
    },
    {
      title: "검정곡선",
      bullets: [
        "1 mg/L 표준용액 0–10 mL → 50 mL 정용(≥3점)",
        "시료와 동일 절차로 색발현 후 농도–흡광도의 관계선 작성",
        "적합성: R² ≥ 0.98 또는 RF RSD ≤ 25%",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "아질산성 질소(mg/L) = (y − b) / a × I",
        "y: 신호(흡광도*), a: 기울기, b: 절편, I: 희석배수 (*문서에서는 '피크높이' 표기)",
      ],
    },
    {
      title: "QA/QC",
      bullets: [
        "방법바탕: 시료군마다 1개, 결과는 MDL 이하",
        "정확도 75–125%, 정밀도(RSD) ≤ 25%",
        "검정곡선 검증: 각 시료군마다 1회(중간농도 표준이 ±25% 이내)",
        "내부정도관리 주기: 연 1회 이상 또는 장비/분석자 변동 시 재평가",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "염산 등 산·유기용매(클로로폼 보존) 취급: 흄후드, 보안경·장갑 필수",
      ],
    },
  ];

return (
    <PageLayout>
      <PageHeader 
        title="ES 04362.1a · 아질산성 질소(자외·가시선 분광법) 플로우차트"
        subtitle="NO2-N = Nitrite Nitrogen"
        description="NO2-N = Nitrite Nitrogen-UV/Visible Spectrometry"
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
                <h2 className="text-lg font-semibold">{i + 1}. {s.title}</h2>
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
