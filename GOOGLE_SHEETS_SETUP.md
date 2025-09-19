# Google Sheets API 설정 가이드

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 이름: "Water Quality Analysis" (또는 원하는 이름)

### 1.2 Google Sheets API 활성화
1. 좌측 메뉴에서 "API 및 서비스" > "라이브러리" 클릭
2. "Google Sheets API" 검색
3. "Google Sheets API" 클릭 후 "사용" 버튼 클릭

### 1.3 API 키 생성
1. 좌측 메뉴에서 "API 및 서비스" > "사용자 인증 정보" 클릭
2. "사용자 인증 정보 만들기" > "API 키" 클릭
3. 생성된 API 키 복사 (AIzaSyB... 형태)

## 2. 구글시트 공유 설정

### 2.1 시트 공유
1. 구글시트 열기
2. 우측 상단 "공유" 버튼 클릭
3. "링크가 있는 모든 사용자" 선택
4. 권한을 "뷰어"로 설정

### 2.2 스프레드시트 ID 확인
구글시트 URL에서 스프레드시트 ID 추출:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
                                 ↑ 이 부분이 스프레드시트 ID
```

## 3. 애플리케이션에서 사용

### 3.1 환경변수 설정
`.env.local` 파일 생성:
```env
GOOGLE_SHEETS_API_KEY=AIzaSyB...
GOOGLE_SHEETS_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SHEETS_RANGE=A1:Z1000
```

### 3.2 사용 방법
1. 애플리케이션에서 "구글시트 불러오기" 버튼 클릭
2. 스프레드시트 ID 입력
3. 데이터 범위 입력 (예: A1:Z1000)
4. API 키 입력
5. "데이터 불러오기" 버튼 클릭

## 4. 데이터 형식 예시

구글시트 데이터는 다음과 같은 형식으로 구성되어야 합니다:

| 항목 | 단위 | 기준값 | 측정값 | 비고 |
|------|------|--------|--------|------|
| COD  | mg/L | 10     | 8.5    | 양호 |
| BOD  | mg/L | 5      | 3.2    | 양호 |
| SS   | mg/L | 20     | 15.8   | 양호 |

## 5. 보안 주의사항

- API 키는 절대 공개 저장소에 커밋하지 마세요
- 프로덕션 환경에서는 OAuth 2.0 인증을 사용하는 것을 권장합니다
- API 키 사용량 제한을 설정하세요

## 6. 문제 해결

### 6.1 CORS 오류
- Google Sheets API는 CORS를 지원하므로 브라우저에서 직접 호출 가능합니다

### 6.2 권한 오류
- 구글시트가 공개로 설정되어 있는지 확인하세요
- API 키가 올바른지 확인하세요

### 6.3 데이터 형식 오류
- 첫 번째 행은 헤더로 사용됩니다
- 빈 셀이 있으면 빈 문자열로 처리됩니다
