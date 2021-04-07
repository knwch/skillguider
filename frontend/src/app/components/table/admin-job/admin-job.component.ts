import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JobState } from '../../../job/job.state';
import { GetJobs, AddJob, UpdateJob, DeleteJob } from '../../../job/job.action';
import { CategoryState } from '../../../category/category.state';
import { GetCategories } from '../../../category/category.action';
import { SkillState } from '../../../skill/skill.state';
import { GetSkills } from '../../../skill/skill.action';
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

  isOpenCreateJob = false;

  categoryList: any;

  categoryDict: any = {};

  selectedHighSkillSet: any = [];

  selectedNormalSkillSet: any = [];

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

    console.log(this.skillList);

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

  newJob(): any {
    this.job = {};
    this.selectedHighSkillSet = [];
    this.selectedNormalSkillSet = [];
    this.jobDialogOpen = true;
    this.isOpenCreateJob = true;
  }

  editJob(jobData: any): any {
    this.job = { ...jobData };
    this.job.skillset.map((skill: any) => {
      if (skill.priority === 'High') {
        this.selectedHighSkillSet.push(skill.skill_id);
      } else if (skill.priority === 'Normal') {
        this.selectedNormalSkillSet.push(skill.skill_id);
      }
    });
    this.jobDialogOpen = true;
    this.isOpenCreateJob = false;
  }

  async saveJob(): Promise<any> {
    const skillSetObjectArray: any = [];

    this.selectedHighSkillSet.filter((highSkill: any) => {
      const index = this.selectedNormalSkillSet.indexOf(highSkill);
      if (index !== -1) {
        this.selectedNormalSkillSet.splice(index, 1);
      }
    });

    this.selectedHighSkillSet.forEach((id: any) => {
      skillSetObjectArray.push({ skill_id: id, priority: 'High' });
    });

    this.selectedNormalSkillSet.forEach((id: any) => {
      skillSetObjectArray.push({ skill_id: id, priority: 'Normal' });
    });

    const data = {
      title: this.job.title,
      category_id: this.job.category_id,
      description: this.job.description ? this.job.description : '',
      skillset: skillSetObjectArray,
    };

    this.isOpenCreateJob
      ? // create method
        await this.store
          .dispatch(new AddJob(data))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Created',
                life: 3000,
              });
              this.getJobs();
              this.closeDialog();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise()
      : // edit method
        await this.store
          .dispatch(new UpdateJob(data, this.job._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Updated',
                life: 3000,
              });
              this.getJobs();
              this.closeDialog();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();
  }

  async deleteJob(jobData: any): Promise<any> {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete "' + jobData.title + '" ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.store
          .dispatch(new DeleteJob(jobData._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Deleted',
                life: 3000,
              });
              this.getJobs();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();
      },
    });
  }

  closeDialog(): any {
    this.jobDialogOpen = false;
    this.job = {};
    this.selectedHighSkillSet = [];
    this.selectedNormalSkillSet = [];
  }
}
