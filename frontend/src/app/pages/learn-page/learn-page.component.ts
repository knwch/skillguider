import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SkillState } from '../../states/skill.state';
import { GetCourses, GetArticles } from '../../actions/skill.action';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit {
  @Select(SkillState.getSelectedSkill)
  selectedSkill: Observable<any> | undefined | any;

  @Select(SkillState.getCourseList)
  courses: Observable<any> | undefined | any;

  @Select(SkillState.getArticleList)
  articles: Observable<any> | undefined | any;

  skill: any;

  skillTitle: any;

  courseList: any;

  articleList: any;

  items!: any[];

  activeItem!: any;

  virtualProducts: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.skill) {
        this.skillTitle = params.skill;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.selectedSkill.subscribe((data: any) => {
      if (data) {
        this.skill = data;
      }
    });

    this.virtualProducts = Array.from({ length: 10000 });

    this.items = [
      {
        key: 'course',
        label: 'คอร์สเรียนแนะนำ',
        command: (event: any) => {
          this.onChangeTab(event.item);
        },
      },
      {
        key: 'article',
        label: 'บทความที่เกี่ยวข้อง',
        command: (event: any) => {
          this.onChangeTab(event.item);
        },
      },
    ];

    this.activeItem = this.items[0];

    this.fetchCourses();
  }

  async fetchCourses(): Promise<void> {
    await this.store.dispatch(new GetCourses(this.skillTitle)).toPromise();
    await this.courses.subscribe((data: any) => {
      if (data) {
        this.courseList = data;
      }
    });
  }

  async fetchArticles(): Promise<void> {
    await this.store.dispatch(new GetArticles(this.skillTitle)).toPromise();
    await this.articles.subscribe((data: any) => {
      if (data) {
        this.articleList = data;
      }
    });
  }

  async onChangeTab(item: any): Promise<void> {
    this.activeItem = item;

    if (item.key === 'course' && !this.courseList) {
      this.fetchCourses();
    }

    if (item.key === 'article' && !this.articleList) {
      this.fetchArticles();
    }
  }
}
