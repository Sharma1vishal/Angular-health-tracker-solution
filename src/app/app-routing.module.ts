import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
const routes: Routes = [
  {path: 'workout-form',component:WorkoutFormComponent},
  {path: 'workout-chart',component:WorkoutChartComponent},
  {path : '', redirectTo: 'app-component', pathMatch: 'full'},
  {path: 'workout-list',component:WorkoutListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
