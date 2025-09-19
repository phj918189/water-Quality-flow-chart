import { useState } from 'react';
import GoogleSheetsData from './GoogleSheetsData';

interface GoogleSheetsConfigProps {
  onDataLoaded?: (data: any[][]) => void;
}

export default function GoogleSheetsConfig({ onDataLoaded }: GoogleSheetsConfigProps) {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [range, setRange] = useState('A1:Z1000');
  const [apiKey, setApiKey] = useState('');
  const [showData, setShowData] = useState(false);

  const handleLoadData = () => {
    if (spreadsheetId && apiKey) {
      setShowData(true);
    } else {
      alert('스프레드시트 ID와 API 키를 입력해주세요.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">구글시트 데이터 불러오기</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스프레드시트 ID
          </label>
          <input
            type="text"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            구글시트 URL에서 /d/ 다음의 긴 문자열입니다.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            범위 (Range)
          </label>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="A1:Z1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            불러올 데이터 범위를 지정합니다. (예: A1:Z1000, Sheet1!A1:C10)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API 키
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSyB..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Google Cloud Console에서 생성한 API 키입니다.
          </p>
        </div>

        <button
          onClick={handleLoadData}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          데이터 불러오기
        </button>
      </div>

      {showData && spreadsheetId && apiKey && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-3">구글시트 데이터</h4>
          <GoogleSheetsData
            spreadsheetId={spreadsheetId}
            range={range}
            apiKey={apiKey}
            onDataLoaded={onDataLoaded}
          />
        </div>
      )}
    </div>
  );
}
