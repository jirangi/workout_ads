# 📑 Minimal Fit v1.42 PRD (상세 설계서)

## 1. 제품 개요 (Product Overview)
* **제품명**: Minimal Fit (미니멀 핏)
* **한 줄 정의**: AI 박자 가이드와 자동 동기화 로직을 통해 운동 중 조작을 0에 수렴하게 만드는 지능형 운동 보조 플랫폼.
* **핵심 목표**: 시장 조사부터 출시까지 이어지는 AI 자동화 파이프라인의 표준 모델 확립.

## 2. 타겟 유저 (Target Audience)
* **All Levels**: 자신의 숙련도에 맞는 체계적인 분할 운동 루틴을 적용하고 싶은 모든 사용자.
* **Mobile First**: 중앙 집중형 레이아웃과 큰 터치 타겟을 선호하는 유저.

## 3. 기능 상세 정의 (Feature Specifications)

### [핵심 엔진 및 로직]
* **[F1] Zero-Click 세트 동기화 (Set Sync)**: 
    - **로직**: '1세트' 수정 시 `isEdited: false`인 모든 후속 세트에 데이터 즉시 전파.
    - **Override 방지**: 사용자가 직접 수정한 세트(`isEdited: true`)는 동기화에서 제외.
* **[F2] 1초 단위 AI 박자 가이드 (Tempo Engine)**: Web Speech API 활용, 1초 간격 한국어 음성 카운트 및 배경 애니메이션 제공.
* **[F3] 빅 스텝퍼 UI (Interaction)**: 모든 핵심 UI는 화면 정중앙 배치(`flex items-center justify-center`)하여 모바일 접근성 극대화.

### [사용자 경험 및 확장]
* **[F13] 휴식 모드 (Rest UI)**: 세트 완료 시 자동 휴식 타이머(60s) 진입 및 다크 모드 전체 화면 오버레이 적용.
* **[F14] 2단계 루틴 선택 시스템 [v1.42 업데이트]**: 
    - **Step 1**: 숙련도 선택 (초급 / 중급 / 고급).
    - **Step 2**: 루틴 유형 선택 (추천루틴 / 무분할 / 2분할).
* **[F15] 운동 메타데이터 DB 분리 관리**: 상세 종목 데이터를 `data/exercises.ts`에서 독립적으로 관리.

### [인프라 및 자동화]
* **[F6] 배포 파이프라인 안정화**: GitHub Pages 404 방지를 위한 `basePath` 및 `.nojekyll` 설정 완료.
* **[F8] AI 주도적 무결성 검증**: 업데이트 전 저장소 상태 분석 및 테스트 수행.

## 4. 데이터 및 시스템 설계 (System Design)
* **프론트엔드**: Next.js (App Router) 기반 반응형 웹/앱 레이아웃.
* **파일 아키텍처**: 
    - `app/page.tsx`: 메인 비즈니스 로직 및 2단계 선택 UI.
    - `data/exercises.ts`: 운동 메타데이터 DB.
* **배포 정책**: `output: 'export'` 및 `basePath: '/workout_ads'` 적용.

## 5. AI 자동화 파이프라인 적용 (Automation Pipeline)
* **Step 1~4**: 기획-검증-개발-배포 프로세스 준수 및 자동화.

## 6. 수익화 및 확장 계획 (Monetization)
* **광고/구독**: 휴식 시간 전면 광고 송출 및 프리미엄 구독 등급 운영.

## 7. 문서 관리 및 버전 관리 정책
* **버전 체계**: Semantic Versioning 적용.
* **PRD 제공 방식 [필수]**: 변경 시 항상 **본 문서와 같은 전문(Full Text)**을 코드 블록 내에 작성하여 제공함.
* **커밋 메시지 표준**: `커밋명 [ver] 제목 / 내용 [commit 주요 내용]` (줄바꿈 준수)
