import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iteration } from '../../models/iteration';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  iterations: Iteration[];
  private selectedPhaseId: string;

  constructor(private phaseService: PhaseService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.selectedPhaseId = params.phaseId;
        }
      );
    this.phaseService.openIterations(this.selectedPhaseId).subscribe(iterations => this.iterations = iterations);
  }

  openIteration(iteration: Iteration): void {
    this.router.navigateByUrl(`/iteration-management`, {queryParams: {id: iteration.id}}).then();
  }

  openPhases(): void {
    this.router.navigateByUrl('project-management');
  }
}
