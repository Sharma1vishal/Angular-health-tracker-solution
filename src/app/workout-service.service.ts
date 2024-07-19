import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  username: string;
  type: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.getWorkoutsFromLocalStorage());
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {}

  addWorkout(workout: Workout) {
    const workouts = this.workoutsSubject.value;
    const existingWorkout = workouts.find(w => w.username === workout.username);
    if (existingWorkout) {
      existingWorkout.type += `, ${workout.type}`;
      existingWorkout.minutes += workout.minutes;
    } else {
      workouts.push(workout);
    }
    this.workoutsSubject.next(workouts);
    this.saveWorkoutsToLocalStorage(workouts);
  }

  private getWorkoutsFromLocalStorage(): Workout[] {
    const workouts = localStorage.getItem('workouts');
    return workouts ? JSON.parse(workouts) : [];
  }

  private saveWorkoutsToLocalStorage(workouts: Workout[]): void {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}
