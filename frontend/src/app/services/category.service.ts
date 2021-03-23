import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  allCategories: Array<Category> = [];

  fetchCategories(): any {
    return this.http.get<Category[]>(`/api/category/all/`);
  }

  getCategoryById(id: string): any {
    return this.http.get<Category[]>(
      `/api/category/id?id=${id}`
    );
  }

  deleteCategory(id: number): any {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  addCategory(payload: Category): any {
    return this.http.post<Category>(
      'https://jsonplaceholder.typicode.com/todos',
      payload
    );
  }

  updateCategory(payload: Category, id: number): any {
    return this.http.put<Category>(
      'https://jsonplaceholder.typicode.com/todos/' + id,
      payload
    );
  }
}
