import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpClient) {}

  allSkills: Array<Skill> = [];

  getSkillsByJob(id: string): any {
    return this.http.get<Skill[]>(
      `http://localhost:3000/api/skill/job?id=${id}`
    );
  }

  searchSkills(query: string): any {
    return this.http.get<Skill[]>(
      `http://localhost:3000/api/skill/search?query=${query}`
    );
  }

  submitSkill(payload: Skill): any {
    return this.http.post<Skill>(
      'http://localhost:3000/api/skill/submit',
      payload
    );
  }
}
