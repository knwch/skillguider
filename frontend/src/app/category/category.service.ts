import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwiaWF0IjoxNjE3MDAzNDU5LCJleHAiOjE2MTcwMDcwNTl9.IwzvYRoFf-wsIJnzekPVKmx31ALCdT2x7RElTJs3yV8`
    ),
  };

  allCategories: Array<Category> = [];

  fetchCategories(): any {
    return this.http.get<Category[]>(`/api/category/all/`);
  }

  getCategoryById(id: string): any {
    return this.http.get<Category[]>(`/api/category/id?id=${id}`);
  }

  deleteCategory(id: string): any {
    return this.http.delete(`/api/category/delete?id=${id}`, this.header);
  }

  addCategory(payload: Category): any {
    return this.http.post<Category>(
      `/api/category/create`,
      payload,
      this.header
    );
  }

  updateCategory(payload: Category, id: string): any {
    return this.http.put<Category>(
      `/api/category/update?id=${id}`,
      payload,
      this.header
    );
  }
}
