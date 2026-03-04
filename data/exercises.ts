// data/exercises.ts
export type MuscleGroup = "가슴" | "등" | "어깨" | "하체" | "팔" | "복근";
export type SubGroup = "상부" | "중부" | "하부" | "광배" | "두께" | "전면" | "측면" | "후면" | "사두" | "햄스트링" | "둔근" | "이두" | "삼두";

export interface ExerciseInfo {
  id: string;
  name: string;
  category: MuscleGroup;
  subCategory: SubGroup;
  defaultWeight: number;
  defaultReps: number;
}

export const EXERCISE_DATABASE: ExerciseInfo[] = [
  { id: "bp_mid", name: "벤치프레스", category: "가슴", subCategory: "중부", defaultWeight: 40, defaultReps: 12 },
  { id: "sq_quad", name: "스쿼트", category: "하체", subCategory: "사두", defaultWeight: 60, defaultReps: 10 },
  { id: "dl_back", name: "데드리프트", category: "등", subCategory: "두께", defaultWeight: 60, defaultReps: 8 },
  { id: "ohp_front", name: "오버헤드 프레스", category: "어깨", subCategory: "전면", defaultWeight: 30, defaultReps: 10 },
  { id: "ld_width", name: "랫풀다운", category: "등", subCategory: "광배", defaultWeight: 35, defaultReps: 12 },
];
