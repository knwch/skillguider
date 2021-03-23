import { Skill } from '../models/skill.model';

export class SearchSkills {
  static readonly type = '[Skill] Search';

  constructor(public query: string) {}
}

export class GetSkillsByJob {
  static readonly type = '[Skill] Get by Job';

  constructor(public id: string) {}
}

export class SubmitSkill {
  static readonly type = '[Skill] Submit Skill';

  constructor(public payload: any) {}
}

export class SetSelectedSkill {
  static readonly type = '[Skill] Set';

  constructor(public payload: Skill) {}
}

export class GetCourses {
  static readonly type = '[Skill] Get Courses';

  constructor(public query: string) {}
}

export class GetArticles {
  static readonly type = '[Skill] Get Articles';

  constructor(public query: string) {}
}
