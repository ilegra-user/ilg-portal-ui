import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'keyresult-list',
  templateUrl: './keyresult-list.component.html',
  styleUrls: ['./keyresult-list.component.css'],
})
export class KeyResultListComponent {
  constructor(private dialog: MatDialog) {}

  @Input('keyresults') keyresults: Array<any> = [];
  @Input('objective') objective = null;
  @Input('objectiveOppened') objectiveOppened: any = null;
  @Input('elementHeight') elementHeight: any = 0;
}
