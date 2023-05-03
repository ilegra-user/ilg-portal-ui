import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CycleService } from 'src/app/services/cycle.service';
import { DialogService } from 'src/app/services/dialog.service';

export interface DialogData {
  dialogTitle: any;
  cycleId: any;
}

@Component({
  selector: 'cycle-configuration-dialog',
  templateUrl: './cycle-configuration-dialog.component.html',
})
export class CycleConfigurationDialogComponent implements OnInit {
  constructor(
    private cycleService: CycleService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<CycleConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  teams: any;
  cycleId: any;
  cycle: any = {
    id: null,
    title: null,
    startDate: null,
    endDate: null,
  };

  ngOnInit(): void {
    if (this.data.cycleId) this.retrieveCycle();
  }

  salvar(): void {
    this.cycleService.save(this.cycle).subscribe((data) => {
      this.dialogService.show(`Ciclo salvo com sucesso!`);
      this.dialogRef.close(data);
    });
  }

  private retrieveCycle(): void {
    this.cycleService.get(this.data.cycleId).subscribe((data) => {
      this.cycle = data;
    });
  }
}
