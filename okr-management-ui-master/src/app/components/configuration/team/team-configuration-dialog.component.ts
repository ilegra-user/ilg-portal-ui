import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { TeamService } from 'src/app/services/team.service';

export interface DialogData {
  dialogTitle: any;
  teamId: any;
}

interface TeamType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'team-configuration-dialog',
  templateUrl: './team-configuration-dialog.component.html',
})
export class TeamConfigurationDialogComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<TeamConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  form = new UntypedFormGroup({});
  team: any = {
    id: null,
    name: null,
    type: null,
  };

  teamTypes: TeamType[] = [
    { value: 'STRATEGIC', viewValue: 'Estratégico' },
    { value: 'TATIC', viewValue: 'Tático' },
    { value: 'OPERATIONAL', viewValue: 'Operacional' },
  ];

  ngOnInit(): void {
    if (this.data.teamId) this.retrieveTeam();
  }

  salvar(): void {
    this.teamService.save(this.team).subscribe((data) => {
      this.dialogService.show(`Objetivo salvo com sucesso!`);
      this.dialogRef.close(data);
    });
  }

  private retrieveTeam(): void {
    this.teamService.get(this.data.teamId).subscribe((data) => {
      if (data) this.team = data;
    });
  }
}
