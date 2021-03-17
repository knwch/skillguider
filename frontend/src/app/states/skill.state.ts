import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Skill } from '../models/skill.model';
import {
  GetSkillsByJob,
  SearchSkills,
  SubmitSkill,
} from '../actions/skill.action';
import { SkillService } from '../services/skill.service';
import { tap } from 'rxjs/operators';

export class SkillStateModel {
  skills: Skill[] | any;
  suggestedSkill: Skill[] | any;
  selectedSkill: Skill | any;
}

@Injectable()
@State<SkillStateModel>({
  name: 'skills',
  defaults: {
    skills: [],
    suggestedSkill: [],
    selectedSkill: null,
  },
})
export class SkillState {
  constructor(private skillService: SkillService) {}

  @Selector()
  static getSkillList(state: SkillStateModel): any {
    return state.skills.data;
  }

  @Selector()
  static getSuggestSkillList(state: SkillStateModel): any {
    return state.suggestedSkill.data;
  }

  @Selector()
  static getSelectedSkill(state: SkillStateModel): any {
    return state.selectedSkill;
  }

  @Action(GetSkillsByJob)
  getSkillsByJob(
    { getState, setState }: StateContext<SkillStateModel>,
    { id }: GetSkillsByJob
  ): any {
    return this.skillService.getSkillsByJob(id).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          suggestedSkill: result,
        });
      })
    );
  }

  @Action(SearchSkills)
  searchSkills(
    { getState, setState }: StateContext<SkillStateModel>,
    { query }: SearchSkills
  ): any {
    return this.skillService.searchSkills(query).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          skills: result,
        });
      })
    );
  }

  @Action(SubmitSkill)
  submitSkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { payload }: SubmitSkill
  ): any {
    return this.skillService.submitSkill(payload).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          skills: result,
        });
      })
    );
  }

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
