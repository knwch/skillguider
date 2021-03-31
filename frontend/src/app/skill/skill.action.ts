import { Skill } from './skill.model';

export class GetSkills {
  static readonly type = '[Skill] Get';
}

export class AddSkill {
  static readonly type = '[Skill] Add';

  constructor(public payload: Skill) {}
}

export class UpdateSkill {
  static readonly type = '[Skill] Update';

  constructor(public payload: Skill, public id: string) {}
}

export class DeleteSkill {
  static readonly type = '[Skill] Delete';

  constructor(public id: string) {}
}

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
