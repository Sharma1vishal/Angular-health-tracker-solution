import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Workout } from '../workout-service.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() workouts: Workout[] = [];
  selectedUser: string = '';
  userWorkouts: Workout[] = [];
  workoutTypes: string[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.updateChart();
  }

  ngAfterViewInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workouts']) {
      this.updateChart();
    }
  }

  onSelectUser(user: string): void {
    this.selectedUser = user;
    this.userWorkouts = this.workouts.filter(workout => workout.username === user);
    this.workoutTypes = Array.from(new Set(this.userWorkouts.map(workout => workout.type.split(', ')).flat()));
    this.updateChart();
  }

  updateChart(): void {
    setTimeout(() => {  // Add a delay to ensure the view is updated
      this.workoutTypes.forEach(type => {
        const canvas = <HTMLCanvasElement>document.getElementById(`chart-${type}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const filteredWorkouts = this.userWorkouts.filter(workout => workout.type.includes(type));
        const labels = filteredWorkouts.map(workout => workout.type);
        const data = filteredWorkouts.map(workout => workout.minutes);

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: `${type} Minutes`,
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    }, 100);
  }
}
