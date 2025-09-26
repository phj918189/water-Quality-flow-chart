import { useState, useMemo, useEffect } from "react";
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

interface VariableLocation {
  variable: string;
  fileName: string;
  sheetName: string;
  column: string;
  description: string;
  selectedFile?: File; // 사용자가 선택한 파일
}

interface VariableMultipleLocations {
  variable: string;
  locations: VariableLocation[];
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
  // 각 변수별 저장 위치 설정 (하나의 파일에 여러 항목 저장)
  const variableLocations: VariableLocation[] = [
    { variable: 'V', fileName: '시험기록부', sheetName: '시험결과', column: 'D8', description: '시료량' },
    { variable: 'A', fileName: '시험기록부', sheetName: '시험결과', column: 'E8', description: 'Blank 적정량' },
    { variable: 'B', fileName: '시험기록부', sheetName: '시험결과', column: 'F8', description: '시료 적정량' },
    { variable: '1000/V', fileName: '시험기록부', sheetName: '시험결과', column: 'G8', description: '1000/V' },
    { variable: 'f', fileName: '시험기록부', sheetName: '시험결과', column: 'H8', description: '계산된 인자' },
    { variable: 'COD', fileName: '시험기록부', sheetName: '시험결과', column: 'C8', description: '최종 COD 결과' },
    { variable: 'COD', fileName: '시험기록부', sheetName: '시험결과', column: 'I8', description: '최종 COD 결과' },
    { variable: 'a', fileName: '시험기록부', sheetName: '시험기록부', column: 'C42', description: '인자 계산용 값 a' },
    { variable: 'b', fileName: '시험기록부', sheetName: '시험기록부', column: 'B42', description: '인자 계산용 값 b' },
    { variable: 'f', fileName: '시험기록부', sheetName: '시험기록부', column: 'G42', description: '계산된 인자 (수식)' },
  ];

  const [calculationData, setCalculationData] = useState<CODCalculationData>({
    sampleVolume: 0,
    sampleKMnO4Volume: 0,
    blankKMnO4Volume: 0,
    factorA: 0,
    factorB: 0,
  });

  const [selectedFiles, setSelectedFiles] = useState<{[key: string]: File}>({}); // 각 변수별 선택된 파일
  const [isElectron, setIsElectron] = useState<boolean>(false); // Electron 환경 여부

  // 클라이언트에서만 환경 감지
  useEffect(() => {
    setIsElectron(typeof window !== 'undefined' && !!(window as any).electronAPI);
  }, []);

  // 파일 선택 핸들러
  const handleFileSelect = (variable: string, file: File) => {
    setSelectedFiles(prev => ({
      ...prev,
      [variable]: file
    }));
  };

  // const [cellMappings, setCellMappings] = useState<CellMapping[]>([
  //   { variable: 'V', cellAddress: 'B2', description: '시료량' },
  //   { variable: 'A', cellAddress: 'B3', description: 'Blank 적정량' },
  //   { variable: 'B', cellAddress: 'B4', description: '시료 적정량' },
  //   { variable: 'a', cellAddress: 'B5', description: '인자 계산용 값 a' },
  //   { variable: 'b', cellAddress: 'B6', description: '인자 계산용 값 b' },
  //   { variable: 'f', cellAddress: 'B8', description: '계산된 인자' },
  //   { variable: 'COD', cellAddress: 'B10', description: '최종 COD 결과' }
  // ]);

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

  // 각 변수별 값을 가져오는 함수
  const getVariableValue = (variable: string): number => {
    switch(variable) {
      case 'V':
        return calculationData.sampleVolume;
      case 'A':
        return calculationData.sampleKMnO4Volume;
      case 'B':
        return calculationData.blankKMnO4Volume;
      case 'a':
        return calculationData.factorA;
      case 'b':
        return calculationData.factorB;
      case 'f':
        return calculationResult.calculationSteps.step2;
      case 'COD':
        return calculationResult.calculationSteps.step7;
      default:
        return 0;
    }
  };

