
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function PH_Flow() {
  const blocks = [
    {
      title: "개요·적용",
      bullets: [
        "유리전극+기준전극(pH meter)의 전위차로 pH를 측정 (정량범위 pH 0.0–14.0)",
        "적용: 수온 0–40 ℃의 지표수·하·폐수 등",
      ],
    },
    {
      title: "간섭/전처리(필수)",
      accent: true,
      bullets: [
        "pH≥10에서 소듐 오차 가능 → '낮은 소듐 오차 전극' 사용",
        "기름막·미세입자 피복 시: 세제/정제수로 세척, 필요 시 염산(1+9)로 제거",
        "pH는 온도 영향 큼 → 자동/수동(표 2) 온도보정 적용",
        "전극은 측정 후 정제수 세척 → 3 M KCl 또는 제조사 보존용액에 보관",
      ],
    },
    {
      title: "장비/표준용액",
      bullets: [
        "pH meter(영점·온도보정 기능), 유리/결합전극",
        "표준용액(예): pH 4.00 프탈산염, 6.88 인산염, 10.07 탄산염 (시판용 사용 가능)",
      ],
    },
    {
      title: "교정(3점법)",
      bullets: [
        "전원 ON 후 ≥30분 안정화, 전극은 정제수 세척→물기 제거",
        "1) pH 4.00 표준에 담가 교정 → 세척",
        "2) pH 6.88 표준에 담가 교정 → 세척",
        "3) pH 10.07 표준에 담가 교정",
      ],
    },
    {
      title: "온도보정",
      bullets: [
        "pH 4 또는 pH 10 표준에 전극을 담그고 10–30 ℃에서 5 ℃ 간격 측정",
        "표 2 값으로 보정(없을 경우 내삽) — 가능하면 온도 동시 측정",
      ],
    },
    {
      title: "측정(분석방법)",
      bullets: [
        "교정 후 전극을 정제수에 수 시간 담가 활성화",
        "전극 물기 제거 → 시료에 담가 2–3분 후 읽기",
        "값의 변동이 pH 0.1 이내가 될 때까지 반복 확인",
        "측정 후 전극 세척·보관용액 보관",
      ],
    },
    {
      title: "QA/QC·보고",
      bullets: [
        "QC 표준: pH 4.00 / 6.88 / 10.07",
        "동일 시료 5개 이상 반복 시 pH 0.1 이내",
        "교정은 채취 전·중에도 주기적으로(예: 시료 10개당 1회)",
        "보고: 소수점 첫째 자리까지",
      ],
    },
    {
      title: "안전·관리 팁",
      bullets: [
        "전극 피복/오염 시 세제 또는 0.1 M HCl 세척 후 충분히 린스",
        "전극 수명·세척·보존은 제조사 지침 준수",
      ],
    },
  ];

  return (
        <PageLayout>
      <PageHeader 
        title="ES 04306.1d · 수소이온농도(pH) "
        subtitle="PH = Potential of Hydrogen"
      />

                <ol className="relative space-y-5">
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
        </ol>
      </PageLayout>
  );
}
                    