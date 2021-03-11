import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SkillState } from '../../states/skill.state';
import { Skill } from '../../models/skill.model';
import { SearchSkills } from '../../actions/skill.action';

@Component({
  selector: 'app-myskill-page',
  templateUrl: './myskill-page.component.html',
  styleUrls: ['./myskill-page.component.scss'],
})
export class MyskillPageComponent implements OnInit {
  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined;

  text: any;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onSearch(event: string): any {
    const { query }: any = event;
    this.store.dispatch(new SearchSkills(query));
  }
}
