import { Component, OnInit } from '@angular/core';
import { CategoryState } from '../../category/category.state';
import { GetCategoryById } from '../../category/category.action';
import { JobState } from '../../job/job.state';
import { GetJobsByCategory, SetSelectedJob } from '../../job/job.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss'],
})
export class JobPageComponent implements OnInit {
  @Select(CategoryState.getSelectedCategory)
  selectedCategory: Observable<any> | undefined | any;

  @Select(JobState.getJobList)
  jobs: Observable<any> | undefined;

  categoryId: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryId = route.snapshot.params.id;
  }

  sliceOptions: any = {
    start: 0,
    end: 80,
    default: 80,
  };

  details = {
    desc:
      // tslint:disable-next-line:quotemark
      "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.sdfsdfdatsdgh",
  };

  displayModal = false;

  selectedResult: any = {};

  category: any;

  async ngOnInit(): Promise<void> {
    await this.store
      .dispatch(new GetJobsByCategory(this.categoryId))
      .toPromise();

    await this.selectedCategory.subscribe((data: any) => {
      if (data) {
        this.category = data;
      }
    });

    if (!this.category) {
      await this.store
        .dispatch(new GetCategoryById(this.categoryId))
        .toPromise();
      await this.selectedCategory.subscribe((data: any) => {
        if (data) {
          this.category = data;
        } else {
          this.router.navigate(['']);
        }
      });
    }
  }

  displayDialog(job: any): any {
    this.displayModal = true;
    this.selectedResult = job;
  }

  onSelectJob(job: any): any {
    this.store.dispatch(new SetSelectedJob(job));
    this.router.navigate(['/myskill'], { queryParams: { job: job._id } });
  }

  onExpandText(evt: any): void {
    this.sliceOptions.end = this.sliceOptions.end
      ? undefined
      : this.sliceOptions.default;
  }
}
