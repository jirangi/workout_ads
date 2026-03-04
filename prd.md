# 📑 Minimal Fit v1.06 상세 설계서

## 1. 제품 개요 (Product Overview)
- **제품명**: Minimal Fit (미니멀 핏)
- **한 줄 정의**: AI 박자 가이드와 자동 동기화 로직을 통해 운동 중 조작을 0에 수렴하게 만드는 지능형 운동 보조 플랫폼.
- **핵심 목표**: 시장 조사부터 출시까지 이어지는 AI 자동화 파이프라인의 첫 번째 표준 모델 확립.

## 2. 타겟 유저 (Target Audience)
- **Heavy User**: 기존 앱의 반복적인 세트 입력에 피로감을 느끼는 중급 이상의 웨이트 트레이너.
- **Tempo Seeker**: 정확한 박자와 템포 유지가 실력 향상에 직결되는 맨몸 운동 사용자.

## 3. 기능 상세 정의 (Feature Specifications)

### [F1] Zero-Click 세트 동기화 (Set Sync)
- **상세**: 첫 번째 세트에서 수정된 무게와 횟수 데이터를 AI가 인식하여, 남은 모든 세트에 즉시 적용함. Zero-Click 세트 동기화 (Set Sync)]

### [F2] 0.1s 단위 AI 박자 가이드 (Tempo Engine)
- **상세**: 설정된 주기에 맞춰 "One, Two" 음성을 실시간 출력하며 시각적 카운트다운 제공. 0.1s 단위 AI 박자 가이드 (Tempo Engine)]

### [F3] 빅 스텝퍼 UI & 자동 확정 (Interaction)
- **상세**: 수치 클릭 시 대형 버튼 노출. 상단에 무게/횟수/시간 모드 전환 탭 제공. 빅 스텝퍼 UI & 자동 확정 (Interaction)]

### [F4] 중급자용 스마트 증량 로직 (Progression)
- **상세**: 마지막 성공 데이터로부터 14일 경과 시 AI가 무게 5kg 상향을 자동 제안 및 반영함. 중급자용 스마트 증량 로직 (Progression)]

### [F5] 자동화 테스트 지원 (Automated Testing)
- **상세**: 핵심 로직에 대한 Unit Test 스크립트를 포함하여 코드 무결성 보장. 자동화 테스트 지원 (Automated Testing)]

## 4. 데이터 및 시스템 설계 (System Design)
- **프론트엔드**: Next.js 기반 반응형 웹/앱 레이아웃 (중앙 프레임 480px 고정).
- **파일 아키텍처**: layout.tsx(프레임)와 page.tsx(로직)를 엄격히 분리 관리.
- **[신규] 배포 정책: GitHub Pages 배포를 위해 output: 'export'를 통한 정적 사이트 생성을 기본으로 함.**
- **[신규] 경로 최적화: 리포지토리명(workout_ads) 기반의 basePath 설정을 필수적으로 적용함 (v1.07 반영 예정).**

## 5. AI 자동화 파이프라인 적용 (Automation Pipeline)
- **Step 1 (기획)**: 시장 분석 데이터를 프롬프트에 주입하여 본 PRD를 자동 갱신함.
- **Step 2 (개발)**: 본 PRD 명세를 기반으로 AI가 코드를 생성함.
- **Step 3 (테스트/배포)**: **[신규] 정적 내보내기 완료 후 GitHub Actions를 통해 지정된 경로로 자동 배포함.**

## 6. 수익화 및 확장 계획 (Monetization)
- **광고/구독**: 휴식 시간 전면 광고 송출 및 프리미엄 구독 등급 운영.

## 7. 문서 관리 및 변경 이력 정책 (Document Management)
- **버전 체계**: Semantic Versioning 및 프로젝트 전체 단위 통합 관리.
- **PRD 업데이트 제공 방식**: 변경 시 항상 전문(Full Text)을 코드 블록으로 제공하며, 추가는 **[신규]** 처리함.
- **커밋 메시지 표준화**: 모든 업데이트 시 **커밋명 [ver] 제목 / 내용 [commit 주요 내용]** 준수.
