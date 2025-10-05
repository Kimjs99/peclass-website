# 체육 수업 연구소 (Physical Education Lab)

체육 교육을 위한 종합적인 웹 애플리케이션입니다. 수업 스케줄 관리, 프로그램 안내, 그리고 체계적인 체육 교육 서비스를 제공합니다.

## 🚀 주요 기능

### 📅 수업 스케줄 관리
- **월간 캘린더**: 직관적인 날짜 선택과 스케줄 확인
- **스케줄 추가/편집/삭제**: 완전한 CRUD 기능
- **타입별 분류**: 수업, 행사, 회의로 구분
- **로컬 저장**: 브라우저에 데이터 영구 저장

### 🎯 프로그램 둘러보기
- **사이트 맵**: 전체 웹사이트 구조 안내
- **서비스 상세**: 6가지 체육 프로그램 소개
- **이용 가이드**: 4단계 사용 방법 안내
- **연락처 정보**: 다양한 문의 방법 제공

### 🎨 사용자 경험
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **직관적 네비게이션**: 상단 메뉴로 쉬운 페이지 이동
- **현대적 UI**: Tailwind CSS와 Radix UI 기반

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Calendar**: react-day-picker
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📦 설치 및 실행

### 1. 저장소 클론
\`\`\`bash
git clone https://github.com/your-username/peclass-website.git
cd peclass-website
\`\`\`

### 2. 의존성 설치
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 3. 개발 서버 실행
\`\`\`bash
npm run dev
\`\`\`

### 4. 브라우저에서 확인
[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 📱 페이지 구성

- **홈페이지** (`/`): 메인 소개 및 서비스 개요
- **수업 스케줄** (`/calendar`): 캘린더 기반 일정 관리
- **프로그램 둘러보기** (`/programs`): 사이트 가이드 및 서비스 안내

## 🎨 주요 컴포넌트

- **Navigation**: 상단 네비게이션 바
- **Calendar**: 월간 캘린더 및 스케줄 관리
- **ScheduleModal**: 스케줄 추가/편집 모달
- **SiteGuide**: 프로그램 둘러보기 가이드

## 📊 스케줄 관리 기능

### 스케줄 추가
1. 캘린더에서 원하는 날짜 선택
2. "스케줄 추가" 버튼 클릭
3. 제목, 시간, 타입, 설명 입력
4. "추가" 버튼으로 저장

### 스케줄 편집/삭제
- 스케줄에 마우스 올리기
- 편집(연필) 또는 삭제(휴지통) 버튼 클릭

## 🔧 개발 명령어

\`\`\`bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
\`\`\`

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 연락처

- **이메일**: contact@peclass-lab.com
- **웹사이트**: [https://peclass-lab.com](https://peclass-lab.com)

---

**체육 수업 연구소** - 창의성, 문화, 성장을 위한 헌신