import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpClient) {}

  allSkills: Array<Skill> = [];

  getAllSkills(): any {
    return this.http.get<Skill[]>(`/api/skill/all`);
  }

  getSkillsByJob(id: string): any {
    return this.http.get<Skill[]>(`/api/skill/job?id=${id}`);
  }

  searchSkills(query: string): any {
    return this.http.get<Skill[]>(`/api/skill/search?query=${query}`);
  }

  submitSkill(payload: Skill): any {
    return this.http.post<Skill>('/api/skill/submit', payload);
  }

  getCoursesBySkill(query: string): any {
    return this.http.get<Skill[]>(`/api/skill/course?query=${query}`);
  }

  getArticlesBySkill(query: string): any {
    return this.http.get<Skill[]>(`/api/skill/article?query=${query}`);
  }
}