  // Electron API를 사용한 파일 저장 함수
  const addDataToLocation = async (location: VariableLocation, value: number): Promise<void> => {
    try {
      // Electron 환경인지 확인
      if (isElectron) {
        // Electron 환경에서 직접 파일 시스템 접근
        const result = await (window as any).electronAPI.saveToExcel({
          variable: location.variable,
          value: value,
          location: location,
          selectedFilePath: selectedFiles[location.variable] ? await getFilePathFromFile(selectedFiles[location.variable]) : null
        });

        if (result.success) {
          console.log(`${location.variable} 데이터가 파일에 저장되었습니다: ${result.filePath} (행: ${result.row})`);
        } else {
          throw new Error(result.error);
        }
      } else {
        // 브라우저 환경에서는 기존 방식 사용
        let workbook: ExcelJS.Workbook;
        let worksheet: ExcelJS.Worksheet;

        if (selectedFiles[location.variable]) {
          const arrayBuffer = await selectedFiles[location.variable].arrayBuffer();
          workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(arrayBuffer);
          worksheet = workbook.getWorksheet(location.sheetName) || workbook.addWorksheet(location.sheetName);
        } else {
          workbook = new ExcelJS.Workbook();
          worksheet = workbook.addWorksheet(location.sheetName);
        }

        // 마지막 데이터 행 찾기
        let lastRow = 1;
        for (let row = 2; row <= worksheet.rowCount + 10; row++) {
          const cell = worksheet.getCell(`${location.column}${row}`);
          if (cell.value) {
            lastRow = row;
          } else {
            break;
          }
        }

        const nextRow = lastRow + 1;
        const cell = worksheet.getCell(`${location.column}${nextRow}`);
        cell.value = value;

        // 셀 스타일 적용
        cell.style = {
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
          font: {
            name: '굴림',
            size: 22
          },
        };

        if (location.variable === 'COD') {
          cell.style = {
            ...cell.style,
            font: { 
              name: '굴림',
              size: 22,
              bold: true, 
              color: { argb: 'FF0000' } 
            },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }
          };
        }

        // 파일 다운로드
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        const fileName = selectedFiles[location.variable] 
          ? selectedFiles[location.variable].name.replace('.xlsx', '') + '_수정.xlsx'
          : location.fileName;
        
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`${location.variable} 데이터 추가 오류:`, error);
      throw error;
    }
  };

  // File 객체에서 파일 경로 추출 (Electron 환경에서만 사용)
  const getFilePathFromFile = async (file: File): Promise<string | null> => {
    // 브라우저에서는 File 객체에서 실제 파일 경로를 얻을 수 없음
    // Electron에서는 다른 방식으로 처리해야 함
    return null;
  };

  // 모든 위치에 동시 전송하는 함수 (통합 저장)
  const exportToAllLocations = async () => {
    try {
      // 모든 변수 데이터와 위치 정보를 한번에 수집
      const allData = {
        'V': calculationData.sampleVolume,
        'A': calculationData.sampleKMnO4Volume,
        'B': calculationData.blankKMnO4Volume,
        'a': calculationData.factorA,
        'b': calculationData.factorB,
        '1000/V': calculationResult.calculationSteps.step5, // 1000/V 값 추가
        'f': calculationResult.calculationSteps.step2,
        'COD': calculationResult.calculationSteps.step7
      };

      // 위치 정보도 함께 전송
      const locationData = variableLocations.map(location => ({
        variable: location.variable,
        sheetName: location.sheetName,
        column: location.column,
        description: location.description
      }));

      if (isElectron) {
        // Electron 환경에서 통합 저장 (위치 정보 포함)
        const result = await (window as any).electronAPI.saveAllToExcel({ 
          allData, 
          locations: locationData 
        });
        
        if (result.success) {
          alert(`시험기록부 (COD) 파일에 모든 데이터가 성공적으로 전송되었습니다!\n파일: ${result.filePath}\n${result.message}`);
        } else {
          throw new Error(result.error);
        }
      } else {
        // 브라우저 환경에서는 기존 방식 사용
        const promises = variableLocations.map(location => {
          const value = getVariableValue(location.variable);
          return addDataToLocation(location, value);
        });

        await Promise.all(promises);
        alert(`시험기록부 (COD) 파일에 모든 데이터가 성공적으로 전송되었습니다!`);
      }
      
    } catch (error) {
      console.error('전송 오류:', error);
      alert('데이터 전송 중 오류가 발생했습니다: ' + error.message);
    }
  };

  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('COD 계산 결과');

      // 헤더 추가
      worksheet.getCell('A1').value = '항목';
      worksheet.getCell('B1').value = '값';
      worksheet.getCell('C1').value = '단위';

      // 데이터 입력
      const data = [
        ['시료량 (V)', calculationData.sampleVolume, 'mL'],
        ['Blank 적정량 (A)', calculationData.sampleKMnO4Volume, 'mL'],
        ['시료 적정량 (B)', calculationData.blankKMnO4Volume, 'mL'],
        ['인자 계산용 값 (a)', calculationData.factorA, ''],
        ['인자 계산용 값 (b)', calculationData.factorB, ''],
        ['계산된 인자 (f)', calculationResult.calculationSteps.step2, ''],
        ['COD 결과', calculationResult.calculationSteps.step7, 'mg/L']
      ];

      data.forEach((row, index) => {
        const rowNum = index + 2;
        worksheet.getCell(`A${rowNum}`).value = row[0];
        worksheet.getCell(`B${rowNum}`).value = row[1];
        worksheet.getCell(`C${rowNum}`).value = row[2];
        
        // COD 결과 강조
        if (row[0] === 'COD 결과') {
          worksheet.getCell(`B${rowNum}`).style = {
            font: { bold: true, color: { argb: 'FF0000' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }
          };
        }
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


  return (
    <div className="w-full mx-auto space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-center flex-1">CODₘₙ 자동 계산기</h3>
          <div className="flex gap-2">
            <button
              onClick={exportToAllLocations}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
              disabled={!calculationResult.isValid}
            >
              모든 위치 전송
            </button>
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

        {/* 데이터 저장 위치 정보 섹션 (하나의 파일에 여러 항목 저장) */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">데이터 저장 위치 정보</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-3">
              모든 데이터는 하나의 파일에 저장됩니다. 코드에서 직접 경로를 관리합니다:
            </div>
            <div className="bg-white p-4 rounded border">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-blue-600 text-lg">시험기록부(COD)</div>
                <div className="text-gray-700">통합 기록부</div>
              </div>
              <div className="text-xs text-gray-600 mb-3">
                📁 파일: <span className="font-mono">시험기록부(COD)(오늘날짜).xlsx</span>
                <br />
                {/* 📋 시트: <span className="font-mono">시험결과</span>
                <br /> */}
                📍 저장 경로: <span className="font-mono">\\samyang\homes\SAMYANG\Drive\SAMYANG\연구분석\공통분석실\데이터정리\Raw data\2025\수질\COD\9월</span>
                <br />
                📄 템플릿 파일: <span className="font-mono">\\samyang\homes\SAMYANG\Drive\SAMYANG\연구분석\공통분석실\데이터정리\Raw data\2025\수질\COD\시험기록부(COD).xlsx</span>
              </div>
              <div className="space-y-2">
                {variableLocations.map((location, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded border-l-4 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        {location.variable}
                      </div>
                      <div className="text-xs text-gray-500">
                        {location.description}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      📊 열: <span className="font-mono">{location.column}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <div className="bg-blue-50 p-3 rounded border">
                <div className="font-medium text-blue-800 mb-1">💡 저장 방식</div>
                <div className="text-blue-700">
                  • 모든 변수가 하나의 파일의 같은 행에 저장됩니다
                  <br />
                  • 파일이 없으면 템플릿 파일을 복사해서 사용하고, 있으면 기존 파일에 데이터를 추가합니다
                  <br />
                  • 템플릿 파일: `시험기록부(COD).xlsx` (상위 폴더에서 복사)
                  <br />
                  • 환경: {isElectron ? 
                    '🖥️ Electron 데스크톱 앱 - 네트워크 경로 직접 접근 가능' : 
                    '🌐 웹 브라우저 - 파일 다운로드 방식'
                  }
                </div>
              </div>
              
              {/* 네트워크 경로 확인 섹션 */}
              {/* <div className="bg-green-50 p-3 rounded border mt-3">
                <div className="font-medium text-green-800 mb-2">📁 저장 경로 정보</div>
                <div className="text-green-700 text-sm">
                  <div className="mb-2">
                    <strong>네트워크 경로:</strong>
                    <br />
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      \\samyang\homes\SAMYANG\Drive\SAMYANG\연구분석\공통분석실\데이터정리\Raw data\2025\수질\COD\9월
                    </code>
                  </div>
                  <div className="mb-2">
                    <strong>파일명:</strong>
                    <br />
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      시험기록부 (COD)(오늘날짜).xlsx
                    </code>
                  </div>
                  <div className="text-xs text-green-600">
                    💡 이 경로에 접근할 수 있는지 확인하려면 Windows 탐색기에서 위 경로를 복사해서 붙여넣어보세요.
                  </div>
                </div>
              </div> */}
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
