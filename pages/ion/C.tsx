import PageLayout from "../../Common/PageLayout";
import PageHeader from "../../Common/PageHeader";
import AnimatedSection from "../../Common/AnimatedSection";

export default function Chloride_Flow() {
    const sections = [
        {
            title: "개요·적용",
            bullets: [
                "원리: 시료의 Cl⁻을 AgNO₃로 적정 → 과잉 Ag⁺가 K₂CrO₄와 반응해 적황색 Ag₂CrO₄ 침전이 나타나는 점을 종말점으로 판정",
                "적용: 지표수·폐수 / 정량한계(LOQ) 0.7 mg/L",
            ],
        },
        {
            title: "간섭·전처리 결정",
            accent: true,
            bullets: [
                "Br⁻/I⁻/CN⁻ 동존 시 Cl⁻로 과대 정량됨",
                "SO₃²⁻/S₂O₃²⁻/SO₄²⁻ 방해 → 과황산수소로 산화하여 제거",
                "심한 착색 시: 칼륨명반 현탁액으로 탈색 후 상층액 사용",
            ],
        },
        {
            title: "시약(요지)",
            bullets: [
                "NaOH 4% (pH 조절)",
                "AgNO₃ 0.1 N(표정 후 보관) → 0.01 N으로 희석",
                "KAl(SO₄)₂·12H₂O(칼륨명반) 현탁액",
                "K₂CrO₄ 용액(지시약)",
                "H₂SO₄ (1+35)",
            ],
        },
        {
            title: "표정(AgNO₃ 0.1 N)",
            bullets: [
                "NaCl(건조) 정확량 + K₂CrO₄(10%) 1 mL → 지속적 붉은색까지 AgNO₃ 적정 → 농도계수 산출",
            ],
        },
        {
            title: "분석 절차(모어법)",
            bullets: [
                "(1) 시료 50 mL 삼각플라스크",
                "(2) pH ≈ 7로 조정(필요 시 NaOH 4% 또는 H₂SO₄ 1+35)",
                "(3) K₂CrO₄ 용액 1 mL 첨가",
                "(4) AgNO₃ 0.01 N으로 적정 → 엷은 적황색 침전이 나타나는 점",
                "(5) 바탕: 정제수 50 mL 동일 절차로 보정",
            ],
        },
        {
            title: "계산·보고",
            bullets: [
                "Cl⁻(mg/L) = (a − b) × f × 0.3545 × 1000 / V",
                "a: 시료 적정 소비 mL, b: 바탕 소비 mL, f: 0.01 N AgNO₃ 계수, V: 시료량(mL)",
            ],
        },
        {
            title: "QA/QC",
            bullets: [
                "정확도 75–125%, 정밀도(RSD) ≤ 25%",
                "정밀·정확도는 연 1회 이상 산정(장비·분석자 변동 시 재평가)",
            ],
        },
        {
            title: "안전 메모",
            bullets: [
                "AgNO₃(산화성)·K₂CrO₄(유해성) 취급: 흄후드·보안경·니트릴장갑",
                "산(1+35) 취급 시 산-물 혼합 순서 엄수, 비산 주의",
            ],
        },
    ];

    return (
        <PageLayout>
            <PageHeader
                title="ES 04356.3d · 염소이온(적정법) "
                // subtitle="Cl⁻ = Chloride"
                description="Chloride-Titrimetric Method"
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
