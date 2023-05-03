import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { InitiativeService } from 'src/app/services/initiative.service';

export interface DialogData {
  dialogTitle: any;
  initiativeId: any;
  keyResult: any;
}

@Component({
  selector: 'initiative-dialog',
  templateUrl: './initiative-dialog.component.html',
})
export class InitiativeDialogComponent implements OnInit {
  constructor(
    private initiativeService: InitiativeService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<InitiativeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  form = new UntypedFormGroup({});

  initiative = {
    id: this.data.initiativeId,
    title: '',
    description: '',
    status: '',
    keyResultId: this.data.keyResult.id,
    completed: false,
  };

  ngOnInit(): void {
    if (this.data.initiativeId) this.retrieveInitiative();
  }

  salvar(): void {
    this.initiative.status =
      this.initiative.completed == true ? 'DONE' : 'TO_DO';

    this.initiativeService.save(this.initiative).subscribe((data) => {
      this.dialogService.show(
        `Iniciativa ${this.initiative.id ? 'salva' : 'criada'} com sucesso!`
      );
      this.dialogRef.close(data);
    });
  }

  changeCompleted(): void {
    this.initiative.completed = !this.initiative.completed;
  }

  private retrieveInitiative(): void {
    this.initiativeService.get(this.data.initiativeId).subscribe((data) => {
      this.initiative.title = data.title;
      this.initiative.description = data.description;
      this.initiative.completed = data.status == 'DONE';
    });
  }
}
