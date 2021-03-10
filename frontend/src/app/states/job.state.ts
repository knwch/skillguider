import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Job } from '../models/job.model';
import { GetJobs, GetJobsByCategory, SearchJobs } from '../actions/job.action';
import { JobService } from '../services/job.service';
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

  @Action(GetJobsByCategory)
  getJobsByCategory(
    { getState, setState }: StateContext<JobStateModel>,
    { query }: GetJobsByCategory
  ): any {
    return this.jobService.getJobsByCategory(query).pipe(
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

  //   @Action(AddCategory)
  //   addCategory(
  //     { getState, patchState }: StateContext<TodoStateModel>,
  //     { payload }: AddTodo
  //   ) {
  //     return this.todoService.addTodo(payload).pipe(
  //       tap((result) => {
  //         const state = getState();
  //         patchState({
  //           todos: [...state.todos, result],
  //         });
  //       })
  //     );
  //   }

  //   @Action(UpdateTodo)
  //   updateTodo(
  //     { getState, setState }: StateContext<TodoStateModel>,
  //     { payload, id }: UpdateTodo
  //   ) {
  //     return this.todoService.updateTodo(payload, id).pipe(
  //       tap((result) => {
  //         const state = getState();
  //         const todoList = [...state.todos];
  //         const todoIndex = todoList.findIndex((item) => item.id === id);
  //         todoList[todoIndex] = result;
  //         setState({
  //           ...state,
  //           todos: todoList,
  //         });
  //       })
  //     );
  //   }

  //   @Action(DeleteTodo)
  //   deleteTodo(
  //     { getState, setState }: StateContext<TodoStateModel>,
  //     { id }: DeleteTodo
  //   ) {
  //     return this.todoService.deleteTodo(id).pipe(
  //       tap(() => {
  //         const state = getState();
  //         const filteredArray = state.todos.filter((item) => item.id !== id);
  //         setState({
  //           ...state,
  //           todos: filteredArray,
  //         });
  //       })
  //     );
  //   }

  //   @Action(SetSelectedTodo)
  //   setSelectedTodoId(
  //     { getState, setState }: StateContext<TodoStateModel>,
  //     { payload }: SetSelectedTodo
  //   ) {
  //     const state = getState();
  //     setState({
  //       ...state,
  //       selectedTodo: payload,
  //     });
  //   }
}
