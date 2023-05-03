import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { KeyResultService } from 'src/app/services/keyresult.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { KeyResultTypeService } from 'src/app/services/keyresult-type.service';
import { InitiativeDialogComponent } from '../initiative/initiative-dialog.component';
import { UtilService } from 'src/app/services/util.service';
import { InitiativeService } from 'src/app/services/initiative.service';
import { KeyResultHistoryDialogComponent } from './keyresult-history-dialog.component';
import { TeamService } from 'src/app/services/team.service';

export interface DialogData {
  dialogTitle: any;
  keyResultId: any;
  objective: any;
  teamId: any;
}

@Component({
  selector: 'keyresult-dialog',
  templateUrl: './keyresult-dialog.component.html',
  styleUrls: ['./keyresult-dialog.component.css'],
})
export class KeyResultDialogComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private keyResultService: KeyResultService,
    private teamService: TeamService,
    private initiativeService: InitiativeService,
    private keyResultTypeService: KeyResultTypeService,
    private dialogService: DialogService,
    private utilService: UtilService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<KeyResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  form = new UntypedFormGroup({});
  teams: any;
  types: any;
  initiatives: any;
  keyResult = {
    id: this.data.keyResultId,
    description: '',
    annotations: '',
    labels: '',
    baseline: 0,
    progress: 0,
    target: 0,
    value: 0,
    objectiveId: this.data.objective.id,
    team: this.data.objective.team,
    teamId: this.data.teamId,
    keyResultTypeId: null,
  };

  labels: any[] = [];

  progressColor: string = '';

  keyResultTypeIdChange: any;

  ngOnInit(): void {
    this.retrieveTeams();
    this.retrieveKeyResultTypes();
    if (this.data.keyResultId) {
      this.retrieveKeyResult();
      this.retrieveInitiatives();
    }
  }

  changeResult(): void {
    this.keyResult.value = this.keyResult.baseline;
  }

  keyResultTypeChange(elem: any): void {
    this.keyResultTypeIdChange = elem;
  }

  getCurrencyItem(): any {
    return this.keyResult.keyResultTypeId != null
      ? this.types.find(
          (type: any) => type.id == this.keyResult.keyResultTypeId
        ).label
      : '';
  }

  salvar(): void {
    this.keyResultService.save(this.keyResult).subscribe((data) => {
      this.dialogService.show(
        `Resultado Chave ${this.keyResult.id ? 'salvo' : 'criado'} com sucesso!`
      );
      this.dialogRef.close(data);
    });
  }

  addLabel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.labels.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeLabel(label: any): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }

    this.validateLabels();
  }

  openInitiativeDialog(id: any): void {
    var dialogRef = this.dialog.open(InitiativeDialogComponent, {
      data: {
        dialogTitle: `${id ? 'Editar' : 'Nova'} Iniciativa`,
        keyResult: this.keyResult,
        initiativeId: id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.retrieveInitiatives();
      }
    });
  }

  changeProgress(): any {
    if (this.keyResult.target == this.keyResult.baseline) {
      this.keyResult.progress =
        ((this.keyResult.value - this.keyResult.target) * 100) /
        this.keyResult.target;
    } else {
      this.keyResult.progress =
        ((this.keyResult.value - this.keyResult.baseline) /
          (this.keyResult.target - this.keyResult.baseline)) *
        100;
    }

    this.keyResult.progress = Math.round(this.keyResult.progress);

    this.defineProgressColor();
  }

  removeInitiative(initiativeId: any): void {
    const options = {
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir esta iniciativa?',
      cancelText: 'Não',
      confirmText: 'Sim',
    };

    this.dialogService.confirm(options).subscribe((res) => {
      if (res) {
        this.initiativeService.delete(initiativeId).subscribe((data) => {
          this.initiatives.splice(
            this.initiatives.findIndex(
              (initiative: any) => initiative.id == initiativeId
            ),
            1
          );

          if (data)
            this.dialogService.show(
              'O resultado chave foi excluído com sucesso!'
            );
        });
      }
    });
  }

  showHistory(): void {
    this.dialog.open(KeyResultHistoryDialogComponent, {
      data: {
        dialogTitle: 'Evolução do Resultado Chave',
        keyResultId: this.keyResult.id,
      },
    });
  }

  validateLabels(): void {
    if (this.labels.length > 0) {
      this.keyResult.labels = ' ';
    } else {
      this.keyResult.labels = '';
    }
  }

  private retrieveKeyResult(): void {
    this.keyResultService.get(this.data.keyResultId).subscribe((data) => {
      this.keyResult.description = data.description;

      this.keyResult.baseline = data.baseline;
      this.keyResult.target = data.target;
      this.keyResult.value = data.value;
      this.keyResult.teamId = data.team?.id;
      this.keyResult.keyResultTypeId = data.type?.id;
      this.keyResult.progress = data.progress;
      this.keyResult.annotations = data.annotations;

      if (data.labels) this.labels = data.labels.split(';');

      this.validateLabels();

      this.defineProgressColor();
    });
  }

  private retrieveTeams(): void {
    this.teamService.getAll().subscribe((data) => {
      this.teams = data.filter(
        (dt: any) => dt.type === this.keyResult.team.type
      );
    });
  }

  private retrieveKeyResultTypes(): void {
    this.keyResultTypeService.getAll().subscribe((data) => {
      this.types = data;
    });
  }

  private retrieveInitiatives(): void {
    this.keyResultService.getAllInitiatives(this.keyResult.id).subscribe(
      (data) => {
        this.initiatives = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private defineProgressColor(): void {
    this.progressColor = this.utilService.defineProgressColor(
      this.keyResult.progress
    );
  }
}
