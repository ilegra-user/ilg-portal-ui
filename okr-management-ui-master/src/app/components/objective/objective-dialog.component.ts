import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { ObjectiveService } from 'src/app/services/objective.service';
import { TeamService } from 'src/app/services/team.service';

export interface DialogData {
  dialogTitle: any;
  objectiveId: any;
  objectiveFather: any;
  cycle: any;
  teamId: any;
}

@Component({
  selector: 'objctive-dialog',
  templateUrl: './objective-dialog.component.html',
})
export class ObjectiveDialogComponent implements OnInit {
  constructor(
    private objectiveService: ObjectiveService,
    private teamService: TeamService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<ObjectiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  form = new UntypedFormGroup({});
  teams: any;
  objective = {
    id: this.data.objectiveId,
    title: null,
    objectiveFatherId: this.data.objectiveFather?.id ?? null,
    cycleId: this.data.cycle?.id ?? null,
    teamId: this.data.teamId,
    annotations: '',
    type: '',
  };

  ngOnInit(): void {
    this.retrieveTeams();
    if (this.data.objectiveId) this.retrieveObjective();
  }

  salvar(): void {
    this.objectiveService.save(this.objective).subscribe((data) => {
      this.dialogService.show(`Objetivo salvo com sucesso!`);
      this.dialogRef.close(data);
    });
  }

  private retrieveObjective(): void {
    this.objectiveService.get(this.data.objectiveId).subscribe((data) => {
      this.objective.title = data.title;
      this.objective.annotations = data.annotations;
      this.objective.objectiveFatherId = data.objectiveFatherId;
      this.objective.cycleId = data.cycleId;
      this.objective.teamId = data.team?.id;
    });
  }

  private retrieveTeams(): void {
    this.teamService.getAll().subscribe((data) => {
      this.teams = data.filter((dt: any) =>
        this.data.objectiveFather?.type == 'STRATEGIC'
          ? dt.type === 'TATIC'
          : this.data.objectiveFather?.type == 'TATIC'
          ? dt.type === 'OPERATIONAL'
          : dt.type === 'STRATEGIC'
      );
    });
  }
}
