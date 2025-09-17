import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function NH_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "목적: pH<4 산성 조건에서 n-헥산으로 추출 → 용매를 날리고 잔류물(유분류) 무게 측정",
        "적용: 지표수/지하수/폐수, LOQ ≈ 0.5 mg/L",
      ],
    },
    {
      title: "기구/시약(요지)",
      bullets: [
        "분별깔때기, 전기열판/맨틀(80 ℃ 유지), 증발용기(알루미늄 접시·비커·증류플라스크)",
        "U자형 연결관+리비히 냉각관(증류 시), 무수 Na2SO4, 메틸오렌지(0.1%), 염산(1+1)",
        "플로리실(활성규산마그네슘) 컬럼(광유류 분획용)",
      ],
    },
    {
      title: "전처리 핵심",
      accent: true,
      bullets: [
        "시료 적당량 → 메틸오렌지 2–3방울 → 염산(1+1)으로 pH<4(황색→적색)",
        "시료병을 n-헥산 20 mL로 2회 씻어 합치며 2분 격렬 혼합 → 정층 후 유기층 분리",
        "재추출 1회(n-헥산 20 mL) 후 합침 → 수층을 정제수로 2회 세척",
        "에멀젼 생기면: NaCl 또는 (NH4)2SO4 약 10 g 넣고 80 ℃ 물중탕 10분 환류로 분해",
        "헥산층에 무수 Na2SO4 넣어 충분히 탈수 → 건조여과지로 여과하여 항량된 증발용기에 모음",
      ],
    },
    {
      title: "증발·건조·칭량",
      bullets: [
        "알루미늄 접시/비커: 80 ℃ 열판/맨틀에서 용매 증발",
        "증류플라스크 사용 시: 80 ℃에서 1방울/초로 증류, 잔액 2 mL 남기고 질소 퍼지로 완전 증발",
        "(80±5) ℃ 건조기 30분 → 실리카겔 데시케이터 30분 냉각 → 무게 측정",
        "동일 용매로 바탕시험(Blank)을 동일 조작으로 수행하여 보정",
      ],
    },
    {
      title: "광유류 분획(선택)",
      bullets: [
        "nH 잔류물을 헥산에 녹여 100 mL 플라스크로 옮김",
        "플로리실 컬럼을 1.2 mL/분으로 통과(첫 20 mL 폐기, 다음 50 mL 수집)",
        "수집액을 동일 절차로 증발·건조·칭량 → 광유류량 산출",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "총 nH(mg/L) = (a − b) × (1000 / V)",
        "nH 중 광유류(mg/L) = (a − b) × (100 / 80) × (1000 / V)",
        "동·식물유지류(mg/L) = 총 nH − 광유류",
      ],
    },
    {
      title: "QA/QC 체크",
      bullets: [
        "정확도 75–125%, 정밀도(RSD) ≤ 25%",
        "정도관리 주기 운영, 방법바탕(Blank) 적합 여부 확인",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "n-헥산 인화성 매우 높음: 흄후드, 화기 엄금, 정전기 주의",
        "산·용매 혼재 작업: 보안경·내화학 장갑·실험복 필수",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04302.1b · 노말헥산 추출물질(nH) 전용 플로우차트"
        subtitle=""
        description="nH = n-Hexane Extractable Material"
      />


        <ol className="relative space-y-5">
          {sections.map((s, i) => (
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
        </ol>

        {/* <footer className="mt-8 text-xs text-gray-500">
          본 도식은 사용자가 업로드한 표준(ES 04302.1b)을 바탕으로 작성되었습니다. 실제 시험 전 최신 개정본과 안전수칙을 반드시 확인하세요.
        </footer> */}
      </PageLayout>
  )
}            
