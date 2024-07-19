import { Component } from '@angular/core';
import { WorkoutService, Workout } from '../workout-service.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  username = '';
  type = '';
  minutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.username && this.type && this.minutes !== null) {
      const newWorkout: Workout = {
        username: this.username,
        type: this.type,
        minutes: this.minutes
      };
      this.workoutService.addWorkout(newWorkout);
      this.resetForm();
    }
  }

  resetForm() {
    this.username = '';
    this.type = '';
    this.minutes = null;
  }
}
