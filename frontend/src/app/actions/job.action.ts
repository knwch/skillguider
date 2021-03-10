import { Job } from '../models/job.model';

export class GetJobs {
  static readonly type = '[Job] Get';
}

export class GetJobsByCategory {
  static readonly type = '[Job] Get by Category';

  constructor(public query: string) {}
}

export class SearchJobs {
  static readonly type = '[Job] Search';

  constructor(public query: string) {}
}
