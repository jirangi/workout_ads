# 📑 Minimal Fit v1.31 상세 설계서

## 1. 제품 개요 (Product Overview)
* **제품명**: Minimal Fit (미니멀 핏)
* **한 줄 정의**: AI 박자 가이드와 자동 동기화 로직을 통해 운동 중 조작을 0에 수렴하게 만드는 지능형 운동 보조 플랫폼.

## 2. 타겟 유저 (Target Audience)
* **All Levels**: 자신의 숙련도에 맞는 체계적인 분할 운동 루틴을 적용하고 싶은 모든 사용자.

## 3. 기능 상세 정의 (Feature Specifications)

### [F14] 다중 루틴 프리셋 시스템 (Multi-Routine System) [신규]
* **상세**: 숙련도별 검증된 운동 루틴 5종을 프리셋으로 제공함.
* **루틴 구성**:
    1. **초급자 (Full Body)**: 전신 무분할 (스쿼트, 데드리프트, 벤치프레스 등 핵심 종목 위주).
    2. **초급자 (2-Day Split)**: 상체/하체 2분할.
    3. **중급자 (3-Day Split)**: Push / Pull / Legs 3분할.
    4. **중급자 (4-Day Split)**: 가슴/삼두, 등/이두, 하체, 어깨 분할.
    5. **고급자 (5-Day Split)**: 부위별 집중 5분할 (Bro Split).
* **UI/UX**: 메인 화면 진입 시 루틴 선택 모드 제공. 선택된 루틴에 따라 운동 종목 리스트가 자동 생성됨.

### 기존 기능 리스트
* **[F1] Zero-Click 세트 동기화**: [완료]
* **[F2] 1초 단위 AI 음성 카운트**: [완료]
* **[F10~F13] 모바일 최적화 및 세트/휴식 로직**: [완료]
* **[F8] AI 주도적 무결성 검증**: [활성]

## 4. 데이터 및 시스템 설계 (System Design)
* **Data Structure**: `Routine` 객체 내에 `Day`와 `Exercise[]`가 포함된 계층적 구조 사용.
* **State Management**: `selectedRoutine` 상태에 따라 현재 수행할 운동 목록을 필터링함.

## 7. 문서 관리 및 버전 관리 정책
* **버전 체계**: Semantic Versioning (v1.31 업데이트).
* **PRD 제공 방식**: 변경 시 항상 전문(Full Text)을 코드 블록 내에 작성하여 제공함.
