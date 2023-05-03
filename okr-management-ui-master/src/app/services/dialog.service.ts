import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) { }

    public confirm(options: any): Observable<any> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: options.title,
                message: options.message,
                cancelText: options.cancelText,
                confirmText: options.confirmText
            }
        });

        return dialogRef.afterClosed().pipe(take(1), map(res => {
            return res;
        }
        ));
    }

    public show(message: any) {
        this.alert({ message: message });
    }

    public showError(errorMessage: any) {
        this.alert({
            titlle: "Ooops!",
            message: errorMessage
        });
    }

    public alert(options: any) {
        this.dialog.open(AlertDialogComponent, {
            data: {
                title: options.title,
                message: options.message
            }
        });
    }
}