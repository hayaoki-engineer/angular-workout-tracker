import { Injectable } from '@angular/core';
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
