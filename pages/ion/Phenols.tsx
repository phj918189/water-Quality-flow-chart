import { useState } from "react";
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

const SECTIONS = {
  intro: {
    title: "개요·적용",
    bullets: [
      "원리: pH 10에서 4-아미노안티피린(4-AAP) + 헥사시안화철 용액과 반응해 붉은 색소 생성 → 510 nm(수용액) / 460 nm(클로로폼층) 측정",
      "적용: 지표수·폐수 등 / 정량한계(LOQ): 추출법 0.005 mg/L, 직접법 0.05 mg/L",
    ],
  },
  decision: {
    title: "결정 트리(전처리·방법 선택)",
    bullets: [
      "① 간섭 확인 → 황화물 있음: 인산으로 pH≈4 조정 후 교반해 H₂S/SO₂로 제거(또는 CuSO₄ 첨가)",
      "② 오일/타르 → 시료 pH 12.0–12.5로 맞춘 뒤 클로로폼(≈50 mL) 추출해 제거, 잔류 용매는 물중탕으로 날림",
      "③ 농도 범위 → ≤0.05 mg/L: ‘추출법(460 nm)’ / 0.05–0.5 mg/L: ‘직접법(510 nm)’",
      "④ 특수 농도 → ≥5 mg/L: 희석 후 250 mL 맞춤 / ≤0.025 mg/L: 500 mL 증류(전처리 확대) 후 추출법",
    ],
  },
  distill: {
    title: "전처리(증류)",
    bullets: [
      "시료 250 mL + 메틸오렌지 2–3방울 → 인산(1+9)으로 pH≈4 → CuSO₄ 용액 2.5 mL",
      "증류장치(1 L, 그람 냉각기) 연결 → 225 mL 수집 시 가열 중지·정제수 25 mL 추가 → 총 250 mL 수집",
      "증류액이 백탁이면 재증류",
    ],
  },
  extract: {
    title: "추출법(저농도, 460 nm)",
    bullets: [
      "시료 또는 전처리액 100 mL를 분별깔때기(250 mL)에",
      "pH10 완충 3.0 mL → 4-AAP(2%) 2.0 mL → 헥사시안화철 용액 2.0 mL, 3분 방치",
      "클로로폼 10 mL로 1분 이상 격렬 혼합 → 층분리 → 무수 Na₂SO₄로 탈수",
      "유기층을 10 mm 셀로 옮겨 460 nm 측정(대조: 동일 절차 바탕)",
    ],
  },
  direct: {
    title: "직접법(중간 농도, 510 nm)",
    bullets: [
      "시료 또는 전처리액 100 mL를 플라스크/비색관에",
      "pH10 완충 3.0 mL → 4-AAP(2%) 2.0 mL → 헥사시안화철 용액 2.0 mL, 3분 방치",
      "10 mm 셀로 옮겨 510 nm 측정(대조: 동일 절차 바탕)",
    ],
  },
  special: {
    title: "특수 케이스(저·고농도)",
    bullets: [
      "고농도(≥5 mg/L): 시료 적당량 + 정제수로 250 mL 맞춰 ‘직접법’ 수행",
      "초저농도(≤0.025 mg/L): 시료 500 mL + CuSO₄ 5 mL로 증류해 500 mL 수집 → 1 L 분별깔때기로 옮겨 추출법 수행(완충 10 mL, 4-AAP 3 mL, 헥사시안화철 3 mL)",
    ],
  },
  calib: {
    title: "검정곡선(필수)",
    bullets: [
      "추출법: 1 mg/L 표준 0–50 mL를 250 mL 분별깔때기에, 각 약 100 mL로 맞춘 뒤 동일 절차 처리",
      "직접법: 10 mg/L 표준 0–50 mL를 100 mL로 정용해 동일 절차 처리",
      "결정계수 R² ≥ 0.98 또는 RF RSD ≤ 25%",
    ],
  },
  report: {
    title: "계산·보고",
    bullets: [
      "페놀류(mg/L) = (y − b) / a × I",
      "y: 시료 흡광도, a: 기울기, b: 절편, I: 희석배수(정용/추출 포함)",
    ],
  },
  qaqc: {
    title: "QA/QC 목표값",
    bullets: [
      "방법바탕: 시료군마다 1개(결과는 MDL 이하)",
      "정확도 75–125%, 정밀도(RSD) ≤ 25%",
      "고농도 시료 뒤에는 방법바탕으로 오염 확인",
      "내부정도관리 주기: 연 1회 이상(분석자/장비 변동 시 재평가)",
    ],
  },
  safety: {
    title: "안전 메모",
    bullets: [
      "클로로폼·강산(H₃PO₄ 등)·시안화철염 취급 → 반드시 흄후드, 보안경·내화학 장갑",
      "증류·가열 시 유리기구 파손/비산 주의, 물중탕 사용",
    ],
  },
};

const TABS = [
  { key: "intro", label: "개요·적용" },
  { key: "decision", label: "결정 트리" },
  { key: "distill", label: "전처리(증류)" },
  { key: "extract", label: "추출법 460 nm" },
  { key: "direct", label: "직접법 510 nm" },
  { key: "special", label: "특수 케이스" },
  { key: "calib", label: "검정곡선" },
  { key: "report", label: "계산·보고" },
  { key: "qaqc", label: "QA/QC" },
  { key: "safety", label: "안전" },
];

export default function PhenolsChecklist() {
  const [tab, setTab] = useState("decision");
  const cur = SECTIONS[tab as keyof typeof SECTIONS];

  return (

    <PageLayout>
        <PageHeader 
            title="ES 04365.1d · 페놀류–자외/가시선 분광법"
            subtitle="Phenols-UV/Visible Spectrometry"
        />
        <div className="relative space-y-5">
            {Object.values(SECTIONS).map((s, i) => (
                <li key={i} className="list-none">
                    <AnimatedSection index={i}>
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
 