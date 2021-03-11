import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Category } from '../models/category.model';
import {
  AddCategory,
  GetCategories,
  UpdateCategory,
  DeleteCategory,
  SetSelectedCategory,
  GetCategoryById,
} from '../actions/category.action';
import { CategoryService } from '../services/category.service';
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
