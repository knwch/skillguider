import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  allCategories: Array<Category> = [];

  fetchCategories(): any {
    return this.http.get<Category[]>(`/api/category/all`);
  }

  getCategoryById(id: string): any {
    return this.http.get<Category[]>(`/api/category/id?id=${id}`);
  }

  deleteCategory(id: string): any {
    return this.http.delete(`/api/category/delete?id=${id}`);
  }

  addCategory(payload: Category): any {
    return this.http.post<Category>(`/api/category/create`, payload);
  }

  updateCategory(payload: Category, id: string): any {
    return this.http.put<Category>(`/api/category/update?id=${id}`, payload);
  }
}
