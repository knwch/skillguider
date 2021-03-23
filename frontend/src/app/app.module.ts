import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from './primeng.module';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { MyskillPageComponent } from './pages/myskill-page/myskill-page.component';
import { JobPageComponent } from './pages/job-page/job-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { CategoryState } from './states/category.state';
import { JobState } from './states/job.state';
import { SkillState } from './states/skill.state';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CategoryPageComponent,
    JobPageComponent,
    FooterComponent,
    NotfoundPageComponent,
    MyskillPageComponent,
    ResultPageComponent,
    LearnPageComponent,
  ],
  imports: [
    BrowserModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot([CategoryState, JobState, SkillState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
