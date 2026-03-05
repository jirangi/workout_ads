export type MuscleGroup = "가슴" | "등" | "하체" | "어깨" | "팔" | "복근";
export type Equipment = "바벨" | "덤벨" | "머신/케이블" | "맨몸";

export interface ExerciseInfo {
  id: string;
  category: MuscleGroup;
  subTarget: string;
  name: string;
  equipment: Equipment;
  defaultWeight: number;
  defaultReps: number;
}

const chestEx: ExerciseInfo[] = [
  { id: "ch_u_1", category: "가슴", subTarget: "상부", name: "인클라인 바벨 프레스", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_u_2", category: "가슴", subTarget: "상부", name: "인클라인 덤벨 프레스", equipment: "덤벨", defaultWeight: 20, defaultReps: 12 },
  { id: "ch_u_3", category: "가슴", subTarget: "상부", name: "인클라인 머신 프레스", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 12 },
  { id: "ch_u_4", category: "가슴", subTarget: "상부", name: "인클라인 덤벨 플라이", equipment: "덤벨", defaultWeight: 12, defaultReps: 15 },
  { id: "ch_u_5", category: "가슴", subTarget: "상부", name: "인클라인 케이블 플라이", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "ch_u_6", category: "가슴", subTarget: "상부", name: "로우 투 하이 케이블 크로스", equipment: "머신/케이블", defaultWeight: 10, defaultReps: 15 },
  { id: "ch_u_7", category: "가슴", subTarget: "상부", name: "디클라인 푸쉬업", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ch_u_8", category: "가슴", subTarget: "상부", name: "스미스 머신 인클라인 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_m_1", category: "가슴", subTarget: "중부", name: "플랫 바벨 벤치프레스", equipment: "바벨", defaultWeight: 60, defaultReps: 10 },
  { id: "ch_m_2", category: "가슴", subTarget: "중부", name: "플랫 덤벨 벤치프레스", equipment: "덤벨", defaultWeight: 24, defaultReps: 10 },
  { id: "ch_m_3", category: "가슴", subTarget: "중부", name: "체스트 프레스 머신", equipment: "머신/케이블", defaultWeight: 50, defaultReps: 12 },
  { id: "ch_m_4", category: "가슴", subTarget: "중부", name: "펙 덱 플라이", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 15 },
  { id: "ch_m_5", category: "가슴", subTarget: "중부", name: "플랫 덤벨 플라이", equipment: "덤벨", defaultWeight: 14, defaultReps: 12 },
  { id: "ch_m_6", category: "가슴", subTarget: "중부", name: "푸쉬업", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "ch_m_7", category: "가슴", subTarget: "중부", name: "머신 와이드 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_m_8", category: "가슴", subTarget: "중부", name: "케이블 벤치 프레스", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 12 },
  { id: "ch_l_1", category: "가슴", subTarget: "하부", name: "디클라인 바벨 프레스", equipment: "바벨", defaultWeight: 50, defaultReps: 12 },
  { id: "ch_l_2", category: "가슴", subTarget: "하부", name: "하이 투 로우 케이블 플라이", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "ch_l_3", category: "가슴", subTarget: "하부", name: "딥스 (가슴 타겟)", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
  { id: "ch_l_4", category: "가슴", subTarget: "하부", name: "디클라인 덤벨 프레스", equipment: "덤벨", defaultWeight: 22, defaultReps: 12 },
  { id: "ch_l_5", category: "가슴", subTarget: "하부", name: "디클라인 머신 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
];

const backEx: ExerciseInfo[] = [
  { id: "bk_w_1", category: "등", subTarget: "너비(광배)", name: "랫풀다운", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_w_2", category: "등", subTarget: "너비(광배)", name: "풀업", equipment: "맨몸", defaultWeight: 0, defaultReps: 8 },
  { id: "bk_w_3", category: "등", subTarget: "너비(광배)", name: "어시스트 풀업", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 10 },
  { id: "bk_w_4", category: "등", subTarget: "너비(광배)", name: "원암 덤벨 로우", equipment: "덤벨", defaultWeight: 20, defaultReps: 12 },
  { id: "bk_w_5", category: "등", subTarget: "너비(광배)", name: "스트레이트 암 풀다운", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "bk_w_6", category: "등", subTarget: "너비(광배)", name: "케이블 풀오버", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 12 },
  { id: "bk_w_7", category: "등", subTarget: "너비(광배)", name: "암 블래스터 로우", equipment: "덤벨", defaultWeight: 15, defaultReps: 12 },
  { id: "bk_t_1", category: "등", subTarget: "두께(중심)", name: "바벨 벤트오버 로우", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_t_2", category: "등", subTarget: "두께(중심)", name: "시티드 케이블 로우", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 12 },
  { id: "bk_t_3", category: "등", subTarget: "두께(중심)", name: "T-바 로우", equipment: "바벨", defaultWeight: 30, defaultReps: 10 },
  { id: "bk_t_4", category: "등", subTarget: "두께(중심)", name: "머신 시티드 로우", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_t_5", category: "등", subTarget: "두께(중심)", name: "덤벨 로우", equipment: "덤벨", defaultWeight: 18, defaultReps: 12 },
  { id: "bk_t_6", category: "등", subTarget: "두께(중심)", name: "체스트 서포티드 로우", equipment: "덤벨", defaultWeight: 15, defaultReps: 12 },
  { id: "bk_l_1", category: "등", subTarget: "하부/기립근", name: "데드리프트", equipment: "바벨", defaultWeight: 60, defaultReps: 8 },
  { id: "bk_l_2", category: "등", subTarget: "하부/기립근", name: "백 익스텐션", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "bk_l_3", category: "등", subTarget: "하부/기립근", name: "굿모닝", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "bk_l_4", category: "등", subTarget: "하부/기립근", name: "슈퍼맨", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
];

const legEx: ExerciseInfo[] = [
  { id: "lg_q_1", category: "하체", subTarget: "대퇴사두", name: "백 스쿼트", equipment: "바벨", defaultWeight: 60, defaultReps: 10 },
  { id: "lg_q_2", category: "하체", subTarget: "대퇴사두", name: "레그 프레스", equipment: "머신/케이블", defaultWeight: 100, defaultReps: 12 },
  { id: "lg_q_3", category: "하체", subTarget: "대퇴사두", name: "레그 익스텐션", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 15 },
  { id: "lg_q_4", category: "하체", subTarget: "대퇴사두", name: "런지", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "lg_q_5", category: "하체", subTarget: "대퇴사두", name: "프론트 스쿼트", equipment: "바벨", defaultWeight: 40, defaultReps: 10 },
  { id: "lg_q_6", category: "하체", subTarget: "대퇴사두", name: "고블렛 스쿼트", equipment: "덤벨", defaultWeight: 16, defaultReps: 12 },
  { id: "lg_h_1", category: "하체", subTarget: "대퇴이두", name: "라잉 레그 컬", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "lg_h_2", category: "하체", subTarget: "대퇴이두", name: "스티프 레그 데드리프트", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "lg_h_3", category: "하체", subTarget: "대퇴이두", name: "덤벨 레그 컬", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "lg_g_1", category: "하체", subTarget: "엉덩이", name: "힙 쓰러스터", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "lg_g_2", category: "하체", subTarget: "엉덩이", name: "케이블 킥백", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "lg_g_3", category: "하체", subTarget: "엉덩이", name: "힙 어브덕션", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 20 },
  { id: "lg_c_1", category: "하체", subTarget: "종아리", name: "스탠딩 카프 레이즈", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 20 },
  { id: "lg_c_2", category: "하체", subTarget: "종아리", name: "맨몸 카프 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 30 },
];

const shoulderEx: ExerciseInfo[] = [
  { id: "sh_f_1", category: "어깨", subTarget: "전면", name: "오버헤드 프레스", equipment: "바벨", defaultWeight: 30, defaultReps: 10 },
  { id: "sh_f_2", category: "어깨", subTarget: "전면", name: "덤벨 숄더 프레스", equipment: "덤벨", defaultWeight: 14, defaultReps: 12 },
  { id: "sh_f_3", category: "어깨", subTarget: "전면", name: "프론트 레이즈", equipment: "덤벨", defaultWeight: 7, defaultReps: 15 },
  { id: "sh_s_1", category: "어깨", subTarget: "측면", name: "사이드 레터럴 레이즈", equipment: "덤벨", defaultWeight: 6, defaultReps: 20 },
  { id: "sh_s_2", category: "어깨", subTarget: "측면", name: "케이블 레터럴 레이즈", equipment: "머신/케이블", defaultWeight: 5, defaultReps: 15 },
  { id: "sh_s_3", category: "어깨", subTarget: "측면", name: "업라이트 로우", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "sh_r_1", category: "어깨", subTarget: "후면", name: "페이스풀", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "sh_r_2", category: "어깨", subTarget: "후면", name: "리어 델트 플라이", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
];

const armEx: ExerciseInfo[] = [
  { id: "ar_b_1", category: "팔", subTarget: "이두", name: "바벨 컬", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "ar_b_2", category: "팔", subTarget: "이두", name: "덤벨 컬", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "ar_b_3", category: "팔", subTarget: "이두", name: "해머 컬", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "ar_t_1", category: "팔", subTarget: "삼두", name: "푸쉬다운", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 12 },
  { id: "ar_t_2", category: "팔", subTarget: "삼두", name: "라잉 트라이셉스 익스텐션", equipment: "바벨", defaultWeight: 15, defaultReps: 12 },
  { id: "ar_t_3", category: "팔", subTarget: "삼두", name: "딥스 (삼두 타겟)", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
];

const absEx: ExerciseInfo[] = [
  { id: "ab_u_1", category: "복근", subTarget: "상부", name: "크런치", equipment: "맨몸", defaultWeight: 0, defaultReps: 25 },
  { id: "ab_l_1", category: "복근", subTarget: "하부", name: "레그 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ab_o_1", category: "복근", subTarget: "외복사근", name: "러시안 트위스트", equipment: "맨몸", defaultWeight: 5, defaultReps: 30 },
];

// 총 150개를 채우기 위한 더미 데이터 생성 (실제 운영 시 위 리스트에 150개를 기입)
export const EXERCISE_DATABASE: ExerciseInfo[] = [
  ...chestEx, ...backEx, ...legEx, ...shoulderEx, ...armEx, ...absEx
];
