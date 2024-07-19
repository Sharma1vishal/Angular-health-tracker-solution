import { Component } from '@angular/core';
import { WorkoutService, Workout } from './workout-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {
    this.workoutService.workouts$.subscribe(data => {
      this.workouts = data;
    });
  }
}
