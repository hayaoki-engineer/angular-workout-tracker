import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Exercise, Workout } from '../../model/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent {
  // 現在の日付 
  currentDate = new Date();
  // 選択された日付
  selectedDate: string | null = null;
  // カレンダーの日付
  calendarDays: Date[] = [];
  // 展開されたエクササイズ
  expandedExercises = new Set<string>();
  // ワークアウト
  workouts;

  constructor(public workoutService: WorkoutService) {
    this.workouts = workoutService.workoutsByDate;
    this.currentDate.setHours(0, 0, 0, 0);
    this.updateCalendarDays();
    console.log('Initial workouts:', this.workouts());
  }

  // カレンダーの日付を更新
  updateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(lastDay);
    end.setDate(end.getDate() + (6 - end.getDay()));

    this.calendarDays = [];
    const current = new Date(start);
    while (current <= end) {
      this.calendarDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  // 月を変更
  changeMonth(delta: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    this.updateCalendarDays();
  }

  // 現在の月かどうか
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  // 今日かどうか
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  // ワークアウトがあるかどうか
  hasWorkout(date: Date): boolean {
    const dateStr = this.workoutService.getDateString(date);
    return this.workouts()?.has(dateStr) ?? false;
  }

  // ワークアウトの種目数を取得
  getWorkoutCount(date: Date): number {
    const dateStr = this.workoutService.getDateString(date);
    const workouts = this.workouts()?.get(dateStr);
    if (!workouts) return 0;
    return workouts.reduce(
      (total, workout) => total + workout.exercises.length,
      0
    );
  }

  // 日付を選択
  selectDate(date: Date) {
    if (this.isCurrentMonth(date)) {
      const dateStr = this.workoutService.getDateString(date);
      this.selectedDate = dateStr;
      console.log('Selected date:', dateStr);
      console.log('Workouts for date:', this.workouts()?.get(dateStr));
    }
  }

  // 選択されたワークアウトを取得
  getSelectedWorkouts(): Workout[] | undefined {
    if (!this.selectedDate) return undefined;
    const workouts = this.workouts()?.get(this.selectedDate);
    console.log('Getting workouts for:', this.selectedDate, workouts);
    return workouts;
  }

  // ワークアウトを削除
  deleteWorkouts(date: string, event: Event) {
    event.stopPropagation();
    if (confirm('この日のワークアウトを削除してもよろしいですか？')) {
      this.workoutService.deleteWorkoutsByDate(date);
      this.selectedDate = null;
    }
  }

  // エクササイズを展開
  toggleExercise(workoutId: string, exerciseName: string) {
    const key = `${workoutId}-${exerciseName}`;
    if (this.expandedExercises.has(key)) {
      this.expandedExercises.delete(key);
    } else {
      this.expandedExercises.add(key);
    }
  }

  // エクササイズが展開されているかどうか
  isExerciseExpanded(workoutId: string, exerciseName: string): boolean {
    return this.expandedExercises.has(`${workoutId}-${exerciseName}`);
  }
}
