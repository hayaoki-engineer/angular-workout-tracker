// セット
export interface Set {
  weight: number;
  reps: number;
}

// 種目
export interface Exercise {
  name: string;
  sets: Set[];
}

// ワークアウト
export interface Workout {
  id: string;
  date: Date;
  exercises: Exercise[];
}
