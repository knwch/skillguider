import { Job } from './job.model';

export class GetJobs {
  static readonly type = '[Job] Get';
}

export class GetJobById {
  static readonly type = '[Job] Get Id';

  constructor(public id: string) {}
}

export class GetJobsByCategory {
  static readonly type = '[Job] Get by Category';

  constructor(public id: string) {}
}

export class SearchJobs {
  static readonly type = '[Job] Search';

  constructor(public query: string) {}
}

export class AddJob {
  static readonly type = '[Job] Add';

  constructor(public payload: Job) {}
}

export class UpdateJob {
  static readonly type = '[Job] Update';

  constructor(public payload: Job, public id: string) {}
}

export class DeleteJob {
  static readonly type = '[Job] Delete';

  constructor(public id: string) {}
}

export class SetSelectedJob {
  static readonly type = '[Job] Set';

  constructor(public payload: Job) {}
}
