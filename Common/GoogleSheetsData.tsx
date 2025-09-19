import { useState, useEffect, useCallback } from 'react';

interface GoogleSheetsDataProps {
  spreadsheetId: string;
  range: string;
  apiKey: string;
  onDataLoaded?: (data: any[][]) => void;
}

export default function GoogleSheetsData({ 
  spreadsheetId, 
  range, 
  apiKey, 
  onDataLoaded 
}: GoogleSheetsDataProps) {
  const [data, setData] = useState<any[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  const fetchDataWithRetry = useCallback(async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      // 요청 간격 제한 (최소 1초 간격)
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < 1000 && retryCount === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLastRequest));
      }
      
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );
      
      setLastRequestTime(Date.now());
      
      if (!response.ok) {
        // 429 에러 (Too Many Requests) 처리
        if (response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000; // 지수 백오프: 1초, 2초, 4초
          console.log(`API 요청 한도 초과. ${delay}ms 후 재시도... (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchDataWithRetry(retryCount + 1);
        }
        
        throw new Error(`HTTP ERROR! status: ${response.status}`);
      }
      
      const result = await response.json();
      const sheetData = result.values || [];
      
      setData(sheetData);
      onDataLoaded?.(sheetData);
    } catch (err) {
      if (err instanceof Error && err.message.includes('429')) {
        setError('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      }
      console.error('Google Sheets API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [spreadsheetId, range, apiKey, onDataLoaded, lastRequestTime]);

  useEffect(() => {
    if (spreadsheetId && range && apiKey) {
      fetchDataWithRetry();
    }
  }, [spreadsheetId, range, apiKey, fetchDataWithRetry]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">구글시트 데이터 로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">데이터 로딩 실패</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {data[0] && (
            <tr>
              {data[0].map((header: string, index: number) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(1).map((row: any[], rowIndex: number) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
