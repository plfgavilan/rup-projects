import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitProjectComponent } from './components/init-project/init-project.component';
import { IterationManagementComponent } from './components/iteration-management/iteration-management.component';
import { MembersManagementComponent } from './components/members-management/members-management.component';
import { PhaseManagementComponent } from './components/phase-management/phase-management.component';
import { PlanProjectComponent } from './components/plan-project/plan-project.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { UseCasesManagementComponent } from './components/use-cases-management/use-cases-management.component';

const routes: Routes = [
  {path: '', component: InitProjectComponent},
  {path: 'plan-project', component: PlanProjectComponent},
  {path: 'use-cases-management', component: UseCasesManagementComponent},
  {path: 'members-management', component: MembersManagementComponent},
  {path: 'project-management', component: ProjectManagementComponent},
  {path: 'phase-management', component: PhaseManagementComponent},
  {path: 'iteration-management', component: IterationManagementComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
