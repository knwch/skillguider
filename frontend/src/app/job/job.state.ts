import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Job } from './job.model';
import {
  GetJobs,
  GetJobById,
  GetJobsByCategory,
  SearchJobs,
  AddJob,
  UpdateJob,
  DeleteJob,
  SetSelectedJob,
} from './job.action';
import { JobService } from './job.service';
import { tap } from 'rxjs/operators';

export class JobStateModel {
  jobs: Job[] | any;
  selectedJob: Job | any;
}

@Injectable()
@State<JobStateModel>({
  name: 'jobs',
  defaults: {
    jobs: [],
    selectedJob: null,
  },
})
export class JobState {
  constructor(private jobService: JobService) {}

  @Selector()
  static getJobList(state: JobStateModel): any {
    return state.jobs.data;
  }

  @Selector()
  static getSelectedJob(state: JobStateModel): any {
    return state.selectedJob;
  }

  @Action(GetJobs)
  getCategories({ getState, setState }: StateContext<JobStateModel>): any {
    return this.jobService.fetchJobs().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          jobs: result,
        });
      })
    );
  }

  @Action(GetJobById)
  getJobsById(
    { getState, setState }: StateContext<JobStateModel>,
    { id }: GetJobById
  ): any {
    return this.jobService.getJobById(id).pipe(
      tap((result: any) => {
        const state = getState();
        setState({
          ...state,
          selectedJob: result?.data,
        });
      })
    );
  }

  @Action(GetJobsByCategory)
  getJobsByCategory(
    { getState, setState }: StateContext<JobStateModel>,
    { id }: GetJobsByCategory
  ): any {
    return this.jobService.getJobsByCategory(id).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          jobs: result,
        });
      })
    );
  }

  @Action(SearchJobs)
  searchJobs(
    { getState, setState }: StateContext<JobStateModel>,
    { query }: SearchJobs
  ): any {
    return this.jobService.searchJobs(query).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          jobs: result,
        });
      })
    );
  }

  @Action(AddJob)
  addJob(
    { getState, patchState }: StateContext<JobStateModel>,
    { payload }: AddJob
  ): any {
    return this.jobService.addJob(payload).pipe(
      tap((result: any) => {
        const state = getState();
        patchState({
          jobs: [...state.jobs.data, result?.data],
        });
      })
    );
  }

  @Action(UpdateJob)
  updateJob(
    { getState, setState }: StateContext<JobStateModel>,
    { payload, id }: UpdateJob
  ): any {
    return this.jobService.updateJob(payload, id).pipe(
      tap((result: any) => {
        const state = getState();
        const jobList = [...state.jobs.data];
        const categoryIndex = jobList.findIndex((item) => item._id === id);
        jobList[categoryIndex] = result?.data;
        setState({
          ...state,
          jobs: jobList,
        });
      })
    );
  }

  @Action(DeleteJob)
  deleteJob(
    { getState, setState }: StateContext<JobStateModel>,
    { id }: DeleteJob
  ): any {
    return this.jobService.deleteJob(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.jobs.data.filter(
          (item: any) => item._id !== id
        );
        setState({
          ...state,
          jobs: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedJob)
  setSelectedJob(
    { getState, setState }: StateContext<JobStateModel>,
    { payload }: SetSelectedJob
  ): any {
    const state = getState();
    setState({
      ...state,
      selectedJob: payload,
    });
  }
}
