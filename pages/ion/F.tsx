
import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function Fluoride_LaARC_Flow() {
  const sections = [
    {
      title: "개요·적용",
      bullets: [
        "원리: 란탄–알리자린 콤프렉손(La–ARC) 착화합물이 불소이온과 반응해 청색 복합체 형성 → 620 nm 흡광 측정",
        "적용: 지표수·지하수·폐수 / 정량한계(LOQ) 0.15 mg/L",
      ],
    },
    {
      title: "간섭·전처리 결정",
      accent: true,
      bullets: [
        "Al, Fe 방해 큼 → ‘증류’로 제거",
        "Cl⁻ 다량 시: 직접증류 전에 황산은(Ag₂SO₄)을 5 mg/mg Cl⁻ 비율로 첨가",
      ],
    },
    {
      title: "증류장치",
      bullets: [
        "직접 증류장치(그림1) 또는 수증기 증류장치(그림2) 사용",
      ],
    },
    {
      title: "전처리 A · 직접 증류법",
      bullets: [
        "(1) 1 L 증류플라스크: 정제수 400 mL + 황산 200 mL(벽면 따라 천천히) + 끓임쪽 → 장치 연결",
        "(2) 178–180 ℃까지 증류, 유출액 버려 기구·황산 중 F⁻ 제거(산:물 비 맞춤)",
        "(3) 100 ℃ 이하로 냉각 → 시료 300 mL 서서히 넣어 혼합 → 동일 조건으로 증류",
        "(4) 유출액을 500 mL 실린더에 받고 정제수로 일정 부피 맞춤(온도 보정)",
        "(5) 플라스크의 황산은 오염 축적이 없으면 계속 재사용 가능",
      ],
    },
    {
      title: "전처리 B · 수증기 증류법",
      bullets: [
        "(1) 시료(불소로서 ≥0.03 mg) + 페놀프탈레인(0.5%) 2–3방울, NaOH(10%)로 붉게 만들고 가열 농축(~30 mL)",
        "(2) 농축액을 킬달플라스크로 옮기고 SiO₂ ~1 g, H₃PO₄ 1 mL, HClO₄ 40 mL + 끓임쪽",
        "(3) 별도의 플라스크에 정제수 ~600 mL → 장치 연결",
        "(4) 140–150 ℃ 유지하며 수증기 통과, 유출 3–5 mL/min, 수집량 ~220 mL에서 종료",
        "(5) 냉각관 내부를 정제수로 린스해 합치고 250 mL로 정용",
      ],
    },
    {
      title: "발색·측정(La–ARC)",
      bullets: [
        "전처리액 적당량(≤30 mL, F⁻ ≤0.05 mg) → 50 mL 플라스크",
        "란탄–알리자린 콤프렉손 용액 20 mL 첨가 → 정용 → 혼합 후 약 1 h 방치",
        "10 mm 셀로 옮겨 620 nm에서 흡광 측정(대조: 동일 절차의 정제수)",
        "※ 정량범위 초과 시 ‘탈색’ 발생 → 시료량 감량/희석 후 재시험",
      ],
    },
    {
      title: "검정곡선(필수)",
      bullets: [
        "불소 2.0 mg/L 표준용액 0–25 mL → 50 mL로 정용(≥3점)",
        "시료와 동일 절차로 처리 후 농도–흡광도 검정곡선 작성",
        "적합성: R² ≥ 0.98 또는 RF RSD ≤ 25%",
      ],
    },
    {
      title: "계산·보고",
      bullets: [
        "불소 (mg/L) = (y − b) / a × I",
        "y: 시료 흡광도, a: 기울기, b: 절편, I: 희석배수",
      ],
    },
    {
      title: "QA/QC 체크",
      bullets: [
        "방법바탕(Blank) 1/시료군, 결과는 MDL 이하",
        "정확도 75–125%, 정밀도(RSD) ≤ 25%",
        "고농도 시료 뒤에는 방법바탕으로 오염 확인",
      ],
    },
    {
      title: "안전 메모",
      bullets: [
        "H₂SO₄/HCIO₄/염산 등 강산 취급 — 흄후드·보안경·장갑 필수",
        "가열·증류 시 유리기구 파손·비산 주의",
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="ES 04351.1b · 불소(란탄–알리자린 콤프렉손) 플로우차트"
        subtitle="F = Fluoride"
        description="Fluoride-LaARC = Fluoride-Lanthanum–Alizarin Complexon"
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
