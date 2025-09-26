const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const ExcelJS = require('exceljs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 개발 모드에서는 Next.js 개발 서버 사용
  // 프로덕션에서는 빌드된 파일 사용
  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
  }

  // 개발 모드에서 DevTools 열기
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 통합 Excel 파일 저장 IPC 핸들러 (모든 데이터를 한번에)
ipcMain.handle('save-all-to-excel', async (event, { allData, locations }) => {
  try {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateSuffix = `${month}${day}`;
    
    // 네트워크 경로 설정
    const networkPath = '\\\\samyang\\homes\\SAMYANG\\Drive\\SAMYANG\\연구분석\\공통분석실\\데이터정리\\Raw data\\2025\\수질\\COD\\9월';
    const fileName = `시험기록부 (COD)${dateSuffix}.xlsx`;
    const filePath = path.join(networkPath, fileName);
    
    // 템플릿 파일 경로 설정
    const templatePath = '\\\\samyang\\homes\\SAMYANG\\Drive\\SAMYANG\\연구분석\\공통분석실\\데이터정리\\Raw data\\2025\\수질\\COD';
    const templateFileName = '시험기록부(COD).xlsx';
    const templateFilePath = path.join(templatePath, templateFileName);
    
    // 네트워크 경로가 없으면 생성
    try {
      await fs.mkdir(networkPath, { recursive: true });
    } catch (error) {
      console.log('네트워크 경로 생성 실패:', error.message);
    }
    
    // 파일이 존재하지 않으면 템플릿 파일에서 복사
    try {
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log('파일이 존재하지 않습니다. 템플릿 파일을 복사합니다...');
        
        const templateExists = await fs.access(templateFilePath).then(() => true).catch(() => false);
        
        if (templateExists) {
          await fs.copyFile(templateFilePath, filePath);
          console.log(`템플릿 파일이 복사되었습니다: ${filePath}`);
        } else {
          console.log('템플릿 파일을 찾을 수 없습니다. 새 파일을 생성합니다.');
        }
      } else {
        console.log('기존 파일이 존재합니다. 형식 변경을 위해 새로 생성합니다.');
        // 기존 파일 삭제
        try {
          await fs.unlink(filePath);
          console.log('기존 파일이 삭제되었습니다.');
          
          // 템플릿에서 다시 복사
          const templateExists = await fs.access(templateFilePath).then(() => true).catch(() => false);
          
          if (templateExists) {
            await fs.copyFile(templateFilePath, filePath);
            console.log(`템플릿 파일이 복사되었습니다: ${filePath}`);
          } else {
            console.log('템플릿 파일을 찾을 수 없습니다. 새 파일을 생성합니다.');
          }
        } catch (deleteError) {
          console.log('파일 삭제 실패, 기존 파일 사용:', deleteError.message);
        }
      }
    } catch (error) {
      console.log('파일 존재 확인 중 오류:', error.message);
    }
    
    // 파일 읽기
    let workbook = new ExcelJS.Workbook();
    
    try {
      await workbook.xlsx.readFile(filePath);
    } catch (error) {
      console.log('파일 읽기 실패, 새 워크북 생성:', error.message);
    }
    
     // 시험결과 시트의 8행부터 연속적으로 데이터가 있는 행의 개수 세기
     const testResultSheet = workbook.getWorksheet('시험결과') || workbook.addWorksheet('시험결과');
     
    let dataCount = 0; // 8행부터 연속으로 있는 데이터 개수

// 8행부터 연속적으로 데이터가 있는 행의 개수 세기
for (let row = 8; row <= testResultSheet.rowCount + 10; row++) {
  let hasData = false;
  // 시험결과 시트의 핵심 데이터 열만 확인 (D, E, F - 실제 수치 데이터)
  const columns = ['D', 'E', 'F'];
  for (const col of columns) {
    const cell = testResultSheet.getCell(`${col}${row}`);
    if (cell.value && typeof cell.value === 'number') {
      hasData = true;
      break;
    }
  }
  
  if (hasData) {
    dataCount++; // 데이터가 있는 행이면 카운트 증가
  } else {
    break; // 데이터가 없는 행을 만나면 중단
  }
}

const nextRow = 8 + dataCount; // 8행부터 시작해서 dataCount만큼 더한 행
console.log(`8행부터 연속 데이터 개수: ${dataCount}개, 새로운 데이터를 ${nextRow}행에 추가합니다.`);
    
    // 각 위치별로 데이터 저장
    for (const location of locations) {
      const value = allData[location.variable];
      if (value !== undefined) {
        // 워크시트 가져오기 또는 생성
        let worksheet = workbook.getWorksheet(location.sheetName);
        if (!worksheet) {
          worksheet = workbook.addWorksheet(location.sheetName);
        }
        
        // 셀 위치 결정
        let cellAddress;
        if (location.sheetName === '시험결과') {
          // 시험결과 시트는 행을 동적으로 계산
          const column = location.column.replace(/\d+/, ''); // 숫자 제거하여 열만 추출
          cellAddress = `${column}${nextRow}`;
        } else {
          // 시험기록부 시트는 고정 위치 사용
          cellAddress = location.column;
        }
        
        const cell = worksheet.getCell(cellAddress);
        
        // f 값은 계산된 숫자로 저장 (시험기록부 시트에서도) + 표시 4자리
        if (location.variable === 'f' && location.sheetName === '시험기록부') {
          // f = 10/(b-a) 계산된 값으로 저장
          const bValue = allData['b'] || 0;
          const aValue = allData['a'] || 0;
          const calculatedF = bValue - aValue !== 0 ? 10 / (bValue - aValue) : 0;
          const roundedF = Math.round(calculatedF * 10000) / 10000; // 소수점 네자리
          cell.value = roundedF;
          cell.numFmt = '0.0000'; // f는 소수점 네자리
          console.log(`시험기록부 f (${cellAddress}): 계산된 값으로 저장 - ${calculatedF} → ${roundedF}`);
        } else {
          // 값 자체를 반올림해서 저장 (소수점 자릿수 보장)
          let roundedValue = value;
          if (typeof value === 'number') {
            if (location.variable === 'f' && location.sheetName === '시험결과') {
              roundedValue = Math.round(value * 10000) / 10000; // 소수점 네자리
              cell.numFmt = '0.0000'; // 표시 형식도 네자리로 고정
              console.log(`시험결과 f (${cellAddress}): 소수점 네자리로 반올림 - ${value} → ${roundedValue}`);
            } else if (location.variable === 'COD' && location.sheetName === '시험결과' && location.column.startsWith('I')) {
              roundedValue = Math.round(value * 100) / 100; // 소수점 두자리
              cell.numFmt = '0.00'; // 표시 형식도 두자리로 고정
              console.log(`I열 COD (${cellAddress}): 소수점 두자리로 반올림 - ${value} → ${roundedValue}`);
            } else if (location.variable === 'COD' && location.sheetName === '시험결과' && location.column.startsWith('C')) {
              roundedValue = Math.round(value * 10) / 10; // 소수점 한자리
              cell.numFmt = '0.0'; // 표시 형식도 한자리로 고정
              console.log(`C열 COD (${cellAddress}): 소수점 한자리로 반올림 - ${value} → ${roundedValue}`);
            } else if (location.variable === 'A' || location.variable === 'B' || location.variable === 'V') {
              roundedValue = Math.round(value * 100) / 100; // 소수점 두자리
              cell.numFmt = '0.00'; // 표시 형식도 두자리로 고정
              console.log(`${location.variable} (${cellAddress}): 소수점 두자리로 반올림 - ${value} → ${roundedValue}`);
            } else if (location.variable === 'a' || location.variable === 'b') {
              // a, b 값은 입력된 값 그대로 저장 (반올림하지 않음)
              roundedValue = value;
              // 정수인지 소수인지에 따라 형식 결정
              if (Number.isInteger(value)) {
                cell.numFmt = '0'; // 정수 형식
                console.log(`${location.variable} (${cellAddress}): 정수 그대로 저장 - ${value}`);
              } else {
                cell.numFmt = '0.00'; // 소수점 두자리 형식
                console.log(`${location.variable} (${cellAddress}): 소수 그대로 저장 - ${value}`);
              }
            } else {
              roundedValue = Math.round(value); // 정수
              cell.numFmt = '0'; // 정수 형식
              console.log(`${location.variable} (${cellAddress}): 정수로 반올림 - ${value} → ${roundedValue}`);
            }
          }
          cell.value = roundedValue;
        }
        
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
          }
        };
        
        // COD 결과 강조 (시험결과 시트의 C8, I8)
        if (location.variable === 'COD' && location.sheetName === '시험결과') {
          // 배경색 제거, 폰트 색상 일반으로, 굵기 일반으로
          cell.style = {
            ...cell.style,
            font: { 
              name: '굴림',
              size: 22,
              bold: true,  // 굵기 일반으로 변경
              color: { argb: 'FF000000' }  // 검은색으로 변경
            }
            // fill 제거 (배경색 없음)
          };
        }
        
        console.log(`${location.variable} 데이터 저장: ${location.sheetName}!${cellAddress} = ${location.variable === 'f' && location.sheetName === '시험기록부' ? '수식: =10/(B42-C42)' : value}`);
      }
    }
    
    // 파일 저장 시도 (재시도 로직 포함)
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        await workbook.xlsx.writeFile(filePath);
        console.log(`모든 데이터가 성공적으로 저장되었습니다: ${filePath}`);
        return { success: true, filePath, message: '모든 데이터가 지정된 위치에 저장되었습니다' };
      } catch (error) {
        retryCount++;
        if (error.code === 'EBUSY' && retryCount < maxRetries) {
          console.log(`파일이 잠겨있습니다. ${retryCount}번째 재시도...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('통합 파일 저장 오류:', error);
    return { success: false, error: error.message };
  }
});

// 파일 저장 IPC 핸들러 (단일 변수 - 호환성 유지)
ipcMain.handle('save-to-excel', async (event, { variable, value, location, selectedFilePath }) => {
  try {
    let workbook = new ExcelJS.Workbook();
    let worksheet;

    if (selectedFilePath) {
      // 기존 파일 읽기
      await workbook.xlsx.readFile(selectedFilePath);
      worksheet = workbook.getWorksheet(location.sheetName) || workbook.addWorksheet(location.sheetName);
    } else {
      // 새 파일 생성
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
      alignment: { horizontal: 'center', vertical: 'middle' }
    };

    // COD 결과 강조
    if (variable === 'COD') {
      cell.style = {
        ...cell.style,
        font: { bold: true, color: { argb: 'FF0000' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }
      };
    }

    // 파일 저장 (네트워크 경로 사용)
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateSuffix = `${month}${day}`;
    
    // 네트워크 경로 설정
    const networkPath = '\\\\samyang\\homes\\SAMYANG\\Drive\\SAMYANG\\연구분석\\공통분석실\\데이터정리\\Raw data\\2025\\수질\\COD\\9월';
    const fileName = `시험기록부 (COD)${dateSuffix}.xlsx`;
    const filePath = path.join(networkPath, fileName);
    
    // 템플릿 파일 경로 설정
    const templatePath = '\\\\samyang\\homes\\SAMYANG\\Drive\\SAMYANG\\연구분석\\공통분석실\\데이터정리\\Raw data\\2025\\수질\\COD';
    const templateFileName = '시험기록부(COD).xlsx';
    const templateFilePath = path.join(templatePath, templateFileName);
    
    // 네트워크 경로가 없으면 생성 (권한이 있는 경우)
    try {
      await fs.mkdir(networkPath, { recursive: true });
    } catch (error) {
      console.log('네트워크 경로 생성 실패 (권한 부족 가능):', error.message);
    }
    
    // 파일이 존재하지 않으면 템플릿 파일에서 복사
    try {
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log('파일이 존재하지 않습니다. 템플릿 파일을 복사합니다...');
        
        // 템플릿 파일 존재 확인
        const templateExists = await fs.access(templateFilePath).then(() => true).catch(() => false);
        
        if (templateExists) {
          // 템플릿 파일을 새 파일로 복사
          await fs.copyFile(templateFilePath, filePath);
          console.log(`템플릿 파일이 복사되었습니다: ${filePath}`);
        } else {
          console.log('템플릿 파일을 찾을 수 없습니다. 새 파일을 생성합니다.');
        }
      } else {
        console.log('기존 파일이 존재합니다. 데이터를 추가합니다.');
      }
    } catch (error) {
      console.log('파일 존재 확인 중 오류:', error.message);
    }
    
    // 파일 저장 시도 (재시도 로직 포함)
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        await workbook.xlsx.writeFile(filePath);
        return { success: true, filePath, row: nextRow };
      } catch (error) {
        retryCount++;
        if (error.code === 'EBUSY' && retryCount < maxRetries) {
          console.log(`파일이 잠겨있습니다. ${retryCount}번째 재시도...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('파일 저장 오류:', error);
    return { success: false, error: error.message };
  }
});

// 파일 선택 IPC 핸들러
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Excel Files', extensions: ['xlsx', 'xls'] }
    ]
  });
  
  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});

// 파일 저장 위치 선택 IPC 핸들러
ipcMain.handle('save-file-dialog', async (event, { suggestedName }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: suggestedName,
    filters: [
      { name: 'Excel Files', extensions: ['xlsx'] }
    ]
  });
  
  if (!result.canceled) {
    return result.filePath;
  }
  return null;
});

