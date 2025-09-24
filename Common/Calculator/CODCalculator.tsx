import { useState, useMemo } from "react";
import ExcelJS from 'exceljs';

interface CODCalculationData {
  sampleVolume: number; // mL (V)
  sampleKMnO4Volume: number; // mL (A - Blank 적정에 소비된 KMnO₄ 사용량)
  blankKMnO4Volume: number; // mL (B - 시료 적정에 소비된 KMnO₄ 사용량)
  factorA: number; // a 값 (f = b - a 계산용)
  factorB: number; // b 값 (f = b - a 계산용)
}

interface CellMapping {
  variable: string;
  cellAddress: string;
  description: string;
}

interface CODCalculationResult {
  codConcentration: number; // mg/L
  isValid: boolean;
  calculationSteps: {
    step1: number; // b - a
    step2: number; // f = 10 / (b - a)
    step3: number; // (B - A)
    step4: number; // (B - A) × f
    step5: number; // (1000 / V)
    step6: number; // (B - A) × f × (1000 / V)
    step7: number; // 최종 COD 값
  };
}

export default function CODCalculator() {
  const [calculationData, setCalculationData] = useState<CODCalculationData>({
    sampleVolume: 0,
    sampleKMnO4Volume: 0,
    blankKMnO4Volume: 0,
    factorA: 0,
    factorB: 0,
  });

  const [cellMappings, setCellMappings] = useState<CellMapping[]>([
    { variable: 'V', cellAddress: 'B2', description: '시료량' },
    { variable: 'A', cellAddress: 'B3', description: 'Blank 적정량' },
    { variable: 'B', cellAddress: 'B4', description: '시료 적정량' },
    { variable: 'a', cellAddress: 'B5', description: '인자 계산용 값 a' },
    { variable: 'b', cellAddress: 'B6', description: '인자 계산용 값 b' },
    { variable: 'f', cellAddress: 'B8', description: '계산된 인자' },
    { variable: 'COD', cellAddress: 'B10', description: '최종 COD 결과' }
  ]);

  // COD 계산
  const calculationResult = useMemo((): CODCalculationResult => {
    const { sampleVolume, sampleKMnO4Volume, blankKMnO4Volume, factorA, factorB } = calculationData;
    
    // 계산 단계별 진행
    const step1 = factorB - factorA; // b - a
    const step2 = 10 / step1; // f = 10 / (b - a)
    const step3 = blankKMnO4Volume - sampleKMnO4Volume; // (B - A)
    const step4 = step3 * step2; // (B - A) × f
    const step5 = (1000 / sampleVolume); // (1000 / V)
    const step6 = step4 * step5; // (B - A) × f × (1000 / V)
    const step7 = step6 * 0.2; // 최종 COD 값
    const isValid = sampleVolume > 0 && step1 > 0 && step3 >= 0;

    return {
      codConcentration: Math.max(0, step7),
      isValid,
      calculationSteps: {
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
        step7,
      },
    };
  }, [calculationData]);

  const updateCalculationData = (field: keyof CODCalculationData, value: number) => {
    setCalculationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setCalculationData({
      sampleVolume: 0,
      sampleKMnO4Volume: 0,
      blankKMnO4Volume: 0,
      factorA: 0,
      factorB: 0,
    });
  };

  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('COD 계산 결과');

      // 사용자 정의 셀 매핑에 따라 값 입력
      cellMappings.forEach(mapping => {
        let value: number | string = '';
        
        switch(mapping.variable) {
          case 'V':
            value = calculationData.sampleVolume;
            break;
          case 'A':
            value = calculationData.sampleKMnO4Volume;
            break;
          case 'B':
            value = calculationData.blankKMnO4Volume;
            break;
          case 'a':
            value = calculationData.factorA;
            break;
          case 'b':
            value = calculationData.factorB;
            break;
          case 'f':
            value = calculationResult.calculationSteps.step2;
            break;
          case 'COD':
            value = calculationResult.calculationSteps.step7;
            break;
        }

        // 셀에 값 입력
        const cell = worksheet.getCell(mapping.cellAddress);
        cell.value = value;
        
        // 셀 스타일 적용
        cell.style = {
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          },
          alignment: { horizontal: 'center', vertical: 'middle' }
        };

        // 최종 COD 결과 강조
        if (mapping.variable === 'COD') {
          cell.style = {
            ...cell.style,
            font: { bold: true, color: { argb: 'FF0000' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }
          };
        }

        // 설명을 인접 셀에 추가 (A열)
        const descriptionCell = worksheet.getCell(mapping.cellAddress.replace(/[0-9]+/, 'A$&'));
        descriptionCell.value = mapping.description;
        descriptionCell.style = {
          font: { italic: true },
          alignment: { vertical: 'middle' }
        };
      });

      // 파일 다운로드
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `COD_계산결과_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('엑셀 내보내기 오류:', error);
      alert('엑셀 파일 생성 중 오류가 발생했습니다.');
    }
  };

  const updateCellMapping = (index: number, field: keyof CellMapping, value: string) => {
    const newMappings = [...cellMappings];
    newMappings[index] = { ...newMappings[index], [field]: value };
    setCellMappings(newMappings);
  };

  const addCellMapping = () => {
    setCellMappings([...cellMappings, { variable: '', cellAddress: '', description: '' }]);
  };

  const removeCellMapping = (index: number) => {
    setCellMappings(cellMappings.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-center flex-1">CODₘₙ 자동 계산기</h3>
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!calculationResult.isValid}
            >
              엑셀 내보내기
            </button>
            <button
              onClick={resetCalculator}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 셀 매핑 설정 섹션 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">엑셀 셀 매핑 설정</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-3">
              각 변수를 엑셀 파일의 특정 셀에 배치할 수 있습니다. (예: B2, C5, D10 등)
            </div>
            <div className="space-y-2">
              {cellMappings.map((mapping, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={mapping.variable}
                    onChange={(e) => updateCellMapping(index, 'variable', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">변수 선택</option>
                    <option value="V">V (시료량)</option>
                    <option value="A">A (Blank 적정량)</option>
                    <option value="B">B (시료 적정량)</option>
                    <option value="a">a (인자 계산용)</option>
                    <option value="b">b (인자 계산용)</option>
                    <option value="f">f (계산된 인자)</option>
                    <option value="COD">COD (최종 결과)</option>
                  </select>
                  <input
                    type="text"
                    value={mapping.cellAddress}
                    onChange={(e) => updateCellMapping(index, 'cellAddress', e.target.value.toUpperCase())}
                    placeholder="B2"
                    className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
                  />
                  <input
                    type="text"
                    value={mapping.description}
                    onChange={(e) => updateCellMapping(index, 'description', e.target.value)}
                    placeholder="설명"
                    className="px-2 py-1 border border-gray-300 rounded text-sm flex-1"
                  />
                  <button
                    onClick={() => removeCellMapping(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button
                onClick={addCellMapping}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                매핑 추가
              </button>
            </div>
          </div>
        </div>
        
        {/* 입력 데이터 섹션 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">측정 데이터 입력</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                (V) 시료량 <span className="text-gray-500">mL</span>
              </label>
              <input
                type="number"
                // step="0.1"
                value={calculationData.sampleVolume}
                onChange={(e) => updateCalculationData('sampleVolume', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                (A) Blank 적정에 소비된 0.025N - KMnO₄ 사용량 <span className="text-gray-500">mL</span>
              </label>
              <input
                type="number"
                // step="0.01"
                value={calculationData.sampleKMnO4Volume}
                onChange={(e) => updateCalculationData('sampleKMnO4Volume', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                (B) 시료 적정에 소비된 0.025N - KMnO₄ 사용량 <span className="text-gray-500">mL</span>
              </label>
              <input
                type="number"
                // step="0.01"
                value={calculationData.blankKMnO4Volume}
                onChange={(e) => updateCalculationData('blankKMnO4Volume', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="text-gray-500">(a) 인자 계산용 값 </span>
              </label>
              <input
                type="number"
                // step="0.001"
                value={calculationData.factorA}
                onChange={(e) => updateCalculationData('factorA', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="text-gray-500">(b) 인자 계산용 값 </span>
              </label>
              <input
                type="number"
                // step="0.001"
                value={calculationData.factorB}
                onChange={(e) => updateCalculationData('factorB', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.000"
              />
            </div>
          </div>
        </div>

        {/* 계산 공식 표시 */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-3">계산 공식</h4>
          <div className="text-center">
            <div className="text-lg font-mono bg-white p-3 rounded border">
              f = 10 / (b - a) <br />
              COD(mg/L) = (B - A) × f × (1000 / V) × 0.2
            </div>
            {/* <div className="mt-2 text-sm text-gray-600">
              <p>f = 10 / (b - a) (인자 계산, b-a는 B-A와 다른 값)</p>
              <p>B = 시료 적정에 소비된 KMnO₄ 사용량(mL)</p>
              <p>A = Blank 적정에 소비된 KMnO₄ 사용량(mL)</p>
              <p>V = 시료 체적(mL)</p>
            </div> */}
          </div>
        </div>

        {/* 계산 결과 섹션 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">계산 결과</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">최종 결과</h5>
              <div className="space-y-1 text-sm">
                <div className="text-lg font-semibold">
                  COD: <span className={`font-mono ${calculationResult.isValid ? 'text-blue-600' : 'text-red-600'}`}>
                    {calculationResult.codConcentration.toFixed(1)} mg/L
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>f = 10 / (b - a) = <span className="font-mono">{calculationResult.calculationSteps.step2.toFixed(4)}</span></div>
                  <div>(1000 / V) = <span className="font-mono">{calculationResult.calculationSteps.step5}</span></div>
                </div>
                <div className="text-xs text-gray-600">
                  보고 단위: 0.1 mg/L
                </div>
                <div className={`text-xs ${calculationResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {calculationResult.isValid ? '✓ 계산 완료' : '✗ 입력값 확인 필요'}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">계산 단계 및 변수</h5>
              <div className="space-y-1 text-sm">
                
                <div className="border-b pb-1">
                  <div className="font-medium text-green-600">계산 단계:</div>
                  <div>b - a = <span className="font-mono">{calculationResult.calculationSteps.step1.toFixed(3)}</span></div>
                  <div>f = 10 / (b - a) = <span className="font-mono">{calculationResult.calculationSteps.step2.toFixed(3)}</span></div>
                  <div>(B - A) = <span className="font-mono">{calculationResult.calculationSteps.step3.toFixed(2)} mL</span></div>
                  <div>(B - A) × f = <span className="font-mono">{calculationResult.calculationSteps.step4.toFixed(3)}</span></div>
                  <div>(1000 / V) = <span className="font-mono">{calculationResult.calculationSteps.step5.toFixed(3)}</span></div>
                  <div>(B - A) × f × (1000 / V) = <span className="font-mono">{calculationResult.calculationSteps.step6.toFixed(3)}</span></div>
                  <div>× 0.2 = <span className="font-mono font-semibold text-red-600">{calculationResult.calculationSteps.step7.toFixed(1)} mg/L</span></div>
                </div>
                <div className="border-b pb-1">
                  <div className="font-medium text-blue-600">입력 변수:</div>
                  <div>a = <span className="font-mono">{calculationData.factorA.toFixed(3)}</span></div>
                  <div>b = <span className="font-mono">{calculationData.factorB.toFixed(3)}</span></div>
                  <div>A = <span className="font-mono">{calculationData.sampleKMnO4Volume.toFixed(2)} mL</span></div>
                  <div>B = <span className="font-mono">{calculationData.blankKMnO4Volume.toFixed(2)} mL</span></div>
                  <div>V = <span className="font-mono">{calculationData.sampleVolume.toFixed(1)} mL</span></div>
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
              <div className={`mb-1 ${calculationData.sampleVolume === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                {calculationData.sampleVolume === 100 ? '✓' : '⚠'} 표준 시료량 (100 mL)
              </div>
              <div className={`mb-1 ${calculationResult.calculationSteps.step3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {calculationResult.calculationSteps.step3 >= 0 ? '✓' : '✗'} 시료값 ≥ 공시험값 (B ≥ A)
              </div>
              <div className={`mb-1 ${calculationResult.calculationSteps.step1 > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {calculationResult.calculationSteps.step1 > 0 ? '✓' : '✗'} 인자 계산 (b - a {'>'} 0)
              </div>
            </div>
            <div>
              <div className={`mb-1 ${calculationResult.codConcentration >= 0.1 ? 'text-green-600' : 'text-yellow-600'}`}>
                {calculationResult.codConcentration >= 0.1 ? '✓' : '⚠'} 정량한계 이상 (≥ 0.1 mg/L)
              </div>
              <div className="text-gray-600">
                회수율: 75-125%, 정밀도 RSD ≤ 25%
              </div>
            </div>
          </div>
        </div>

        {/* 참고사항 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">참고사항</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• KMnO₄ 소비량이 공시험 대비 50-70% 범위에 드는지 확인하세요</p>
            <p>• 공시험(방법 바탕)을 동시에 수행하여 보정하세요</p>
            <p>• 결과는 0.1 mg/L 단위로 보고하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
