import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Member} from '../../shared/models/member';
import {MemberRole} from '../../shared/models/member-role.enum';
import {MemberProxyService} from '../../shared/services/member-proxy.service';
import {MemberFormGroup} from './member-form-group';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {
  form: MemberFormGroup = new MemberFormGroup();
  eMemberRole = MemberRole;

  constructor(private memberService: MemberProxyService, private marDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Member) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  create(): void {
    this.memberService
      .createMember(this.form.getRawValue())
      .subscribe(() => this.marDialog.closeAll());
  }

  update(): void {
    this.memberService
      .updateMember(this.form.getRawValue())
      .subscribe(() => this.marDialog.closeAll());
  }

  getMemberRoles(): MemberRole[] {
    return Object.values(MemberRole);
  }

  isCreate(): boolean {
    return this.form.id.value === null;
  }

}
