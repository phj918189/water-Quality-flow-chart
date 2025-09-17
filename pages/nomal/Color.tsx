import PageLayout from '../../Common/PageLayout';
import PageHeader from '../../Common/PageHeader';
import AnimatedSection from '../../Common/AnimatedSection';

export default function Color_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "아담스–니컬슨(ADMI) 공식을 근거로 색도(도)를 계산하는 방법",
        "적용: 지표수·지하수·하·폐수"
      ],
    },
    {
      title: "간섭/전처리(필수)",
      accent: true,
      bullets: [
        "콜로이드·부유물이 빛의 흡수/산란 간섭 → 0.45 μm 여과지(셀룰로오스/유리섬유)로 제거",
        "모든 시료는 여과: 최초 50 mL는 버리고, 추가 50 mL를 여과해 측정용으로 사용"
      ],
    },
    {
      title: "장비/조건",
      bullets: [
        "여과장치: 22 mm 또는 47 mm, 0.45 μm(유리·스텐·PTFE 재질)",
        "분광광도계: SBW ≤ 10 nm, 400–700 nm에서 투과율 측정",
        "흡수셀: 기본 10 mm(색도 ≤ 250도일 땐 50 mm 사용 권장)"
      ],
    },
    {
      title: "표준용액(500 CU) 준비",
      bullets: [
        "1 L 플라스크에 HCl 100 mL → K2PtCl6 1.246 g + CoCl2·6H2O 1.0 g 용해 → 정용",
        "보관: 1개월"
      ],
    },
    {
      title: "측정 단계(10분할법 파장표 사용)",
      bullets: [
        "영점: 여과한 정제수를 10 mm(≤250도: 50 mm) 셀에 담아 0점 설정",
        "셀 세척: 시료로 셀 2회 린스 후 채움",
        "표 1(선정 파장들) 각 파장에서 시료의 투과율(%) 측정"
      ],
    },
    {
      title: "검정곡선 작성",
      bullets: [
        "표준원액 10/20/30/40/50 mL → 각각 100 mL로 정용",
        "시료와 동일 파장들에서 투과율 측정 후 검정자료로 사용"
      ],
    },
    {
      title: "계산(요약)",
      bullets: [
        "① 각 파장 투과율로 X, Y, Z 계산: X=0.09806ΣXi, Y=0.10000ΣYi, Z=0.11814ΣZi",
        "② 표 4 양식으로 VX, VY, VZ 도출",
        "③ 표준액: DE = {(0.23ΔVY)^2 + [Δ(VX−VY)]^2 + [0.4Δ(VY−VZ)]^2}^1/2",
        "④ 표준들의 보정계수 평균 F 산정",
        "⑤ 시료의 DE 계산 후 색도(도) = (F·DE)/b  (b=셀 층장, cm)",
        "표시는 정수(‘도’)로 보고"
      ],
    },
    {
      title: "안전/메모",
      bullets: [
        "백금·코발트 염 및 염산 취급: 흄후드·보안경·내화학장갑 필수",
        "여과지·셀은 스크래치/오염 최소화(광학면 닦기)"
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04304.1d · 색도(Adams–Nickerson) 플로우차트"
      />

        <ol className="relative space-y-5">
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
        </ol>
      </PageLayout>
  );
}
