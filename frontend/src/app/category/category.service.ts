import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  allCategories: Array<Category> = [];

  fetchCategories(): any {
    return this.http.get<Category[]>(`${environment.backendUrl}/category/all`);
  }

  getCategoryById(id: string): any {
    return this.http.get<Category[]>(`${environment.backendUrl}/category/id?id=${id}`);
  }

  deleteCategory(id: string): any {
    return this.http.delete(`${environment.backendUrl}/category/delete?id=${id}`);
  }

  addCategory(payload: Category): any {
    return this.http.post<Category>(`${environment.backendUrl}/category/create`, payload);
  }

  updateCategory(payload: Category, id: string): any {
    return this.http.put<Category>(`${environment.backendUrl}/category/update?id=${id}`, payload);
  }
}
