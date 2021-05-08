import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {resourceServer} from '../../../environments/environment';
import {Iteration} from '../models/iteration';
import {HttpService} from '../../core/http.service';
import {Realization} from '../models/realization';

@Injectable()
export class IterationProxyService {

  private RESOURCE = 'iterations';

  constructor(private httpService: HttpService) {
  }

  openIterations(): Observable<Iteration[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
  }

  openIteration(iterationId: string): Observable<Iteration> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${iterationId}`);
  }

  updateIteration(iteration: Iteration): Observable<Iteration> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${iteration.id}`, iteration);
  }

  getRealizations(iterationId: string | number): Observable<Realization[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${iterationId}/realizations`);
  }
}
