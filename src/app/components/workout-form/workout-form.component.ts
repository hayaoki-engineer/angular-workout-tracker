import { Component } from '@angular/core';
import { Exercise } from '../../model/workout.model';
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

}
