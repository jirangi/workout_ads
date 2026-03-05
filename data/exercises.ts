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

export const EXERCISE_DATABASE: ExerciseInfo[] = [
  // --- 가슴 (30개) ---
  { id: "ch_u_1", category: "가슴", subTarget: "상부", name: "인클라인 바벨 프레스", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_u_2", category: "가슴", subTarget: "상부", name: "인클라인 덤벨 프레스", equipment: "덤벨", defaultWeight: 20, defaultReps: 12 },
  { id: "ch_u_3", category: "가슴", subTarget: "상부", name: "인클라인 머신 프레스", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 12 },
  { id: "ch_u_4", category: "가슴", subTarget: "상부", name: "인클라인 덤벨 플라이", equipment: "덤벨", defaultWeight: 12, defaultReps: 15 },
  { id: "ch_u_5", category: "가슴", subTarget: "상부", name: "인클라인 케이블 플라이", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "ch_u_6", category: "가슴", subTarget: "상부", name: "로우 투 하이 케이블 크로스오버", equipment: "머신/케이블", defaultWeight: 10, defaultReps: 15 },
  { id: "ch_u_7", category: "가슴", subTarget: "상부", name: "인클라인 스미스 머신 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_u_8", category: "가슴", subTarget: "상부", name: "디클라인 푸쉬업", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ch_u_9", category: "가슴", subTarget: "상부", name: "인클라인 해머 스트렝스 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 10 },
  { id: "ch_u_10", category: "가슴", subTarget: "상부", name: "랜드마인 프레스", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },

  { id: "ch_m_1", category: "가슴", subTarget: "중부", name: "플랫 바벨 벤치프레스", equipment: "바벨", defaultWeight: 60, defaultReps: 10 },
  { id: "ch_m_2", category: "가슴", subTarget: "중부", name: "플랫 덤벨 벤치프레스", equipment: "덤벨", defaultWeight: 24, defaultReps: 10 },
  { id: "ch_m_3", category: "가슴", subTarget: "중부", name: "체스트 프레스 머신", equipment: "머신/케이블", defaultWeight: 50, defaultReps: 12 },
  { id: "ch_m_4", category: "가슴", subTarget: "중부", name: "플랫 덤벨 플라이", equipment: "덤벨", defaultWeight: 14, defaultReps: 12 },
  { id: "ch_m_5", category: "가슴", subTarget: "중부", name: "펙 덱 플라이", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 15 },
  { id: "ch_m_6", category: "가슴", subTarget: "중부", name: "플랫 케이블 플라이", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "ch_m_7", category: "가슴", subTarget: "중부", name: "푸쉬업", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "ch_m_8", category: "가슴", subTarget: "중부", name: "스미스 머신 벤치프레스", equipment: "머신/케이블", defaultWeight: 50, defaultReps: 10 },
  { id: "ch_m_9", category: "가슴", subTarget: "중부", name: "플레이트 프레스", equipment: "덤벨", defaultWeight: 15, defaultReps: 15 },
  { id: "ch_m_10", category: "가슴", subTarget: "중부", name: "와이드 푸쉬업", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },

  { id: "ch_l_1", category: "가슴", subTarget: "하부", name: "디클라인 바벨 프레스", equipment: "바벨", defaultWeight: 50, defaultReps: 12 },
  { id: "ch_l_2", category: "가슴", subTarget: "하부", name: "디클라인 덤벨 프레스", equipment: "덤벨", defaultWeight: 22, defaultReps: 12 },
  { id: "ch_l_3", category: "가슴", subTarget: "하부", name: "딥스 (체스트 버전)", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
  { id: "ch_l_4", category: "가슴", subTarget: "하부", name: "하이 투 로우 케이블 크로스오버", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "ch_l_5", category: "가슴", subTarget: "하부", name: "디클라인 덤벨 플라이", equipment: "덤벨", defaultWeight: 12, defaultReps: 15 },
  { id: "ch_l_6", category: "가슴", subTarget: "하부", name: "디클라인 머신 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_l_7", category: "가슴", subTarget: "하부", name: "어시스트 딥 머신", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 12 },
  { id: "ch_l_8", category: "가슴", subTarget: "하부", name: "스미스 머신 디클라인 프레스", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "ch_l_9", category: "가슴", subTarget: "하부", name: "플레이트 샤베트", equipment: "덤벨", defaultWeight: 10, defaultReps: 15 },
  { id: "ch_l_10", category: "가슴", subTarget: "하부", name: "로프 하이 투 로우 케이블", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },

  // --- 등 (30개) ---
  { id: "bk_w_1", category: "등", subTarget: "광배(너비)", name: "와이드 그립 랫풀다운", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_w_2", category: "등", subTarget: "광배(너비)", name: "풀업 (턱걸이)", equipment: "맨몸", defaultWeight: 0, defaultReps: 8 },
  { id: "bk_w_3", category: "등", subTarget: "광배(너비)", name: "어시스트 풀업 머신", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 10 },
  { id: "bk_w_4", category: "등", subTarget: "광배(너비)", name: "스트레이트 암 풀다운", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "bk_w_5", category: "등", subTarget: "광배(너비)", name: "원암 덤벨 로우", equipment: "덤벨", defaultWeight: 20, defaultReps: 12 },
  { id: "bk_w_6", category: "등", subTarget: "광배(너비)", name: "V-바 랫풀다운", equipment: "머신/케이블", defaultWeight: 45, defaultReps: 10 },
  { id: "bk_w_7", category: "등", subTarget: "광배(너비)", name: "언더그립 랫풀다운", equipment: "머신/케이블", defaultWeight: 45, defaultReps: 12 },
  { id: "bk_w_8", category: "등", subTarget: "광배(너비)", name: "패러럴 그립 풀업", equipment: "맨몸", defaultWeight: 0, defaultReps: 8 },
  { id: "bk_w_9", category: "등", subTarget: "광배(너비)", name: "머신 하이 로우", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_w_10", category: "등", subTarget: "광배(너비)", name: "케이블 풀 오버", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },

  { id: "bk_t_1", category: "등", subTarget: "중심(두께)", name: "바벨 벤트오버 로우", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_t_2", category: "등", subTarget: "중심(두께)", name: "시티드 케이블 로우", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 12 },
  { id: "bk_t_3", category: "등", subTarget: "중심(두께)", name: "T-바 로우", equipment: "바벨", defaultWeight: 30, defaultReps: 10 },
  { id: "bk_t_4", category: "등", subTarget: "중심(두께)", name: "체스트 서포티드 덤벨 로우", equipment: "덤벨", defaultWeight: 16, defaultReps: 12 },
  { id: "bk_t_5", category: "등", subTarget: "중심(두께)", name: "펜들레이 로우", equipment: "바벨", defaultWeight: 40, defaultReps: 8 },
  { id: "bk_t_6", category: "등", subTarget: "중심(두께)", name: "스미스 머신 로우", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "bk_t_7", category: "등", subTarget: "중심(두께)", name: "인버티드 로우", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
  { id: "bk_t_8", category: "등", subTarget: "중심(두께)", name: "머신 로우 (뉴트럴 그립)", equipment: "머신/케이블", defaultWeight: 45, defaultReps: 12 },
  { id: "bk_t_9", category: "등", subTarget: "중심(두께)", name: "실 로우 (Seal Row)", equipment: "바벨", defaultWeight: 30, defaultReps: 10 },
  { id: "bk_t_10", category: "등", subTarget: "중심(두께)", name: "메도우 로우 (Meadows Row)", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },

  { id: "bk_l_1", category: "등", subTarget: "하부/기립근", name: "컨벤셔널 데드리프트", equipment: "바벨", defaultWeight: 60, defaultReps: 8 },
  { id: "bk_l_2", category: "등", subTarget: "하부/기립근", name: "백 익스텐션", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "bk_l_3", category: "등", subTarget: "하부/기립근", name: "루마니안 데드리프트", equipment: "바벨", defaultWeight: 60, defaultReps: 10 },
  { id: "bk_l_4", category: "등", subTarget: "하부/기립근", name: "굿모닝", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "bk_l_5", category: "등", subTarget: "하부/기립근", name: "슈퍼맨", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "bk_l_6", category: "등", subTarget: "하부/기립근", name: "버드 독", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "bk_l_7", category: "등", subTarget: "하부/기립근", name: "머신 척추 기립근 프레스", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 15 },
  { id: "bk_l_8", category: "등", subTarget: "하부/기립근", name: "스모 데드리프트", equipment: "바벨", defaultWeight: 60, defaultReps: 8 },
  { id: "bk_l_9", category: "등", subTarget: "하부/기립근", name: "케이블 벤트오버 로우", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 15 },
  { id: "bk_l_10", category: "등", subTarget: "하부/기립근", name: "웨이티드 백 익스텐션", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },

  // --- 하체 (30개) ---
  { id: "lg_q_1", category: "하체", subTarget: "대퇴사두", name: "백 스쿼트", equipment: "바벨", defaultWeight: 60, defaultReps: 10 },
  { id: "lg_q_2", category: "하체", subTarget: "대퇴사두", name: "레그 프레스", equipment: "머신/케이블", defaultWeight: 100, defaultReps: 12 },
  { id: "lg_q_3", category: "하체", subTarget: "대퇴사두", name: "레그 익스텐션", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 15 },
  { id: "lg_q_4", category: "하체", subTarget: "대퇴사두", name: "프론트 스쿼트", equipment: "바벨", defaultWeight: 40, defaultReps: 10 },
  { id: "lg_q_5", category: "하체", subTarget: "대퇴사두", name: "헥 스쿼트 머신", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 12 },
  { id: "lg_q_6", category: "하체", subTarget: "대퇴사두", name: "불가리안 스플릿 스쿼트", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "lg_q_7", category: "하체", subTarget: "대퇴사두", name: "고블렛 스쿼트", equipment: "덤벨", defaultWeight: 16, defaultReps: 12 },
  { id: "lg_q_8", category: "하체", subTarget: "대퇴사두", name: "런지", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },

  { id: "lg_h_1", category: "하체", subTarget: "대퇴이두", name: "라잉 레그 컬", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "lg_h_2", category: "하체", subTarget: "대퇴이두", name: "시티드 레그 컬", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 15 },
  { id: "lg_h_3", category: "하체", subTarget: "대퇴이두", name: "스티프 레그 데드리프트", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "lg_h_4", category: "하체", subTarget: "대퇴이두", name: "덤벨 레그 컬", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "lg_h_5", category: "하체", subTarget: "대퇴이두", name: "노르딕 햄스트링 컬", equipment: "맨몸", defaultWeight: 0, defaultReps: 6 },
  { id: "lg_h_6", category: "하체", subTarget: "대퇴이두", name: "케이블 레그 컬", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "lg_h_7", category: "하체", subTarget: "대퇴이두", name: "굿모닝 (햄스트링 타겟)", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },

  { id: "lg_g_1", category: "하체", subTarget: "엉덩이", name: "바벨 힙 쓰러스터", equipment: "바벨", defaultWeight: 40, defaultReps: 12 },
  { id: "lg_g_2", category: "하체", subTarget: "엉덩이", name: "케이블 킥백", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "lg_g_3", category: "하체", subTarget: "엉덩이", name: "어브덕션 머신 (힙 어브덕션)", equipment: "머신/케이블", defaultWeight: 35, defaultReps: 20 },
  { id: "lg_g_4", category: "하체", subTarget: "엉덩이", name: "덤벨 힙 브릿지", equipment: "덤벨", defaultWeight: 16, defaultReps: 15 },
  { id: "lg_g_5", category: "하체", subTarget: "엉덩이", name: "사이드 라잉 레그 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "lg_g_6", category: "하체", subTarget: "엉덩이", name: "스텝 업", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "lg_g_7", category: "하체", subTarget: "엉덩이", name: "프로그 펌프", equipment: "맨몸", defaultWeight: 0, defaultReps: 30 },

  { id: "lg_c_1", category: "하체", subTarget: "종아리", name: "스탠딩 카프 레이즈", equipment: "머신/케이블", defaultWeight: 40, defaultReps: 20 },
  { id: "lg_c_2", category: "하체", subTarget: "종아리", name: "시티드 카프 레이즈", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 20 },
  { id: "lg_c_3", category: "하체", subTarget: "종아리", name: "동키 카프 레이즈", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 20 },
  { id: "lg_c_4", category: "하체", subTarget: "종아리", name: "맨몸 카프 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 30 },
  { id: "lg_c_5", category: "하체", subTarget: "종아리", name: "레그 프레스 카프 프레스", equipment: "머신/케이블", defaultWeight: 60, defaultReps: 20 },
  { id: "lg_c_6", category: "하체", subTarget: "종아리", name: "덤벨 싱글 레그 카프 레이즈", equipment: "덤벨", defaultWeight: 10, defaultReps: 15 },
  { id: "lg_c_7", category: "하체", subTarget: "종아리", name: "티비알리스 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "lg_c_8", category: "하체", subTarget: "종아리", name: "점프 스쿼트 (종아리 타겟)", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },

  // --- 어깨 (25개) ---
  { id: "sh_f_1", category: "어깨", subTarget: "전면", name: "오버헤드 프레스", equipment: "바벨", defaultWeight: 30, defaultReps: 10 },
  { id: "sh_f_2", category: "어깨", subTarget: "전면", name: "덤벨 숄더 프레스", equipment: "덤벨", defaultWeight: 14, defaultReps: 12 },
  { id: "sh_f_3", category: "어깨", subTarget: "전면", name: "아놀드 프레스", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "sh_f_4", category: "어깨", subTarget: "전면", name: "덤벨 프론트 레이즈", equipment: "덤벨", defaultWeight: 7, defaultReps: 15 },
  { id: "sh_f_5", category: "어깨", subTarget: "전면", name: "바벨 프론트 레이즈", equipment: "바벨", defaultWeight: 15, defaultReps: 12 },
  { id: "sh_f_6", category: "어깨", subTarget: "전면", name: "케이블 프론트 레이즈", equipment: "머신/케이블", defaultWeight: 10, defaultReps: 15 },
  { id: "sh_f_7", category: "어깨", subTarget: "전면", name: "머신 숄더 프레스", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 12 },
  { id: "sh_f_8", category: "어깨", subTarget: "전면", name: "스미스 머신 프레스", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 10 },

  { id: "sh_s_1", category: "어깨", subTarget: "측면", name: "덤벨 사이드 레터럴 레이즈", equipment: "덤벨", defaultWeight: 6, defaultReps: 20 },
  { id: "sh_s_2", category: "어깨", subTarget: "측면", name: "케이블 레터럴 레이즈", equipment: "머신/케이블", defaultWeight: 5, defaultReps: 15 },
  { id: "sh_s_3", category: "어깨", subTarget: "측면", name: "머신 레터럴 레이즈", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "sh_s_4", category: "어깨", subTarget: "측면", name: "바벨 업라이트 로우", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "sh_s_5", category: "어깨", subTarget: "측면", name: "덤벨 업라이트 로우", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "sh_s_6", category: "어깨", subTarget: "측면", name: "리닝 케이블 레터럴 레이즈", equipment: "머신/케이블", defaultWeight: 5, defaultReps: 15 },
  { id: "sh_s_7", category: "어깨", subTarget: "측면", name: "버스 드라이버 (플레이트 회전)", equipment: "맨몸", defaultWeight: 5, defaultReps: 30 },
  { id: "sh_s_8", category: "어깨", subTarget: "측면", name: "비하인드 넥 프레스", equipment: "바벨", defaultWeight: 25, defaultReps: 12 },

  { id: "sh_r_1", category: "어깨", subTarget: "후면", name: "페이스풀", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "sh_r_2", category: "어깨", subTarget: "후면", name: "리어 델트 플라이 머신", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "sh_r_3", category: "어깨", subTarget: "후면", name: "벤트오버 덤벨 레이즈", equipment: "덤벨", defaultWeight: 5, defaultReps: 15 },
  { id: "sh_r_4", category: "어깨", subTarget: "후면", name: "케이블 리어 델트 로우", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "sh_r_5", category: "어깨", subTarget: "후면", name: "라잉 리어 델트 레이즈", equipment: "덤벨", defaultWeight: 4, defaultReps: 15 },
  { id: "sh_r_6", category: "어깨", subTarget: "후면", name: "인클라인 벤치 리어 델트 레이즈", equipment: "덤벨", defaultWeight: 4, defaultReps: 15 },
  { id: "sh_r_7", category: "어깨", subTarget: "후면", name: "W-레이즈", equipment: "덤벨", defaultWeight: 3, defaultReps: 20 },
  { id: "sh_r_8", category: "어깨", subTarget: "후면", name: "밴드 풀 어파트", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "sh_r_9", category: "어깨", subTarget: "후면", name: "케이블 크로스오버 (후면타겟)", equipment: "머신/케이블", defaultWeight: 10, defaultReps: 15 },

  // --- 팔 (20개) ---
  { id: "ar_b_1", category: "팔", subTarget: "이두", name: "스탠딩 바벨 컬", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "ar_b_2", category: "팔", subTarget: "이두", name: "스탠딩 덤벨 컬", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "ar_b_3", category: "팔", subTarget: "이두", name: "덤벨 해머 컬", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "ar_b_4", category: "팔", subTarget: "이두", name: "프리처 컬 머신", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 12 },
  { id: "ar_b_5", category: "팔", subTarget: "이두", name: "인클라인 덤벨 컬", equipment: "덤벨", defaultWeight: 8, defaultReps: 12 },
  { id: "ar_b_6", category: "팔", subTarget: "이두", name: "컨센트레이션 컬", equipment: "덤벨", defaultWeight: 10, defaultReps: 12 },
  { id: "ar_b_7", category: "팔", subTarget: "이두", name: "케이블 바이셉 컬", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 15 },
  { id: "ar_b_8", category: "팔", subTarget: "이두", name: "이지바 컬 (EZ-Bar)", equipment: "바벨", defaultWeight: 20, defaultReps: 12 },
  { id: "ar_b_9", category: "팔", subTarget: "이두", name: "리버스 바벨 컬", equipment: "바벨", defaultWeight: 15, defaultReps: 12 },
  { id: "ar_b_10", category: "팔", subTarget: "이두", name: "스파이더 컬", equipment: "바벨", defaultWeight: 15, defaultReps: 12 },

  { id: "ar_t_1", category: "팔", subTarget: "삼두", name: "케이블 푸쉬다운 (로프)", equipment: "머신/케이블", defaultWeight: 20, defaultReps: 12 },
  { id: "ar_t_2", category: "팔", subTarget: "삼두", name: "라잉 트라이셉스 익스텐션", equipment: "바벨", defaultWeight: 15, defaultReps: 12 },
  { id: "ar_t_3", category: "팔", subTarget: "삼두", name: "덤벨 오버헤드 익스텐션", equipment: "덤벨", defaultWeight: 12, defaultReps: 12 },
  { id: "ar_t_4", category: "팔", subTarget: "삼두", name: "클로즈 그립 벤치프레스", equipment: "바벨", defaultWeight: 40, defaultReps: 10 },
  { id: "ar_t_5", category: "팔", subTarget: "삼두", name: "삼두 킥백 (덤벨)", equipment: "덤벨", defaultWeight: 6, defaultReps: 15 },
  { id: "ar_t_6", category: "팔", subTarget: "삼두", name: "딥스 (삼두 타겟)", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
  { id: "ar_t_7", category: "팔", subTarget: "삼두", name: "머신 트라이셉스 프레스", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 12 },
  { id: "ar_t_8", category: "팔", subTarget: "삼두", name: "벤치 딥스", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ar_t_9", category: "팔", subTarget: "삼두", name: "케이블 오버헤드 익스텐션", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 15 },
  { id: "ar_t_10", category: "팔", subTarget: "삼두", name: "원암 케이블 푸쉬다운", equipment: "머신/케이블", defaultWeight: 10, defaultReps: 15 },

  // --- 복근 (15개) ---
  { id: "ab_u_1", category: "복근", subTarget: "상부", name: "크런치", equipment: "맨몸", defaultWeight: 0, defaultReps: 25 },
  { id: "ab_u_2", category: "복근", subTarget: "상부", name: "싯 업 (Sit-up)", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "ab_u_3", category: "복근", subTarget: "상부", name: "머신 크런치", equipment: "머신/케이블", defaultWeight: 25, defaultReps: 15 },
  { id: "ab_u_4", category: "복근", subTarget: "상부", name: "디클라인 싯업", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ab_u_5", category: "복근", subTarget: "상부", name: "케이블 크런치", equipment: "머신/케이블", defaultWeight: 30, defaultReps: 15 },

  { id: "ab_l_1", category: "복근", subTarget: "하부", name: "레그 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 15 },
  { id: "ab_l_2", category: "복근", subTarget: "하부", name: "행잉 레그 레이즈", equipment: "맨몸", defaultWeight: 0, defaultReps: 12 },
  { id: "ab_l_3", category: "복근", subTarget: "하부", name: "리버스 크런치", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "ab_l_4", category: "복근", subTarget: "하부", name: "플러터 킥", equipment: "맨몸", defaultWeight: 0, defaultReps: 30 },
  { id: "ab_l_5", category: "복근", subTarget: "하부", name: "마운틴 클라이머", equipment: "맨몸", defaultWeight: 0, defaultReps: 40 },

  { id: "ab_o_1", category: "복근", subTarget: "외복사근", name: "러시안 트위스트", equipment: "맨몸", defaultWeight: 5, defaultReps: 30 },
  { id: "ab_o_2", category: "복근", subTarget: "외복사근", name: "사이드 플랭크", equipment: "맨몸", defaultWeight: 0, defaultReps: 60 },
  { id: "ab_o_3", category: "복근", subTarget: "외복사근", name: "케이블 우드초퍼", equipment: "머신/케이블", defaultWeight: 15, defaultReps: 12 },
  { id: "ab_o_4", category: "복근", subTarget: "외복사근", name: "바이시클 크런치", equipment: "맨몸", defaultWeight: 0, defaultReps: 20 },
  { id: "ab_o_5", category: "복근", subTarget: "외복사근", name: "덤벨 사이드 밴드", equipment: "덤벨", defaultWeight: 12, defaultReps: 15 }
];
