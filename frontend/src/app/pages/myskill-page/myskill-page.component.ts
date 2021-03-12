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
  suggestedSkills: Observable<any> | undefined;

  @Select(JobState.getSelectedJob)
  selectedJob: Observable<any> | undefined | any;

  text: any;

  job: any;

  jobId: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.jobId = params.job;
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
  }

  onSearch(event: string): any {
    const { query }: any = event;
    this.store.dispatch(new SearchSkills(query));
  }
}
