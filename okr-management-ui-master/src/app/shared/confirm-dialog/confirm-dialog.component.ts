import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogModel } from '../../models/dialog.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogModel) {
            data.title = data.title ?? 'Atenção';
            data.cancelText = data.cancelText ?? 'Cancelar';
            data.confirmText = data.confirmText ?? 'Confirmar';
         }

    public cancel() {
        this.close(false);
    }
    public close(value: any) {
        this.dialogRef.close(value);
    }
    public confirm() {
        this.close(true);
    }
    @HostListener("keydown.esc")
    public onEsc() {
        this.close(false);
    }
}