import { Component, OnInit } from '@angular/core';
import { CategoryState } from '../../states/category.state';
import { Category } from '../../models/category.model';
import { GetCategories } from '../../actions/category.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
})
export class CategoryPageComponent implements OnInit {
  @Select(CategoryState.getCategoryList) categories:
    | Observable<Category[]>
    | any;

  constructor(private store: Store) {
    console.log('asf', this.store.select((state) => state));
    // this.categories = this.store.select((state) => state.categories.data);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
  }
}
