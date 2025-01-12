import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { Exercise, Workout } from '../../models/workout.model';
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
  currentDate = new Date();
  selectedDate: string | null = null;
  calendarDays: Date[] = [];
  expandedExercises = new Set<string>();

  constructor(public workoutService: WorkoutService) {
    this.currentDate.setHours(0, 0, 0, 0);
    this.updateCalendarDays();
  }

  updateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 月初めの週の日曜日まで戻る
    const start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay());

    // 月末の週の土曜日まで進む
    const end = new Date(lastDay);
    end.setDate(end.getDate() + (6 - end.getDay()));

    this.calendarDays = [];
    const current = new Date(start);
    while (current <= end) {
      this.calendarDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }
}
