import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JobState } from '../../states/job.state';
import { GetJobById } from '../../actions/job.action';
import { SkillState } from '../../states/skill.state';
import { Skill } from '../../models/skill.model';
import { SearchSkills, GetSkillsByJob } from '../../actions/skill.action';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myskill-page',
  templateUrl: './myskill-page.component.html',
  styleUrls: ['./myskill-page.component.scss'],
})
export class MyskillPageComponent implements OnInit {
  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined;

  @Select(SkillState.getSuggestSkillList)
  suggestedSkills: Observable<any> | undefined | any;

  @Select(JobState.getSelectedJob)
  selectedJob: Observable<any> | undefined | any;

  text: any;

  job: any;

  jobId: any;

  mySkill: any = [];

  suggestSkillArray: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.job) {
        this.jobId = params.job;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.selectedJob.subscribe((data: any) => {
      if (data) {
        this.job = data;
      }
    });

    await this.store.dispatch(new GetSkillsByJob(this.jobId)).toPromise();

    if (!this.job) {
      await this.store.dispatch(new GetJobById(this.jobId)).toPromise();

      await this.selectedJob.subscribe((data: any) => {
        if (data) {
          this.job = data;
        } else {
          this.router.navigate(['']);
        }
      });
    }

    await this.suggestedSkills.subscribe((data: any) => {
      if (data) {
        this.suggestSkillArray = data;
      }
    });
  }

  onSearch(event: string): any {
    const { query }: any = event;
    this.store.dispatch(new SearchSkills(query));
  }

  onSelectSkill(skill: any): any {
    if (!this.mySkill.some((element: any) => element._id === skill._id)) {
      this.mySkill.push(skill);
      this.suggestSkillArray = this.suggestSkillArray.filter((element: any) => {
        return element._id !== skill._id;
      });
    }
    console.log(this.mySkill);
  }

  onRemoveSkill(skill: any): any {
    this.mySkill = this.mySkill.filter((element: any) => {
      return element._id !== skill._id;
    });

    this.suggestedSkills.subscribe((data: any) => {
      if (data) {
        if (data.some((element: any) => element._id === skill._id)) {
          this.suggestSkillArray.push(skill);
        }
      }
    });
  }

  onSubmit(): any {}
}
