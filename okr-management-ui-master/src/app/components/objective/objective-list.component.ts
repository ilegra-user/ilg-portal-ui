import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { ObjectiveDialogComponent } from './objective-dialog.component';

@Component({
  selector: 'objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.css'],
})
export class ObjectiveListComponent implements OnInit {
  constructor(private dialogService: DialogService, public dialog: MatDialog) {}

  @Input('title') title = '';
  @Input('objectives') objectives: Array<any> = [];
  @Input('cycle') cycle = null;
  @Input('objectiveFather') objectiveFather = null;
  @Input('level') level: string;
  @Input('team') team: any = null;

  ngOnInit(): void {
    if (this.level === '') this.level = 'strategic';
    else if (this.level === 'strategic') this.level = 'tatic';
    else this.level = 'operational';
  }

  openObjectiveDialog(): void {
    var dialogRef = this.dialog.open(ObjectiveDialogComponent, {
      data: {
        dialogTitle: 'Novo Objetivo Estratégico',
        cycle: this.cycle,
        objectiveFather: this.objectiveFather,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.objectives.push(data);
      }
    });
  }
}
