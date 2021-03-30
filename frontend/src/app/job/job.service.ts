import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  allJobs: Array<Job> = [];

  fetchJobs(): any {
    return this.http.get<Job[]>('/api/job/all');
  }

  getJobsByCategory(id: string): any {
    return this.http.get<Job[]>(`/api/job/all/category?id=${id}`);
  }

  getJobById(id: string): any {
    return this.http.get<Job[]>(`/api/job/id?id=${id}`);
  }

  searchJobs(query: string): any {
    return this.http.get<Job[]>(`/api/job/search?title=${query}`);
  }

  addJob(payload: Job): any {
    return this.http.post<Job>(`/api/job/create`, payload);
  }

  updateJob(payload: Job, id: string): any {
    return this.http.put<Job>(`/api/job/update?id=${id}`, payload);
  }

  deleteJob(id: string): any {
    return this.http.delete(`/api/job/delete?id=${id}`);
  }
}
