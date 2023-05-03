import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { KeyResultService } from 'src/app/services/keyresult.service';
import { DialogService } from 'src/app/services/dialog.service';
import { KeyResultDialogComponent } from './keyresult-dialog.component';
import { UtilService } from 'src/app/services/util.service';
import { InitiativeDialogComponent } from '../initiative/initiative-dialog.component';
import { InitiativeService } from 'src/app/services/initiative.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  dialogTitle: any;
  keyResultId: any;
  objective: any;
  teamId: any;
}

@Component({
  selector: 'keyresult-item',
  templateUrl: './keyresult-item.component.html',
  styleUrls: ['./keyresult-item.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class KeyResultItemComponent implements OnInit {
  constructor(
    private keyResultService: KeyResultService,
    private dialogService: DialogService,
    private utilService: UtilService,
    private initiativeService: InitiativeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  panelOpenState = false;

  @Input('keyresult') keyresult: any = null;
  @Input('objective') objective: any = null;
  @Input('objectiveOppened') objectiveOppened: any = null;
  @Input('elementHeight') elementHeight: any = null;

  initiatives: any;
  state = 'collapsed';
  stateOpened = false;
  progressColor: string = '';

  labels: any[] = [];
  removed = false;
  completed: boolean = false;

  ngOnInit(): void {
    this.defineProgressColor();

    if (this.keyresult.id) {
      this.retrieveInitiatives();
    }
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    this.stateOpened = this.state == 'expanded';
  }

  removeKeyResult(): void {
    const options = {
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir este resultado chave?',
      cancelText: 'Não',
      confirmText: 'Sim',
    };

    this.dialogService.confirm(options).subscribe((res) => {
      if (res) {
        this.keyResultService.delete(this.keyresult.id).subscribe((data) => {
          this.removed = true;
          if (data)
            this.dialogService.show(
              'O resultado chave foi excluído com sucesso!'
            );
        });
      }
    });
  }

  editKeyResult(): void {
    var dialogRef = this.dialog.open(KeyResultDialogComponent, {
      data: {
        dialogTitle: 'Editar Resultado Chave',
        objective: this.objective,
        keyResultId: this.keyresult.id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.keyresult = data;
      }
    });
  }

  openInitiativeDialog(id: any): void {
    var dialogRef = this.dialog.open(InitiativeDialogComponent, {
      data: {
        dialogTitle: `${id ? 'Editar' : 'Nova'} Iniciativa`,
        keyResult: this.keyresult,
        initiativeId: id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.retrieveInitiatives();
      }
    });
  }

  private retrieveInitiatives(): void {
    this.keyResultService.getAllInitiatives(this.keyresult.id).subscribe(
      (data) => {
        this.initiatives = data;
        this.sortInitiatives();
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private sortInitiatives(): void {
    this.initiatives = this.initiatives.sort((a: { status: any; }) => a.status === 'DONE' ? 1 : -1);
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
              'A iniciativa foi excluída com sucesso!'
            );
            this.sortInitiatives();
        });
      }
    });
  }

  private defineProgressColor(): void {
    this.progressColor = this.utilService.defineProgressColor(
      this.keyresult.progress
    );
  }

  changeInitiativeStatus(initiative: any) {

    initiative.status = initiative.status === 'TO_DO'  ? 'DONE' : 'TO_DO';

    this.initiativeService.save(initiative).subscribe((data) => {
      if (data) {
        this.retrieveInitiatives();
        this.snackBar.open('Status alterado com sucesso!', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }
}
