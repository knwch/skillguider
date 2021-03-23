import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  allJobs: Array<Job> = [];

  fetchJobs(): any {
    return this.http.get<Job[]>('/api/job/all/');
  }

  getJobsByCategory(query: string): any {
    return this.http.get<Job[]>(
      `/api/job/all/category?id=${query}`
    );
  }

  getJobById(id: string): any {
    return this.http.get<Job[]>(
      `/api/job/id?id=${id}`
    );
  }

  searchJobs(query: string): any {
    return this.http.get<Job[]>(
      `/api/job/search?title=${query}`
    );
  }
}
