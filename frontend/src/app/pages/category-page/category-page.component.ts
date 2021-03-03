import { Component, OnInit } from '@angular/core';
import { CategoryState } from '../../states/category.state';
import { Category } from '../../models/category.model';
import { GetCategories } from '../../actions/category.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
})
export class CategoryPageComponent implements OnInit {
  @Select(CategoryState.getCategoryList)
  categories: Observable<any> | undefined;

  constructor(private store: Store, private primengConfig: PrimeNGConfig) {
    // this.categories = this.store.select((state) => state.categories.data);
  }

  items: any = [];

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    this.primengConfig.ripple = true;
  }
}
