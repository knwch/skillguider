import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Skill } from './skill.model';
import {
  GetSkills,
  GetSkillsByJob,
  AddSkill,
  UpdateSkill,
  DeleteSkill,
  SearchSkills,
  SubmitSkill,
  SetSelectedSkill,
  GetCourses,
  GetArticles,
} from './skill.action';
import { SkillService } from './skill.service';
import { tap } from 'rxjs/operators';

export class SkillStateModel {
  skills: Skill[] | any;
  suggestedSkill: Skill[] | any;
  resultSkill: Skill[] | any;
  selectedSkill: Skill | any;
  courses: any;
  articles: any;
}

@Injectable()
@State<SkillStateModel>({
  name: 'skills',
  defaults: {
    skills: [],
    suggestedSkill: [],
    resultSkill: [],
    selectedSkill: null,
    courses: [],
    articles: [],
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
  static getResultSkillList(state: SkillStateModel): any {
    return state.resultSkill.data;
  }

  @Selector()
  static getSelectedSkill(state: SkillStateModel): any {
    return state.selectedSkill;
  }

  @Selector()
  static getCourseList(state: SkillStateModel): any {
    return state.courses.data;
  }

  @Selector()
  static getArticleList(state: SkillStateModel): any {
    return state.articles.data;
  }

  @Action(GetSkills)
  getSkills({ getState, setState }: StateContext<SkillStateModel>): any {
    return this.skillService.getAllSkills().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          skills: result,
        });
      })
    );
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
          resultSkill: result,
        });
      })
    );
  }

  @Action(GetCourses)
  getCoursesBySkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { query }: GetCourses
  ): any {
    return this.skillService.getCoursesBySkill(query).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          courses: result,
        });
      })
    );
  }

  @Action(GetArticles)
  getArticlesBySkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { query }: GetArticles
  ): any {
    return this.skillService.getArticlesBySkill(query).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          articles: result,
        });
      })
    );
  }

  @Action(AddSkill)
  addSkill(
    { getState, patchState }: StateContext<SkillStateModel>,
    { payload }: AddSkill
  ): any {
    return this.skillService.addSkill(payload).pipe(
      tap((result: any) => {
        const state = getState();
        patchState({
          skills: [...state.skills.data, result?.data],
        });
      })
    );
  }

  @Action(UpdateSkill)
  updateSkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { payload, id }: UpdateSkill
  ): any {
    return this.skillService.updateSkill(payload, id).pipe(
      tap((result: any) => {
        const state = getState();
        const skillList = [...state.skills.data];
        const skillIndex = skillList.findIndex((item) => item._id === id);
        skillList[skillIndex] = result?.data;
        setState({
          ...state,
          skills: skillList,
        });
      })
    );
  }

  @Action(DeleteSkill)
  deleteSkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { id }: DeleteSkill
  ): any {
    return this.skillService.deleteSkill(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.skills.data.filter(
          (item: any) => item._id !== id
        );
        setState({
          ...state,
          skills: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedSkill)
  setSelectedSkill(
    { getState, setState }: StateContext<SkillStateModel>,
    { payload }: SetSelectedSkill
  ): any {
    const state = getState();
    setState({
      ...state,
      selectedSkill: payload,
    });
  }
}
