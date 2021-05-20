import { ProjectDao } from '../../logic/daos/project.dao';
import { PlanProjectDto } from '../../logic/models/planProjectDto';
import { HttpService } from '../core/http.service';
import { resourceServer } from '../../environments/environment';
import {Project} from '../shared/models/project';
import {Injectable} from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@Injectable({
  providedIn: 'root',
  deps: ['HttpService'],
})
export class ProjectDaoImpl implements ProjectDao {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {}

  create(project: PlanProjectDto): Promise<Project> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
    return httpResult.toPromise();
  }

  delete(id: string): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<any> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/opened`);
    return httpResult.toPromise();
  }

}
