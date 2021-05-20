import {Inject, Injectable} from '@angular/core';
import {ControllerProjectFacade} from '../../../logic/index';
import {ProjectDao} from '../../../logic/daos/project.dao';
import {from, Observable} from 'rxjs';
import {Project} from '../models/project';
import {PlanProjectDto} from '../models/planProjectDto';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {ProjectDaoImpl} from '../../infrastructure/project-dao-impl';

@Injectable({
  providedIn: 'root',
  deps: [ProjectDaoImpl]
})
export class ProjectProxyService extends ControllerProjectFacade {

  constructor(@Inject('ProjectDao') dao: ProjectDao) {
    super(dao);
  }

  startSystem(): Observable<Project> {
    return from(this.startSystemAbst());
  }

  planProject(project: PlanProjectDto): Observable<Project> {
    return from(this.planProjectAbst(project));
  }

  deleteProject(): Observable<void> {
    const projectId = '1';
    return from(this.deleteProjectAbst(projectId));
  }
}
