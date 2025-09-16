import React, { useMemo } from "react";
import PageLayout from '../Common/PageLayout';
import PageHeader from '../Common/PageHeader';
import AnimatedSection from '../Common/AnimatedSection';
import TabNavigation from "../Common/TabNavigation"; 

export default function CODMnFlowchart() {
  const steps = useMemo(
    () => [
      {
        title: "준비",
        details: [
          "기구: 둥근바닥 플라스크 300 mL, 리비히 냉각관 300 mm, 물중탕기",
          "시약: KMnO₄ 0.005 M, H₂SO₄(1+2), Ag₂SO₄/AgNO₃(간섭 억제 시), Na₂C₂O₄ 0.0125 M",
        ],
      },
      {
        title: "시료 채취/분취",
        details: [
          "플라스크에 시료 100 mL",
        ],
      },
      {
        title: "산성화 및 첨가제",
        details: [
          "H₂SO₄(1+2) 10 mL 첨가",
          "염화물 등 간섭 시 Ag₂SO₄ 또는 AgNO₃를 지침에 따라 첨가",
        ],
      },
      {
        title: "산화 단계",
        details: [
          "KMnO₄ 0.005 M 10 mL 첨가",
          "리비히 냉각관 연결, 끓는 물중탕에서 30분 가열",
        ],
      },
      {
        title: "냉각",
        details: [
          "상온까지 충분히 냉각",
        ],
      },
      {
        title: "환원제 투입",
        details: [
          "Na₂C₂O₄ 0.0125 M 10 mL 첨가",
        ],
      },
      {
        title: "역적정",
        details: [
          "60–80 ℃에서 KMnO₄ 0.005 M으로 역적정",
          "연한 적자색이 일정 시간 지속될 때 종말점",
        ],
      },
      {
        title: "체적 조정 및 범위 확인",
        details: [
          "필요 시 전체 체적을 100 mL로 맞춤",
          "KMnO₄ 소비가 공시험 대비 50–70% 범위에 드는지 확인(정확도 관리)",
        ],
      },
      {
        title: "기록 및 계산",
        details: [
          "a = 시료의 KMnO₄(0.005 M) 사용량(mL)",
          "b = 공시험의 KMnO₄(0.005 M) 사용량(mL)",
          "f = KMnO₄(0.005 M) 인자, V = 시료 체적(mL)",
          "계산식: COD(mg/L) = (b − a) × f × (1000 / V) × 0.2",
          "보고: 0.1 mg/L 단위",
        ],
      },
      {
        title: "QA/QC 체크리스트",
        details: [
          "공시험(방법 바탕) 동시 수행",
          "회수율 75–125%",
          "정밀도: RSD ≤ 25%",
        ],
      },
    ],
    []
  );

  return (
    
    <PageLayout>
      <PageHeader 
        title="ES 04315.1b · CODₘₙ (산성과망간산칼륨법) 플로우차트"
        description="COD = Chemical Oxygen Demand, CODMn = Chemical Oxygen Demand-Titrimetric Method-Acidic Permanganate"
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
            </li>
          ))}
        </ol>
    </PageLayout>
    
  );
}