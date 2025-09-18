import { motion, steps } from "framer-motion";      
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function Metal_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "시료를 아르곤 플라스마(≈6,000–8,000 K)에 분무 → 방출선 강도로 다원소 동시 정량",
        "적용: 지표수·지하수·하·폐수 / 선택파장·정량한계는 부록 표 2 참조",
      ],
    },
    {
      title: "간섭(전처리·보정 설계의 핵심)",
      accent: true,
      bullets: [
        "물리적 간섭: 비중·점도·표면장력 차이로 분무 효율 변화 — 매질 일치/희석/내부표준/분무기 교체",
        "이온화 간섭: Na/K 등 알칼리 공존 → 전자밀도 변화 — 방출선이 증감",
        "분광 간섭: 선 겹침·배경 상승 — 배경보정/대체 파장/수학적 보정",
      ],
    },
    {
      title: "장비 구성(요지)",
      bullets: [
        "분광계: 다색화·단색화 모두 가능, band pass < 0.05 nm",
        "시료주입: 동심·교차흐름 분무기(일반), 바빙톤(점성/부유물), 초음파 등 선택",
        "플라스마: RF 750–1,200 W, 주파수 27.12/40.68 MHz, 석영 토치(3동심), 아르곤 99.99%",
        "유량·연동펌프로 운반·보조·냉각 가스 제어(예: 19 L/min, 0.62/0.30 L/min 등 장비 예)",
      ],
    },
    {
      title: "시약/표준·내부표준",
      bullets: [
        "산: HCl(1+1), HNO₃(1+1) — 매질 맞춤",
        "표준: 1,000 mg/L 원액(공정 기준) → 50 mg/L 혼합표준은 사용 시 조제",
        "내부표준: Bi/Sc/Y/In/Tb 등(분광 겹침 없는 성분 선택)",
      ],
    },
    {
      title: "전처리·시료관리",
      bullets: [
        "시료채취·보존은 ES 04130.1f, 전처리는 ES 04150.1c 준수",
        "필터링/산보존/희석 등 매질 일치 — 고염·황산·인산 매질 주의",
      ],
    },
    {
      title: "분석 절차",
      bullets: [
        "분무기/토치/튜브 막힘·오염 점검",
        "플라스마 점화 후 30–60분 안정화 → 기기 매뉴얼에 따라 조건 최적화(표 3 예 참조)",
        "표준 신호(피크 높이/면적) 측정 → 검정곡선 작성",
        "시료는 3회 이상 반복 측정하여 평균 보고",
      ],
    },
    {
      title: "검정·정량(3가지)",
      bullets: [
        "외부검정: 50 mg/L 혼합표준 0–25 mL → 100 mL 정용 → 농도–신호로 곡선",
        "표준물질첨가: 동일 시료에 단계적 첨가(0–25 mL) → 기울기·절편으로 계산",
        "내부표준: 표준과 내부표준 신호비로 검정 → 매질·안정성 보정",
      ],
    },
    {
      title: "보고·계산",
      bullets: [
        "농도(mg/L) = (y − b) / a  (y: 시료 신호 또는 신호비, a: 기울기, b: 절편)",
        "선택파장·정량한계(예): Cu 324.75 nm LOQ 0.006; Zn 213.90 nm LOQ 0.002; Pb 220.35 nm LOQ 0.04 등",
      ],
    },
    {
      title: "QA/QC 목표값",
      bullets: [
        "R² ≥ 0.99, 검정곡선 검증 ±15% 이내",
        "정밀도 RSD ≤ 25%, 정확도 75–125%",
      ],
    },
    {
      title: "안전/운영 팁",
      bullets: [
        "고압 아르곤·고주파 장비: 가스 누설, RF 노이즈, 토치 과열 주의",
        "산(질산/염산) 취급·분무 에어로졸 흡입 방지 — 흄후드, 보호구 필수",
        "고염·고황산 매질은 희석/매질일치/내부표준으로 보정",
      ],
    },
  ,
    {
      title: "근거(표준 인용·요약)",
      bullets: [
        "목적/적용·원소: 아르곤 플라스마(≈6,000–8,000 K)에서 방출선을 측정해 다원소 정성·정량. 구리, 납, 니켈, 망간, 비소, 셀레늄, 아연, 카드뮴, 크롬(6가 포함) 등. 적용: 지표수·지하수·하·폐수.",
        "간섭: 물리적(비중·점도·표면장력, 황산/인산 매질 주의)→매질 일치·희석·내부표준·분무기 선택. 이온화(Na/K 등 알칼리 공존으로 전자밀도 변화). 분광(선 겹침·배경 상승)→배경보정/대체 파장/수학적 보정.",
        "장비·조건: 분광계 band pass < 0.05 nm. 분무기 동심/교차흐름(점성/입자 시 바빙톤). Ar 99.99%, RF 750–1,200 W, 27.12/40.68 MHz, 석영 3동심 토치.",
        "시약/표준·내부표준: HCl(1+1), HNO₃(1+1). 금속 표준원액 1,000 mg/L→사용 시 50 mg/L 혼합표준 조제. 내부표준 Bi/Sc/Y/In/Tb 등(겹침 없는 성분).",
        "분석 절차: 분무기·토치·튜브 막힘/오염 점검 → 플라스마 점화 후 30–60분 안정화 → 표준으로 조건 최적화(표 3 예) → 표준 신호(피크 높이/면적)로 검정곡선 작성 → 시료 ≥3회 반복 평균 보고.",
        "정량·계산: 외부검정/표준물질첨가/내부표준 모두 농도 = (y − b) / a (y: 신호 또는 신호비).",
        "QA/QC 목표: R² ≥ 0.99, 검정곡선 검증 ±15% 이내, 정밀도 RSD ≤ 25%, 정확도 75–125%. 예시 LOQ: Cu 324.75 nm 0.006 mg/L; Zn 213.90 nm 0.002 mg/L; Pb 220.35 nm 0.04 mg/L.",
      ],
    }
  ];

  return (
      <PageLayout>
        <PageHeader title="금속류 ICP-AES" 
        description="Metals-Inductively Coupled Plasma-Atomic Emission Spectrometry"
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

        

