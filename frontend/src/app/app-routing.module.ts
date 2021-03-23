import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { JobPageComponent } from './pages/job-page/job-page.component';
import { MyskillPageComponent } from './pages/myskill-page/myskill-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full' },
  {
    path: 'category',
    children: [
      { path: ':id', component: JobPageComponent },
      { path: '', component: CategoryPageComponent, pathMatch: 'full' },
    ],
  },
  { path: 'myskill', component: MyskillPageComponent },
  { path: 'result', component: ResultPageComponent },
  { path: 'learn', component: LearnPageComponent },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
