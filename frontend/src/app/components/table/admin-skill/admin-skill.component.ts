import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SkillState } from '../../../skill/skill.state';
import {
  GetSkills,
  AddSkill,
  UpdateSkill,
  DeleteSkill,
} from '../../../skill/skill.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skill',
  templateUrl: './admin-skill.component.html',
  styleUrls: ['./admin-skill.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdminSkillComponent implements OnInit {
  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined | any;

  skillDialogOpen = false;

  skillList!: any[];

  skill: any;

  isOpenCreateSkill = false;

  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getSkills();
  }

  async getSkills(): Promise<void> {
    await this.store.dispatch(new GetSkills()).toPromise();

    await this.skills.subscribe((data: any) => {
      if (data) {
        this.skillList = data;
      }
    });
  }

  newSkill(): any {
    this.skill = {};
    this.skillDialogOpen = true;
    this.isOpenCreateSkill = true;
  }

  editSkill(skillData: any): any {
    this.skill = { ...skillData };
    this.skillDialogOpen = true;
    this.isOpenCreateSkill = false;
  }

  async saveSkill(): Promise<any> {
    const data = {
      title: this.skill.title,
      keyword_suffix: this.skill.keyword_suffix,
    };

    this.isOpenCreateSkill
      ? // create method
        await this.store
          .dispatch(new AddSkill(data))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Skill Created',
                life: 3000,
              });
              this.getSkills();
              this.closeDialog();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise()
      : // edit method
        await this.store
          .dispatch(new UpdateSkill(data, this.skill._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Skill Updated',
                life: 3000,
              });
              this.getSkills();
              this.closeDialog();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();
  }

  async deleteSkill(skillData: any): Promise<any> {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete "' + skillData.title + '" ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.store
          .dispatch(new DeleteSkill(skillData._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Skill Deleted',
                life: 3000,
              });
              this.getSkills();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();
      },
    });
  }

  closeDialog(): any {
    this.skill = {};
    this.skillDialogOpen = false;
  }
}
