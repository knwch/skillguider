import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpClient) {}

  allSkills: Array<Skill> = [];

  searchSkills(query: string): any {
    console.log('ddddddddd');
    return this.http.get<Skill[]>(
      `http://localhost:3000/api/skill/search?query=${query}`
    );
  }
}
