import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from './skill.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpClient) {}

  allSkills: Array<Skill> = [];

  getAllSkills(): any {
    return this.http.get<Skill[]>(`${environment.backendUrl}/skill/all`);
  }

  getSkillsByJob(id: string): any {
    return this.http.get<Skill[]>(
      `${environment.backendUrl}/skill/job?id=${id}`
    );
  }

  addSkill(payload: Skill): any {
    return this.http.post<Skill>(
      `${environment.backendUrl}/skill/create`,
      payload
    );
  }

  deleteSkill(id: string): any {
    return this.http.delete(`${environment.backendUrl}/skill/delete?id=${id}`);
  }

  updateSkill(payload: Skill, id: string): any {
    return this.http.put<Skill>(
      `${environment.backendUrl}/skill/update?id=${id}`,
      payload
    );
  }

  searchSkills(query: string): any {
    return this.http.get<Skill[]>(
      `${environment.backendUrl}/skill/search?query=${query}`
    );
  }

  submitSkill(payload: Skill): any {
    return this.http.post<Skill>(
      `${environment.backendUrl}/skill/submit`,
      payload
    );
  }

  getCoursesBySkill(query: string): any {
    return this.http.get<Skill[]>(
      `${environment.backendUrl}/skill/course?query=${query}`
    );
  }

  getArticlesBySkill(query: string): any {
    return this.http.get<Skill[]>(
      `${environment.backendUrl}/skill/article?query=${query}`
    );
  }
}
