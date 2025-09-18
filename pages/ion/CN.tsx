import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";


export default function Cyanide_UVVis_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "pH ≤ 2에서 가열 증류로 HCN을 발생·포집(알칼리) → 중화 후 클로라민-T로 CNCl 생성 → 피리딘-피라졸론 발색(청색) 620 nm 측정",
        "적용: 지표수·폐수, 정량한계(LOQ) 0.01 mg/L",
      ],
    },
    {
      title: "간섭·전처리 결정",
      accent: true,
      bullets: [
        "유지류 多: 시료 pH 6–7로 맞춘 뒤 노말헥산/클로로폼(≈2%)로 짧게 진탕→ 수층 사용",
        "황화물: 아세트산아연용액(10%) 2 mL로 제거(1 mL≈S²⁻ 14 mg 대응)",
        "잔류염소: L-아스코르빈산(10%) 0.6 mL/Cl₂ 20 mg 또는 NaAsO₂(10%) 0.7 mL/Cl₂ 20 mg",
      ],
    },
    {
      title: "장치",
      bullets: [
        "1 L 증류플라스크 + 그람 냉각기 부착 증류장치",
      ],
    },
    {
      title: "전처리(증류·포집)",
      bullets: [
        "시료 100 mL(시안 ≤0.05 mg) → 500 mL 플라스크에 넣고 정제수로 ≈250 mL",
        "페놀프탈레인(0.5%) 2–3방울 → 인산 또는 NaOH(2%)로 중화 → 증류장치 조립",
        "주입깔때기 통해 설퍼민산암모늄(10%) 1 mL + 인산 10 mL + EDTA(시안용) 10 mL 투입, 수 분 방치",
        "가열·증류: 유출 2–3 mL/min으로 진행",
        "포집: NaOH(2%) 20 mL 넣은 100 mL 실린더로 받아 액량 90 mL 시 종료 → 냉각관 내부 린스 → 정용 100 mL",
      ],
    },
    {
      title: "발색·측정(620 nm)",
      bullets: [
        "전처리액 20 mL → 50 mL 플라스크",
        "페놀프탈레인(0.5%) 1방울 후 아세트산(1+8)으로 무색화(≈1 mL)",
        "인산염완충(pH 6.8) 10 mL + 클로라민-T(1%) 0.25 mL → 혼합 후 5분 방치",
        "피리딘-피라졸론 혼합용액 15 mL → 표선까지 정용 → 25 ℃ 물중탕 30분",
        "10 mm 셀로 옮겨 바탕(정제수 동일 절차)을 대조로 620 nm에서 흡광 측정",
      ],
    },
    {
      title: "검정곡선",
      bullets: [
        "표준: 1.0 mg/L CN⁻ 용액 0–10 mL → 100 mL 정용(≥3점)",
        "시료와 동일 조건으로 처리 후 농도–흡광도 관계선 작성(R² ≥ 0.98 또는 RF RSD ≤ 25%)",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "시안(mg/L) = (y − b) / a × I",
        "y: 흡광도, a: 기울기, b: 절편, I: 희석배수",
      ],
    },
    {
      title: "QA/QC",
      bullets: [
        "방법바탕 1/시료군(결과는 MDL 이하)",
        "정확도 75–125%, 정밀도(RSD) ≤ 25%",
        "고농도 시료 다음에는 시약바탕으로 오염 점검",
      ],
    },
    {
      title: "안전 메모(필수)",
      bullets: [
        "시안/HCN은 맹독성 — 전 과정 흄후드, 작업자 2인 이상, 비상시 시안 해독제 키트·산소 준비",
        "강산·염소화제·피리딘 등 화학물질 취급: 보안경·내화학 장갑·실험복 착용, 폐액은 지정폐기",
      ],
    },
  ];

    return (
    <PageLayout>
      <PageHeader 
        title="ES 04353.1e · 시안(자외·가시선 분광법) "
        subtitle="CN = Cyanide"
        description="Cyanide-UVVis = Cyanide-UV/Visible Spectrometry"
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
    </div>
    </PageLayout>
  );
}
