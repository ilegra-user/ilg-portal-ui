import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { startWith, tap } from 'rxjs/operators';

import { DialogService } from 'src/app/services/dialog.service';
import { ObjectiveService } from 'src/app/services/objective.service';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { KeyResultDialogComponent } from '../keyresult/keyresult-dialog.component';
import { ObjectiveDialogComponent } from './objective-dialog.component';

@Component({
  selector: 'objective-item',
  templateUrl: './objective-item.component.html',
  styleUrls: ['./objective-item.component.css'],
})
export class ObjectiveItemComponent implements OnInit {
  constructor(
    private objectiveService: ObjectiveService,
    public dialog: MatDialog,
    private utilService: UtilService,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef
  ) {}

  state = 'collapsed';

  panelOpenState = false;

  @Input('objective') objective: any = null;
  @Input('cycle') cycle: any = null;
  @Input('objectiveFather') objectiveFather: any = null;
  @Output() respostaFamilia = new EventEmitter();

  strategic: boolean = false;
  tatic: boolean = false;
  operational: boolean = false;

  removed: any = false;
  stateOpened = false;
  keyresults: any;
  childObjectives: any;
  progressColor: any;
  elementHeight: number;

  ngOnInit(): void {
    this.defineProgressColor();
    this.retrieveKeyResults();
    this.retrieveChildObjectives();
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    this.stateOpened = this.state == 'expanded';
  }

  removeObjective(): void {
    const options = {
      title: 'Atenção',
      message:
        'Excluir este objetivo também irá excluir os objetivos e resultados chaves desdobrados a partir dele. Tem certeza que deseja prosseguir?',
      cancelText: 'Não',
      confirmText: 'Sim',
    };

    this.dialogService.confirm(options).subscribe((res) => {
      if (res) {
        this.objectiveService.delete(this.objective.id).subscribe((data) => {
          this.removed = true;
          if (data)
            this.dialogService.show('O objetivo foi excluído com sucesso!');
        });
      }
    });
  }

  editObjective(): void {
    var dialogRef = this.dialog.open(ObjectiveDialogComponent, {
      data: {
        dialogTitle: `Editar Objetivo ${
          this.objective.type == 'STRATEGIC'
            ? 'Estratégico'
            : this.objective.type == 'TATIC'
            ? 'Tático'
            : 'Operacional'
        }`,
        cycle: this.cycle,
        objectiveFather: this.objectiveFather,
        objectiveId: this.objective.id,
        teamId: this.objective.team.id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.objective = data;
      }
    });
  }

  openKeyResultDialog(): void {
    var dialogRef = this.dialog.open(KeyResultDialogComponent, {
      data: {
        dialogTitle: 'Novo Resultado Chave',
        objective: this.objective,
        teamId: this.objective.team.id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.keyresults.push(data);
      }
    });
  }

  openObjectiveDialog(): void {
    var dialogRef = this.dialog.open(ObjectiveDialogComponent, {
      data: {
        dialogTitle: `Novo Objetivo ${
          this.objective.type == 'STRATEGIC' ? 'Tático' : 'Operacional'
        }`,
        cycle: this.cycle,
        objectiveFather: this.objective,
        teamId: this.objective.team.id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.objectiveService.get(data.id).subscribe((objective) => {
          this.childObjectives.push(objective);
        });
      }
    });
  }

  private defineProgressColor(): void {
    this.progressColor = this.utilService.defineProgressColor(
      this.objective.progress
    );
  }

  private retrieveKeyResults(): void {
    this.objectiveService.getAllKeyResults(this.objective.id).subscribe(
      (data) => {
        this.keyresults = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private retrieveChildObjectives(): void {
    this.objectiveService.getAllChildObjectives(this.objective.id).subscribe(
      (data) => {
        this.childObjectives = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getElementHeight(): void {
    var element = document.getElementById(`objective-${this.objective.id}`);

    if (element) {
      var height = element.offsetHeight;

      if (height > 0) {
        this.respostaFamilia.emit(height);
      }

      this.elementHeight = height + 40;
    }
  }
}
