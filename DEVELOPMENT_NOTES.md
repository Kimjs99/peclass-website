# 체육 수업 연구소 웹사이트 개발노트

## 📋 프로젝트 개요

**프로젝트명**: 체육 수업 연구소 (Physical Education Lab)  
**개발 기간**: 2025년 1월  
**기술 스택**: Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI  
**목표**: 체육 교육을 위한 종합적인 웹 애플리케이션 개발

## 🎯 주요 기능 요구사항

### 1. 수업 스케줄 관리 시스템
- **월간 캘린더**: 직관적인 날짜 선택과 스케줄 확인
- **CRUD 기능**: 스케줄 추가, 편집, 삭제, 조회
- **타입별 분류**: 수업, 행사, 회의로 구분
- **로컬 저장**: 브라우저에 데이터 영구 저장

### 2. 프로그램 둘러보기
- **사이트 맵**: 전체 웹사이트 구조 안내
- **서비스 상세**: 6가지 체육 프로그램 소개
- **이용 가이드**: 4단계 사용 방법 안내
- **연락처 정보**: 다양한 문의 방법 제공

### 3. 사용자 경험 개선
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **직관적 네비게이션**: 상단 메뉴로 쉬운 페이지 이동
- **현대적 UI**: Tailwind CSS와 Radix UI 기반

## 🛠️ 기술적 구현 과정

### Phase 1: 프로젝트 초기 설정
```bash
# Next.js 프로젝트 생성
npx create-next-app@latest my-awesome-peclass --typescript --tailwind --eslint --app

# 필요한 의존성 설치
npm install react-day-picker date-fns lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-select
```

**주요 파일 구조**:
```
my-awesome-peclass/
├── app/                    # Next.js 앱 라우터
│   ├── calendar/          # 캘린더 페이지
│   ├── programs/          # 프로그램 둘러보기 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── calendar.tsx      # 캘린더 컴포넌트
│   ├── schedule-modal.tsx # 스케줄 모달
│   └── navigation.tsx    # 네비게이션
└── public/               # 정적 파일
```

### Phase 2: 캘린더 기능 구현

#### 2.1 캘린더 컴포넌트 개발
```typescript
// components/calendar.tsx
"use client"

import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// 스케줄 데이터 타입 정의
interface Schedule {
  id: string
  title: string
  description: string
  time: string
  type: "class" | "event" | "meeting"
}
```

**주요 기능**:
- `react-day-picker`를 사용한 월간 캘린더
- 한국어 로케일 지원 (`date-fns/locale`)
- 스케줄 데이터 상태 관리 (`useState`, `useEffect`)
- 로컬 스토리지 연동

#### 2.2 스케줄 모달 컴포넌트
```typescript
// components/schedule-modal.tsx
interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onAddSchedule: (schedule: Omit<Schedule, "id">) => void
  onEditSchedule: (id: string, schedule: Omit<Schedule, "id">) => void
  editingSchedule: Schedule | null
}
```

**주요 기능**:
- 폼 검증 (제목, 시간 필수 입력)
- 타입 선택 (수업, 행사, 회의)
- 실시간 미리보기
- 반응형 디자인

### Phase 3: 네비게이션 및 페이지 구성

#### 3.1 전역 네비게이션
```typescript
// components/navigation.tsx
export function Navigation() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">체육 수업 연구소</span>
          </Link>
          {/* 네비게이션 메뉴 */}
        </div>
      </div>
    </nav>
  )
}
```

#### 3.2 프로그램 둘러보기 페이지
```typescript
// components/site-guide.tsx
const navigationItems = [
  {
    title: "홈페이지",
    description: "체육 수업 연구소의 메인 페이지",
    icon: Home,
    href: "/",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    features: ["소개", "서비스 개요", "연락처"]
  },
  // ... 더 많은 항목들
]
```

### Phase 4: 데이터 관리 및 상태 관리

#### 4.1 로컬 스토리지 연동
```typescript
// 스케줄을 로컬 스토리지에 저장
const saveSchedules = (newSchedules: Record<string, Schedule[]>) => {
  setSchedules(newSchedules)
  localStorage.setItem("peclass-schedules", JSON.stringify(newSchedules))
}

// 로컬 스토리지에서 스케줄 로드
useEffect(() => {
  const savedSchedules = localStorage.getItem("peclass-schedules")
  if (savedSchedules) {
    try {
      setSchedules(JSON.parse(savedSchedules))
    } catch (error) {
      console.error("Failed to load schedules from localStorage:", error)
    }
  }
}, [])
```

#### 4.2 CRUD 기능 구현
```typescript
// 스케줄 추가
const handleAddSchedule = (scheduleData: Omit<Schedule, "id">) => {
  if (!selectedDate) return

  const dateString = format(selectedDate, "yyyy-MM-dd")
  const newSchedule: Schedule = {
    ...scheduleData,
    id: Date.now().toString()
  }

  const newSchedules = {
    ...schedules,
    [dateString]: [...(schedules[dateString] || []), newSchedule]
  }

  saveSchedules(newSchedules)
}
```

## 🐛 발생한 문제 및 해결 과정

### 문제 1: react-day-picker 모듈 해결 불가
**오류**: `Module not found: Can't resolve 'react-day-picker'`

**원인**: 
- `package.json`에 의존성이 추가되었지만 실제 설치되지 않음
- npm 의존성 충돌 (React 19와 vaul 패키지 간 peer dependency 충돌)

