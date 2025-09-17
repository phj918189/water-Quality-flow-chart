import { motion } from "framer-motion";
import PageLayout from "../../Common/PageLayout";  
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function TotalColiform_DryFilm_Flow() {
  const steps = [
    {
      title: "개요·적용",
      bullets: [
        "건조 재수화 필름 배지에 시료를 접종하여 총대장균군을 정량하는 방법",
        "적용: 하·폐수(제품별 적정 범위는 제조사 설명서 준수)",
      ],
    },
    {
      title: "장비/시약(요지)",
      bullets: [
        "배양기: 35 ± 0.5 ℃ 유지",
        "멸균 피펫/자동피펫(1–25 mL, 멸균 팁 포함)",
        "건조필름배지(락토오스 분해/β-gal 기질 포함, 상용화 제품)",
        "희석액: 총대장균군 막여과법에 준함",
      ],
    },
    {
      title: "전처리·희석",
      accent: true,
      bullets: [
        "제조사 설명서에 따라 측정 적정범위가 되도록 시료를 희석",
        "무균 조작 유지(대조시험액으로 무균 확인)",
      ],
    },
    {
      title: "접종·배양",
      bullets: [
        "각 희석에서 시험용액 1 mL씩을 필름배지 2매 이상에 접종(중복)",
        "배양: 35 ± 0.5 ℃, 24 ± 2 h",
      ],
    },
    {
      title: "판독·계산",
      bullets: [
        "양성 집락을 계수하여 평균값 산출",
        "평균 집락수 × 희석배수 = 총대장균군 수(mL당)",
      ],
    },
    {
      title: "QA/QC(필수)",
      bullets: [
        "방법 도입 시 또는 제품/시약 변경 시: 평판집락법과 동등 이상 결과 확보 후 사용",
        "양성대조군(E. coli 표준균주)·음성대조군(멸균 희석액) 동시 운용",
      ],
    },
    {
      title: "결과 보고",
      bullets: [
        "적정 범위 내 결과들의 산술평균을 ‘총대장균군 수/mL’로 표기",
        "반올림 규칙: 유효숫자 2자리(2자리 미만이면 1자리), 소수점 포함 결과는 정수로 반올림",
        "수질이 양호하여 매우 낮은 경우에는 모든 집락을 계수하여 표기",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "미생물 시료 취급: 생물안전장갑·보안경·멸균 작업대 사용",
        "배양 후 필름은 멸균(오토클레이브/멸균백) 폐기",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader title="총대장균군(건조필름법) 플로우차트"
      subtitle="TC = Total Coliform-Dry Rehydratable Film Method"
      />
        <ol className="space-y-5">
            {steps.map((s, i) => (
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