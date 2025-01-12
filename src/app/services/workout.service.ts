import { computed, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Workout } from '../model/workout.model';

@Injectable({
  providedIn: 'root',
})
  
export class WorkoutService {
  
  /** LocalStorageのキー */
  private readonly STORAGE_KEY = 'workouts';

  /** ワークアウトデータを保持するシグナル */
  private workouts = signal<Workout[]>(this.loadWorkouts());

  /**
   * LocalStorageからワークアウトデータを読み込み
   * @returns ワークアウトデータ
   */
  private loadWorkouts(): Workout[] {
    const storedWorkouts = localStorage.getItem(this.STORAGE_KEY);

    if (storedWorkouts) {
      const workouts = JSON.parse(storedWorkouts);
      // 日付文字列をDateオブジェクトに変換
      return workouts.map((workout: Workout) => ({
        ...workout,
        date: new Date(workout.date),
      }));
    }
    return [];
  }

  /**
   * ワークアウトデータをLocalStorageに保存する
   * @param workouts 保存するワークアウトデータの配列
   */
  private saveWorkouts(workouts: Workout[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
  }

  /**
   * 日付をYYYY-MM-DD形式の文字列に変換する
   * @param date 日付
   * @returns 日付の文字列
   */
  getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * 日付ごとのワークアウトデータを取得する
   * @returns 日付ごとのワークアウトデータ
   */
  workoutByDate = computed(() => {
    const workoutMap = new Map<string, Workout[]>();

    this.workouts().forEach(workout => {
      const dateStr = this.getDateString(workout.date);
      if (!workoutMap.has(dateStr)) {
        workoutMap.set(dateStr, []);
      }
      workoutMap.get(dateStr)!.push(workout);
    });
    return workoutMap;
  });

  /**
   * 全てのワークアウトデータを取得する
   * @returns ワークアウトデータの配列
   */
  getWorkouts() {
    return this.workouts();
  }

  /**
   * 新しいワークアウトデータを追加
   * @param workout 追加するワークアウトデータ
   */
  addWorkout(workout: Workout) {
    this.workouts.update((currentWorkouts) => {
      const newWorkouts = [workout, ...currentWorkouts];
      this.saveWorkouts(newWorkouts);
      return newWorkouts;
    });
  }
}
