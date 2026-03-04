# 📑 Minimal Fit v1.17 상세 설계서

## 1. 제품 개요 (Product Overview)
* **제품명**: Minimal Fit (미니멀 핏)
* **한 줄 정의**: AI 박자 가이드와 자동 동기화 로직을 통해 운동 중 조작을 0에 수렴하게 만드는 지능형 운동 보조 플랫폼.
* **핵심 목표**: 시장 조사부터 출시까지 이어지는 AI 자동화 파이프라인의 첫 번째 표준 모델 확립.

## 2. 타겟 유저 (Target Audience)
* **Heavy User**: 기존 앱의 반복적인 세트 입력에 피로감을 느끼는 중급 이상의 웨이트 트레이너.
* **Tempo Seeker**: 정확한 박자와 템포 유지가 실력 향상에 직결되는 맨몸 운동 사용자.

## 3. 기능 상세 정의 (Feature Specifications)

### [F1] Zero-Click 세트 동기화 (Set Sync) - [v1.17 상세 명세]
* **핵심 로직**: 사용자가 '첫 번째 세트'의 무게(kg) 또는 횟수(reps)를 수정할 경우, 입력과 동시에 아래의 모든 세트(2~N세트)에 동일한 값이 실시간 전파됨.
* **사용자 경험(UX)**:
    - 1세트 입력 칸 포커스 아웃 혹은 입력 시 실시간 반영.
    - 단, 이미 개별적으로 수정한 세트가 있다면 해당 세트는 동기화에서 제외(Override 방지).
* **데이터 구조**: `sets: Array<{id: number, weight: number, reps: number, isEdited: boolean}>` 형태로 관리.

### 기존 기능 리스트
* **[F2] 0.1s 단위 AI 박자 가이드 (Tempo Engine)**: 음성 및 시각적 카운트다운 제공.
* **[F3] 빅 스텝퍼 UI & 자동 확정 (Interaction)**: 대형 버튼 및 모드 전환 탭.
* **[F4] 중급자용 스마트 증량 로직 (Progression)**: 14일 경과 시 자동 증량 제안.
* **[F5] 자동화 테스트 지원 (Automated Testing)**: Unit Test 스크립트 포함.
* **[F6] 배포 파이프라인 안정화 (Deployment Fix)**: [완료]
* **[F7] 프로젝트 초기화 및 경로 정규화**: [완료]
* **[F8] AI 주도적 무결성 검증 및 자체 테스트 (AI Quality Gate)**: [활성]
* **[F9] 저장소 청정 유지 (Repository Hygiene)**: `.gitignore` 적용 완료. [완료]

## 4. 데이터 및 시스템 설계 (System Design)
* **프론트엔드**: Next.js 기반 반응형 웹/앱 레이아웃 (중앙 프레임 480px 고정).
* **파일 아키텍처**: layout.tsx(프레임)와 page.tsx(로직)를 엄격히 분리 관리.
* **상태 관리**: React `useState`를 활용한 세트 데이터 배열 관리.

## 5. AI 자동화 파이프라인 적용 (Automation Pipeline)
* **Step 1 (기획)**: 본 PRD를 통한 기능 명세 자동 갱신.
* **Step 2 (검증/테스트)**: AI가 현재 GitHub 저장소의 빌드 성공 여부를 상시 모니터링함.
* **Step 3 (개발)**: [F1] 구현을 위한 코드 생성 단계 진입 예정.
* **Step 4 (배포)**: GitHub Actions를 통해 `https://jirangi.github.io/workout_ads/`에 자동 반영.

## 6. 수익화 및 확장 계획 (Monetization)
* **광고/구독**: 휴식 시간 전면 광고 송출 및 프리미엄 구독 등급 운영.

## 7. 문서 관리 및 버전 관리 정책 (Updated v1.17)
* **버전 체계**: Semantic Versioning 적용.
* **PRD 제공 방식**: 변경 시 항상 전문(Full Text)을 코드 블록으로 제공.
* **커밋 메시지 표준**: 
    - 형식: `커밋명 [ver] 제목` / `/ 내용 [commit 주요 내용]` (줄바꿈 준수)
