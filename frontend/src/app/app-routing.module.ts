import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { JobPageComponent } from './pages/job-page/job-page.component';
import { MyskillPageComponent } from './pages/myskill-page/myskill-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
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
  { path: 'auth', component: AuthPageComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminPageComponent },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
