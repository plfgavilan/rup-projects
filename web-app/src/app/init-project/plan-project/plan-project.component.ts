import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../shared/models/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {Phase} from '../../shared/models/phase';
import {MatStepper} from '@angular/material/stepper';
import {ProjectDateValidator} from '../../shared/validators/project-date.validator';
import {ProjectFacadeController} from '../../../logic';

@Component({
    selector: 'app-plan-project',
    templateUrl: './plan-project.component.html',
    styleUrls: ['./plan-project.component.scss']

})
export class PlanProjectComponent implements OnInit {
    project: Project;
    basicInfoFormGroup: FormGroup;
    iterationSizeFormGroup: FormGroup;
    numberOfIterations: number;
    phases: Observable<Phase[]>;
    displayedColumns: string[] = ['type', 'startDate', 'endDate'];
    columnsToDisplay: string[] = this.displayedColumns.slice();


    constructor(
      @Inject('ProjectFacadeController') private projectService: ProjectFacadeController,
      private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        const now = new Date();
        const start = new Date();
        const end = new Date();
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 120);
        this.basicInfoFormGroup = this.formBuilder.group({
            startDate: [start, [Validators.required, ProjectDateValidator.afterNow]],
            endDate: [end, [Validators.required]],
            cost: [100, [Validators.required, Validators.min(0)]],
        });
        this.iterationSizeFormGroup = this.formBuilder.group({
            numberOfIterations: ['', Validators.required]
        });
    }

    refreshProject(): void {
        this.project.numberOfIterations = this.iterationSizeFormGroup.get('numberOfIterations').value as number;
        this.projectService.planProject(this.project);
    }

    toIterationsSizeStep(stepper: MatStepper): void {
        const CONTROL_NAME = 'numberOfIterations';
        this.planProject().subscribe(project => {
            this.project = project;
            this.iterationSizeFormGroup.controls[CONTROL_NAME].setValue(project.numberOfIterations);
            stepper.next();
        });
    }

    backToBasicInfoStep(stepper: MatStepper): void {
        from(this.projectService.deleteProject()).subscribe(() => stepper.previous());
    }


    planProject(): Observable<Project> {
        return from(this.projectService.planProject(this.basicInfoFormGroup.getRawValue()));
    }

    cancel(): void {
      from(this.projectService.deleteProject()).subscribe(() => this.router.navigateByUrl('/').then());
    }

    save(): void {
        this.router.navigateByUrl('/project-management').then();
    }
}
