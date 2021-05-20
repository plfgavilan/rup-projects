import {Component, OnInit} from '@angular/core';
import {Project} from '../shared/models/project';
import {ProjectProxyService} from '../shared/services/project-proxy.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.scss']
})
export class InitProjectComponent implements OnInit {

  project$: Observable<Project>;
  panelOpenState = false;

  constructor(private projectService: ProjectProxyService, private router: Router) {
  }

  ngOnInit(): void {
    this.project$ = this.projectService.startSystem();
  }

  planProject(): void {
    if (this.project$ != null) {
      this.projectService.deleteProject().subscribe(() => this.router.navigateByUrl('/project/new'));
    } else {
      this.router.navigateByUrl('/project/new').then();
    }
  }

  openProject(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
