import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  allJobs: Array<Job> = [];

  fetchJobs(): any {
    return this.http.get<Job[]>(`${environment.backendUrl}/job/all`);
  }

  getJobsByCategory(id: string): any {
    return this.http.get<Job[]>(`${environment.backendUrl}/job/all/category?id=${id}`);
  }

  getJobById(id: string): any {
    return this.http.get<Job[]>(`${environment.backendUrl}/job/id?id=${id}`);
  }

  searchJobs(query: string): any {
    return this.http.get<Job[]>(`${environment.backendUrl}/job/search?title=${query}`);
  }

  addJob(payload: Job): any {
    return this.http.post<Job>(`${environment.backendUrl}/job/create`, payload);
  }

  updateJob(payload: Job, id: string): any {
    return this.http.put<Job>(`${environment.backendUrl}/job/update?id=${id}`, payload);
  }

  deleteJob(id: string): any {
    return this.http.delete(`${environment.backendUrl}/job/delete?id=${id}`);
  }
}
