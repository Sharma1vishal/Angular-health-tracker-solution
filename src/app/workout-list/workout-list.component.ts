import { Component, Input, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../workout-service.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  @Input() workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}
  getWorkoutCount(workoutType: string): number {
    return (workoutType.match(/,/g) || []).length + 1;
  }
  ngOnInit(): void {
    this.workoutService.workouts$.subscribe(data => {
      this.workouts = data;
    });
  }
}
