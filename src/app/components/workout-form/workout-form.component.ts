import { Component } from '@angular/core';
import { Exercise, Workout } from '../../model/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {

  exercises: Exercise[] = [
    { name: '', sets: [{ weight: 0, reps: 0 }] }
  ];

  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) { }
  
  // セットを追加
  addSet(exerciseIndex: number) {
    this.exercises[exerciseIndex].sets.push({ weight: 0, reps: 0 });
  }

  // 種目を削除 
  removeExercise(index: number) {
    if (this.exercises.length > 1) {
      this.exercises.splice(index, 1);
    }
  }

  // ワークアウトを追加
  onSubmit() {
    if (this.exercises.some(e => e.name && e.sets.length > 0)) {
      // 今日の日付を取得
      const today = new Date();
      // 今日の日付を0時0分0秒に設定
      today.setHours(0, 0, 0, 0);

      // ワークアウトを作成
      const workout: Workout = {
        id: Date.now().toString(),
        exercises: [...this.exercises],
        date: today
      };

      // ワークアウトを追加
      this.workoutService.addWorkout(workout);

      // ワークアウトリストに移動
      this.router.navigate(['/list']);
    }
  }



}
