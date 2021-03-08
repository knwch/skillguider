import { Job } from '../models/job.model';

export class GetJobs {
  static readonly type = '[Job] Get';
}

export class SearchJobs {
  static readonly type = '[Job] Search';

  constructor(public query: string) {}
}
