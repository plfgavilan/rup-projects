import {ProjectDao} from '../../daos/project.dao';
import {PlanProjectDto} from '../../models/planProjectDto';
import {Project} from '../../../app/shared/models/project';


export class ControllerProjectFacade {

  constructor(private dao: ProjectDao) {}

  protected startSystemAbst(): Promise<Project> {
    return this.dao.getAll();
  }

  protected planProjectAbst(project: PlanProjectDto): Promise<Project> {
    return this.dao.create(project);
  }

  protected deleteProjectAbst(id: string): Promise<void> {
    return this.dao.delete(id);
  }

}