**해결 방법**:
```bash
# 의존성 충돌 해결을 위해 legacy-peer-deps 플래그 사용
npm install --legacy-peer-deps

# 캐시 정리 후 재설치
rm -rf .next
npm run dev
```

### 문제 2: 아이콘 import 오류
**오류**: `ReferenceError: BookOpen is not defined`

**원인**: 
- `lucide-react`에서 아이콘을 import하지 않음

**해결 방법**:
```typescript
// 올바른 import 추가
import { BookOpen, Home, Calendar, Users, Trophy, Target, MessageSquare, ArrowRight, GraduationCap, Heart, Brain, Activity, FileText, Video, Phone, Mail } from "lucide-react"
```

### 문제 3: date-fns 로케일 오류
**오류**: `Cannot read properties of undefined (reading 'preprocessor')`

**원인**: 
- `date-fns`의 `ko` 로케일을 잘못된 방식으로 사용

**해결 방법**:
```typescript
// 올바른 로케일 import 및 사용
import { ko } from "date-fns/locale"

// 사용 시
{format(selectedDate, "yyyy년 M월 d일", { locale: ko })}
```

## 📊 성능 최적화

### 1. 컴포넌트 최적화
- **React.memo**: 불필요한 리렌더링 방지
- **useCallback**: 함수 메모이제이션
- **useMemo**: 계산 결과 메모이제이션

### 2. 번들 크기 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Dynamic Import**: 필요시에만 컴포넌트 로드
- **이미지 최적화**: Next.js Image 컴포넌트 사용

### 3. 로딩 성능
- **SSR/SSG**: 서버 사이드 렌더링 활용
- **Code Splitting**: 페이지별 코드 분할
- **Lazy Loading**: 지연 로딩 구현

## 🎨 UI/UX 디자인 결정사항

### 1. 디자인 시스템
- **색상 팔레트**: 
  - Primary: 파란색 계열 (신뢰감)
  - Secondary: 초록색 계열 (성장, 건강)
  - Accent: 보라색 계열 (창의성)
- **타이포그래피**: Geist 폰트 사용
- **간격**: 4px 기준 그리드 시스템

### 2. 반응형 디자인
```css
/* 모바일 우선 접근법 */
.container {
  @apply px-4 sm:px-6 lg:px-8;
}

/* 브레이크포인트 */
sm: 640px   /* 태블릿 */
md: 768px   /* 작은 데스크톱 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 큰 데스크톱 */
```

### 3. 접근성 (Accessibility)
- **키보드 네비게이션**: 모든 인터랙티브 요소 접근 가능
- **스크린 리더**: 적절한 ARIA 라벨
- **색상 대비**: WCAG 2.1 AA 기준 준수

## 🔧 개발 도구 및 워크플로우

### 1. 개발 환경
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 2. 코드 품질 관리
- **ESLint**: 코드 스타일 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안정성

### 3. 버전 관리
```bash
# Git 워크플로우
git init
git add .
git commit -m "Initial commit: 체육 수업 연구소 웹사이트"
git remote add origin https://github.com/Kimjs99/peclass-website.git
git push -u origin main
```

## 📈 향후 개선 계획

### 1. 기능 확장
- **사용자 인증**: 로그인/회원가입 시스템
- **데이터베이스**: 서버 사이드 데이터 저장
- **실시간 업데이트**: WebSocket을 통한 실시간 동기화
- **알림 시스템**: 스케줄 알림 기능

### 2. 성능 개선
- **PWA**: Progressive Web App 기능
- **오프라인 지원**: Service Worker 구현
- **캐싱 전략**: 효율적인 데이터 캐싱

### 3. 사용자 경험
- **다크 모드**: 테마 전환 기능
- **다국어 지원**: i18n 구현
- **애니메이션**: 부드러운 전환 효과

## 📝 학습한 내용

### 1. Next.js 15 App Router
- **서버 컴포넌트 vs 클라이언트 컴포넌트**
- **동적 라우팅**: `[slug]` 패턴
- **메타데이터 관리**: `generateMetadata` 함수

### 2. React 19 새로운 기능
- **Concurrent Features**: 자동 배치 업데이트
- **Suspense 개선**: 더 나은 로딩 상태 관리
- **Hooks 최적화**: `use` 훅 도입

### 3. TypeScript 고급 패턴
- **Generic Types**: 재사용 가능한 타입 정의
- **Utility Types**: `Omit`, `Pick`, `Partial` 활용
- **Interface vs Type**: 적절한 사용 시점

### 4. 상태 관리 패턴
- **Local State**: `useState`, `useReducer`
- **Global State**: Context API 활용
- **Server State**: SWR, React Query 고려

## 🎯 프로젝트 성과

### 1. 기술적 성과
- ✅ Next.js 15 최신 기능 활용
- ✅ TypeScript로 타입 안정성 확보
- ✅ 반응형 디자인 구현
- ✅ 접근성 기준 준수

### 2. 사용자 경험
- ✅ 직관적인 캘린더 인터페이스
- ✅ 완전한 CRUD 기능
- ✅ 로컬 데이터 저장
- ✅ 모바일 친화적 디자인

### 3. 코드 품질
- ✅ 컴포넌트 재사용성
- ✅ 타입 안정성
- ✅ 에러 처리
- ✅ 성능 최적화

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Radix UI 문서](https://www.radix-ui.com)
- [date-fns 문서](https://date-fns.org)
- [react-day-picker 문서](https://react-day-picker.js.org)

---

**개발자**: Kimjs99  
**완료일**: 2025년 1월  
**저장소**: https://github.com/Kimjs99/peclass-website
