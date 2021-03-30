import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Category } from './category.model';
import {
  AddCategory,
  GetCategories,
  UpdateCategory,
  DeleteCategory,
  SetSelectedCategory,
  GetCategoryById,
} from './category.action';
import { CategoryService } from './category.service';
import { tap } from 'rxjs/operators';

export class CategoryStateModel {
  categories: Category[] | any;
  selectedCategory: Category | any;
}

@Injectable()
@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    selectedCategory: null,
  },
})
export class CategoryState {
  constructor(private categoryService: CategoryService) {}

  @Selector()
  static getCategoryList(state: CategoryStateModel): any {
    return state.categories.data;
  }

  @Selector()
  static getSelectedCategory(state: CategoryStateModel): any {
    return state.selectedCategory;
  }

  @Action(GetCategories)
  getCategories({ getState, setState }: StateContext<CategoryStateModel>): any {
    return this.categoryService.fetchCategories().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          categories: result,
        });
      })
    );
  }

  @Action(GetCategoryById)
  getCategoryById(
    { getState, setState }: StateContext<CategoryStateModel>,
    { id }: GetCategoryById
  ): any {
    return this.categoryService.getCategoryById(id).pipe(
      tap((result: any) => {
        const state = getState();
        setState({
          ...state,
          selectedCategory: result?.data,
        });
      })
    );
  }

  @Action(AddCategory)
  addCategory(
    { getState, patchState }: StateContext<CategoryStateModel>,
    { payload }: AddCategory
  ): any {
    return this.categoryService.addCategory(payload).pipe(
      tap((result: any) => {
        const state = getState();
        patchState({
          categories: [...state.categories.data, result?.data],
        });
      })
    );
  }

  @Action(UpdateCategory)
  updateCategory(
    { getState, setState }: StateContext<CategoryStateModel>,
    { payload, id }: UpdateCategory
  ): any {
    return this.categoryService.updateCategory(payload, id).pipe(
      tap((result: any) => {
        const state = getState();
        const categoryList = [...state.categories.data];
        const categoryIndex = categoryList.findIndex((item) => item._id === id);
        categoryList[categoryIndex] = result?.data;
        setState({
          ...state,
          categories: categoryList,
        });
      })
    );
  }

  @Action(DeleteCategory)
  deleteCategory(
    { getState, setState }: StateContext<CategoryStateModel>,
    { id }: DeleteCategory
  ): any {
    return this.categoryService.deleteCategory(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.categories.data.filter(
          (item: any) => item._id !== id
        );
        setState({
          ...state,
          categories: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedCategory)
  setSelectedCategory(
    { getState, setState }: StateContext<CategoryStateModel>,
    { payload }: SetSelectedCategory
  ): any {
    const state = getState();
    setState({
      ...state,
      selectedCategory: payload,
    });
  }
}
