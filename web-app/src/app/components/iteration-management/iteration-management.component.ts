import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration } from '../../models/iteration';
import { IterationService } from '../../services/iteration.service';

@Component({
  selector: 'app-iteration-management',
  templateUrl: './iteration-management.component.html'
})
export class IterationManagementComponent implements OnInit {
  private iteration: Iteration;

  constructor(private activatedRout: ActivatedRoute, private iterationService: IterationService) {
    const iterationId = this.activatedRout.snapshot.queryParamMap.get('id') as any;
    this.iterationService.openIteration(iterationId).subscribe(iteration => this.iteration = iteration);
  }

  ngOnInit(): void {
  }

}
