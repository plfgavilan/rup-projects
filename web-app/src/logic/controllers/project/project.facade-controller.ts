import {ProjectDao} from '../../daos/project.dao';
import {PlanProjectDto} from '../../models/planProjectDto';
import {Project} from '../../../app/shared/models/project';


export class ProjectFacadeController {

  constructor(private dao: ProjectDao) {}

  public async startSystem(): Promise<Project> {
    return await this.dao.getAll();
  }

  public async planProject(project: PlanProjectDto): Promise<Project> {
    return await this.dao.create(project);
  }

  public async deleteProject(): Promise<void> {
    const id: any = 'idproject';
    return await this.dao.delete(id);
  }

}
