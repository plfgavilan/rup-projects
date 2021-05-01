import {Inject, Injectable} from '@angular/core';
import {ProjectDao} from '../../../logic/daos/project.dao';
import {ProjectFacadeController} from '../../../logic/controllers/project/project.facade-controller';

@Injectable({
  providedIn: 'root',
})
export class ProjectProxyService extends ProjectFacadeController {

  constructor(@Inject('ProjectDao') dao: ProjectDao) {
    super(dao);
  }

}
