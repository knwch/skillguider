import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryState } from '../../states/category.state';
import {
  GetCategories,
  SetSelectedCategory,
} from '../../actions/category.action';
import { SkillState } from '../../states/skill.state';
import { GetSkills } from '../../actions/skill.action';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  @Select(CategoryState.getCategoryList)
  categories: Observable<any> | undefined | any;

  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined | any;

  categoryform!: FormGroup;

  categoryDialogOpen = false;

  categoryList!: any[];

  skillList!: any[];

  allColumns: any;

  skillDict: any = {};

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    await this.store.dispatch(new GetSkills()).toPromise();

    await this.skills.subscribe((data: any) => {
      if (data) {
        this.skillList = data;

        this.skillList.forEach((skill) => {
          this.skillDict[skill._id] = skill.title;
        });
      }
    });

    await this.store.dispatch(new GetCategories()).toPromise();

    await this.categories.subscribe((data: any) => {
      if (data) {
        this.categoryList = data;
      }
    });

    this.allColumns = [
      ...this.categoryList.reduce(
        (set, object) => (
          Object.keys(object).forEach((key) => set.add(key)), set
        ),
        new Set()
      ),
    ];

    const warpColumns: any[] = [];
    this.allColumns.forEach((element: any) => {
      warpColumns.push({
        field: element,
        header: element[0].toUpperCase() + element.slice(1),
      });
    });
    this.allColumns = warpColumns;
  }

  editCategory(categoryData: any): any {
    this.categoryDialogOpen = true;
    console.log(categoryData);
  }
}
