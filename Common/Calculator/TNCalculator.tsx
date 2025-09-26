import { useState, useMemo } from "react";

interface CalibrationPoint {
  concentration: number; // mg/L
  absorbance: number;
}

interface SampleData {
  volume: number; // mL
  absorbance: number;
}

interface CalculationResult {
  nitrogenAmount: number; // mg
  totalNitrogen: number; // mg/L
  rSquared: number;
  slope: number;
  intercept: number;
  isValid: boolean;
}

export default function TNCalculator() {
  const [calibrationPoints, setCalibrationPoints] = useState<CalibrationPoint[]>([
    { concentration: 0, absorbance: 0 },
    { concentration: 2, absorbance: 0 },
    { concentration: 4, absorbance: 0 },
    { concentration: 6, absorbance: 0 },
    { concentration: 8, absorbance: 0 },
  ]);

  const [sampleData, setSampleData] = useState<SampleData>({
    volume: 50,
    absorbance: 0,
  });

  const [methodBlank, setMethodBlank] = useState<number>(0);

  // 검정곡선 계산 (최소제곱법)
  const calibrationResult = useMemo((): CalculationResult => {
    const points = calibrationPoints.filter(p => p.concentration > 0 && p.absorbance > 0);
    
    if (points.length < 3) {
      return {
        nitrogenAmount: 0,
        totalNitrogen: 0,
        rSquared: 0,
        slope: 0,
        intercept: 0,
        isValid: false,
      };
    }

    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.concentration, 0);
    const sumY = points.reduce((sum, p) => sum + p.absorbance, 0);
    const sumXY = points.reduce((sum, p) => sum + p.concentration * p.absorbance, 0);
    const sumXX = points.reduce((sum, p) => sum + p.concentration * p.concentration, 0);
    const sumYY = points.reduce((sum, p) => sum + p.absorbance * p.absorbance, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // R² 계산
    const yMean = sumY / n;
    const ssRes = points.reduce((sum, p) => {
      const predicted = slope * p.concentration + intercept;
      return sum + Math.pow(p.absorbance - predicted, 2);
    }, 0);
    const ssTot = points.reduce((sum, p) => sum + Math.pow(p.absorbance - yMean, 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    // 시료의 질소량 계산 (보정된 흡광도 사용)
    const correctedAbsorbance = sampleData.absorbance - methodBlank;
    const nitrogenAmount = slope > 0 ? (correctedAbsorbance - intercept) / slope : 0;
    const totalNitrogen = nitrogenAmount / sampleData.volume * 1000;

    return {
      nitrogenAmount: Math.max(0, nitrogenAmount),
      totalNitrogen: Math.max(0, totalNitrogen),
      rSquared,
      slope,
      intercept,
      isValid: rSquared >= 0.98 && slope > 0,
    };
  }, [calibrationPoints, sampleData, methodBlank]);

  const updateCalibrationPoint = (index: number, field: keyof CalibrationPoint, value: number) => {
    const newPoints = [...calibrationPoints];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setCalibrationPoints(newPoints);
  };

  const addCalibrationPoint = () => {
    setCalibrationPoints([...calibrationPoints, { concentration: 0, absorbance: 0 }]);
  };

  const removeCalibrationPoint = (index: number) => {
    if (calibrationPoints.length > 3) {
      setCalibrationPoints(calibrationPoints.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-center">총질소(TN) 자동 계산기</h3>
        
        {/* 검정곡선 섹션 */}
        <div className="mb-6 w-4/5 mx-auto">
          <h4 className="text-lg font-medium mb-3">검정곡선 작성</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 text-center">농도 (mg/L)</th>
                  <th className="border border-gray-300 px-3 py-2 text-center">흡광도</th>
                  <th className="border border-gray-300 px-3 py-2 text-center">액션</th>
                </tr>
              </thead>
              <tbody>
                {calibrationPoints.map((point, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="number"
                        step="0.1"
                        value={point.concentration}
                        onChange={(e) => updateCalibrationPoint(index, 'concentration', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="number"
                        step="0.001"
                        value={point.absorbance}
                        onChange={(e) => updateCalibrationPoint(index, 'absorbance', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calibrationPoints.length > 3 && (
                        <button
                          onClick={() => removeCalibrationPoint(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addCalibrationPoint}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            행 추가
          </button>
        </div>

        {/* 시료 측정 섹션 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">시료 측정</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">시료량 (mL)</label>
              <input
                type="number"
                step="0.1"
                value={sampleData.volume}
                onChange={(e) => setSampleData({...sampleData, volume: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">시료 흡광도</label>
              <input
                type="number"
                step="0.001"
                value={sampleData.absorbance}
                onChange={(e) => setSampleData({...sampleData, absorbance: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">방법바탕 흡광도</label>
              <input
                type="number"
                step="0.001"
                value={methodBlank}
                onChange={(e) => setMethodBlank(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 계산 결과 섹션 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">계산 결과</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">검정곡선 정보</h5>
              <div className="space-y-1 text-sm">
                <div>기울기: <span className="font-mono">{calibrationResult.slope.toFixed(4)}</span></div>
                <div>절편: <span className="font-mono">{calibrationResult.intercept.toFixed(4)}</span></div>
                <div>R²: <span className={`font-mono ${calibrationResult.rSquared >= 0.98 ? 'text-green-600' : 'text-red-600'}`}>
                  {calibrationResult.rSquared.toFixed(4)}
                </span></div>
                <div className={`text-xs ${calibrationResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {calibrationResult.isValid ? '✓ 검정곡선 적합' : '✗ 검정곡선 부적합 (R² < 0.98)'}
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">시료 분석 결과</h5>
              <div className="space-y-1 text-sm">
                <div>질소량: <span className="font-mono font-semibold">{calibrationResult.nitrogenAmount.toFixed(4)} mg</span></div>
                <div>총질소: <span className="font-mono font-semibold text-blue-600">{calibrationResult.totalNitrogen.toFixed(2)} mg/L</span></div>
                <div className="text-xs text-gray-600">
                  정량한계: 0.1 mg/L
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QA/QC 체크 */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-3">QA/QC 체크리스트</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className={`mb-1 ${calibrationResult.rSquared >= 0.98 ? 'text-green-600' : 'text-red-600'}`}>
                {calibrationResult.rSquared >= 0.98 ? '✓' : '✗'} 검정곡선 적합성 (R² ≥ 0.98)
              </div>
              <div className={`mb-1 ${methodBlank <= 0.1 ? 'text-green-600' : 'text-yellow-600'}`}>
                {methodBlank <= 0.1 ? '✓' : '⚠'} 방법바탕시료 (≤ 0.1 mg/L)
              </div>
            </div>
            <div>
              <div className={`mb-1 ${calibrationResult.totalNitrogen >= 0.1 ? 'text-green-600' : 'text-yellow-600'}`}>
                {calibrationResult.totalNitrogen >= 0.1 ? '✓' : '⚠'} 정량한계 이상 (≥ 0.1 mg/L)
              </div>
              <div className="text-gray-600">
                정확도: 75-125%, 정밀도 RSD ≤ 25%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
