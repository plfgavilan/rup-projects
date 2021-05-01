import {Component, Inject, OnInit} from '@angular/core';
import {Project} from '../shared/models/project';
import {Router} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {ProjectFacadeController} from '../../logic';

@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.scss']
})
export class InitProjectComponent implements OnInit {

  project$: Observable<Project>;
  panelOpenState = false;

  constructor(@Inject('ProjectFacadeController') private projectService: ProjectFacadeController, private router: Router) {
  }

  ngOnInit(): void {
    this.project$ = from(this.projectService.startSystem());
  }

  // @ts-ignore
  async planProject(): Observable<void> {
    if (this.project$ != null) {
      await this.projectService.deleteProject();
      this.router.navigateByUrl('init-project/new');
    } else {
      this.router.navigateByUrl('init-project/new').then();
    }
  }

  openProject(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
