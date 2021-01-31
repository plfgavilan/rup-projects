import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MemberDialogComponent } from './components/member-dialog/member-dialog.component';
import { MembersManagementComponent } from './components/members-management/members-management.component';
import { MenuComponent } from './components/menu/menu.component';
import { BasicDataComponent } from './components/plan-project/basic-data/basic-data.component';
import { IterationSizeComponent } from './components/plan-project/iteration-size/iteration-size.component';
import { PlanProjectComponent } from './components/plan-project/plan-project.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { UseCaseDialogComponent } from './components/use-case-dialog/use-case-dialog.component';
import { UseCasesManagementComponent } from './components/use-cases-management/use-cases-management.component';
import { MemberService } from './services/member.service';
import { PhaseService } from './services/phase.service';
import { ProjectService } from './services/project.service';
import { UseCaseService } from './services/use-case.service';
import { PhaseManagementComponent } from './components/phase-management/phase-management.component';
import { IterationService } from './services/iteration.service';
import { InitProjectComponent } from './components/init-project/init-project.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { IterationManagementComponent } from './components/iteration-management/iteration-management.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersManagementComponent,
    MemberDialogComponent,
    MenuComponent,
    UseCasesManagementComponent,
    UseCaseDialogComponent,
    PlanProjectComponent,
    BasicDataComponent,
    IterationSizeComponent,
    ProjectManagementComponent,
    PhaseManagementComponent,
    InitProjectComponent,
    IterationManagementComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    MemberService,
    ProjectService,
    UseCaseService,
    MatDialog,
    PhaseService,
    IterationService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
