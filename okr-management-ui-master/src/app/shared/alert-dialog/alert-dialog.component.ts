import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogModel } from '../../models/dialog.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'alert-dialog',
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel) {
        data.title = data.title ?? 'Alerta';
        data.confirmText = data.confirmText ?? 'Fechar';
    }
}