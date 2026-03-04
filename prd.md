# 📑 Minimal Fit v1.41 PRD (상세 설계서)

## 1. 제품 개요 (Product Overview)
* **제품명**: Minimal Fit (미니멀 핏)
* **한 줄 정의**: AI 박자 가이드와 자동 동기화 로직을 통해 운동 중 조작을 0에 수렴하게 만드는 지능형 운동 보조 플랫폼.
* **핵심 목표**: 시장 조사부터 출시까지 이어지는 AI 자동화 파이프라인의 표준 모델 확립.

## 2. 타겟 유저 (Target Audience)
* **Heavy User**: 기존 앱의 반복적인 세트 입력에 피로감을 느끼는 중급 이상의 웨이트 트레이너.
* **Tempo Seeker**: 정확한 박자와 템포 유지가 실력 향상에 직결되는 사용자.
* **Zero-Click User**: 운동 중 무게와 횟수를 일일이 입력하는 것을 번거로워하는 사용자.
* **Mobile First**: 중앙 집중형 레이아웃과 큰 터치 타겟을 선호하는 유저.

## 3. 기능 상세 정의 (Feature Specifications)

### [핵심 엔진 및 로직]
* **[F1] Zero-Click 세트 동기화 (Set Sync)**: 
    - **로직**: '1세트' 수정 시 `isEdited: false`인 모든 후속 세트에 데이터 즉시 전파.
    - **Override 방지**: 이미 개별적으로 수정한 세트(`isEdited: true`)는 동기화에서 제외하여 사용자 의도를 보호함.
* **[F2] 1초 단위 AI 박자 가이드 (Tempo Engine)**: Web Speech API 활용, 1초 간격 한국어 음성 카운트 및 배경 애니메이션 제공.
* **[F3] 빅 스텝퍼 UI (Interaction)**: 모든 핵심 UI는 화면 정중앙 배치(`flex items-center justify-center`)하여 모바일 접근성 극대화.
* **[F4] 중급자용 스마트 증량 로직 (Progression)**: 마지막 성공 데이터로부터 14일 경과 시 AI가 무게 5kg 상향을 자동 제안. [대기]

### [인프라 및 자동화]
* **[F6] 배포 파이프라인 안정화 (Deployment Fix)**: 
    - GitHub Actions 빌드 시 `package-lock.json` 누락 방지. [완료]
    - **404 에러 방지**: `next.config.mjs`에 `basePath` 및 `assetPrefix` 설정 적용. [v1.41 수정]
    - **Jekyll 무시**: 빌드 결과물에 `.nojekyll` 파일을 포함하여 `_next` 폴더 인식 보장. [v1.41 수정]
* **[F8] AI 주도적 무결성 검증 (AI Quality Gate)**: AI가 업데이트 전 저장소 상태 분석 및 가상 빌드 테스트 수행. [활성]

### [사용자 경험 및 확장]
* **[F13] 세트 자동 카운팅 및 휴식 전환 로직**: 세트 완료 시 자동 휴식 타이머(60s) 진입 및 다크 모드 전체 화면 오버레이 적용. [완료]
* **[F14] 다중 루틴 프리셋 시스템**: 초급/중급/고급 숙련도별 5종 루틴 선택 기능. [완료]
* **[F15] 운동 메타데이터 DB 분리 관리**: 상세 종목 데이터를 `data/exercises.ts`에서 독립적으로 관리. [완료]

## 4. 데이터 및 시스템 설계 (System Design)
* **프론트엔드**: Next.js (App Router) 기반 반응형 웹/앱 레이아웃.
* **배포 정책**: GitHub Pages 배포를 위해 `output: 'export'` 및 저장소명(`/workout_ads`) 기반의 경로 설정 준수.

## 5. AI 자동화 파이프라인 적용 (Automation Pipeline)
* **Step 1 (기획)**: 본 PRD를 통한 기능 명세 자동 갱신.
* **Step 2 (검증/테스트)**: AI가 현재 저장소의 빌드 성공 여부를 상시 모니터링하여 무결성을 확인함.
* **Step 3 (개발)**: 검증된 환경 위에서 본 PRD 명세를 기반으로 AI가 코드를 생성함.
* **Step 4 (배포)**: 정적 내보내기 완료 후 GitHub Actions를 통해 자동 반영.

## 6. 수익화 및 확장 계획 (Monetization)
* **광고/구독**: 휴식 시간 전면 광고 송출 및 프리미엄 구독 등급 운영.

## 7. 문서 관리 및 버전 관리 정책
* **버전 체계**: Semantic Versioning 적용.
* **PRD 제공 방식 [필수]**: 변경 시 항상 **본 문서와 같은 전문(Full Text)**을 코드 블록 내에 작성하여 제공함.
* **커밋 메시지 표준**: `커밋명 [ver] 제목 / 내용 [commit 주요 내용]` (줄바꿈 준수)
