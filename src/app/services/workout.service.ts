import { Injectable, signal, computed } from '@angular/core';
import { Workout } from '../model/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';
  private workouts = signal<Workout[]>(this.loadWorkouts());

  private loadWorkouts(): Workout[] {
    const storedWorkouts = localStorage.getItem(this.STORAGE_KEY);
    if (storedWorkouts) {
      const workouts = JSON.parse(storedWorkouts);
      return workouts.map((workout: any) => ({
        ...workout,
        date: new Date(workout.date),
      }));
    }
    return [];
  }

  private saveWorkouts(workouts: Workout[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
  }

  getDateString(date: Date): string {
    // タイムゾーンの影響を受けないように日付を処理
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  workoutsByDate = computed(() => {
    const workoutMap = new Map<string, Workout[]>();

    this.workouts().forEach((workout) => {
      const dateStr = this.getDateString(workout.date);
      if (!workoutMap.has(dateStr)) {
        workoutMap.set(dateStr, []);
      }
      workoutMap.get(dateStr)!.push(workout);
    });

    // デバッグ用：作成されたマップを確認
    console.log('Workout map:', Object.fromEntries(workoutMap));
    return workoutMap;
  });

  addWorkout(workout: Workout) {
    this.workouts.update((current) => {
      const newWorkouts = [workout, ...current];
      this.saveWorkouts(newWorkouts);
      return newWorkouts;
    });
  }

  deleteWorkoutsByDate(date: string) {
    this.workouts.update((current) => {
      const newWorkouts = current.filter(
        (w) => this.getDateString(w.date) !== date
      );
      this.saveWorkouts(newWorkouts);
      return newWorkouts;
    });
  }
}
