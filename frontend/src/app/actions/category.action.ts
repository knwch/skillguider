import { Category } from '../models/category.model';

export class AddCategory {
  static readonly type = '[Category] Add';

  constructor(public payload: Category) {}
}

export class GetCategories {
  static readonly type = '[Category] Get';
}

export class UpdateCategory {
  static readonly type = '[Category] Update';

  constructor(public payload: Category, public id: number) {}
}

export class DeleteCategory {
  static readonly type = '[Category] Delete';

  constructor(public id: number) {}
}

export class SetSelectedCategory {
  static readonly type = '[Category] Set';

  constructor(public payload: Category) {}
}
