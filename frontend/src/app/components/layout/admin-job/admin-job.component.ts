import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JobState } from '../../../states/job.state';
import { GetJobs } from '../../../actions/job.action';
import { CategoryState } from '../../../states/category.state';
import { GetCategories } from '../../../actions/category.action';
import { SkillState } from '../../../states/skill.state';
import { GetSkills } from '../../../actions/skill.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdminJobComponent implements OnInit {
  @Select(JobState.getJobList)
  jobs: Observable<any> | undefined | any;

  @Select(CategoryState.getCategoryList)
  categories: Observable<any> | undefined | any;

  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined | any;

  jobDialogOpen = false;

  jobList!: any[];

  job: any;

  isOpenCreateNew = false;

  categoryList: any;

  categoryDict: any = {};

  selectedSkillSet: any;

  skillList: any;

  skillDict: any = {};

  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.store.dispatch(new GetSkills()).toPromise();

    await this.skills.subscribe((data: any) => {
      if (data) {
        this.skillList = data;

        this.skillList.forEach((skill: any) => {
          this.skillDict[skill._id] = skill.title;
        });
      }
    });

    await this.store.dispatch(new GetCategories()).toPromise();

    await this.categories.subscribe((data: any) => {
      if (data) {
        this.categoryList = data;

        this.categoryList.forEach((category: any) => {
          this.categoryDict[category._id] = category.title;
        });
      }
    });

    this.getJobs();
  }

  async getJobs(): Promise<void> {
    await this.store.dispatch(new GetJobs()).toPromise();

    await this.jobs.subscribe((data: any) => {
      if (data) {
        this.jobList = data;
      }
    });
  }
}
