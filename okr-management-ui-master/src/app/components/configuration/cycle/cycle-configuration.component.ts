import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CycleService } from 'src/app/services/cycle.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CycleConfigurationDialogComponent } from './cycle-configuration-dialog.component';



@Component({
    selector: 'cycle-configuration',
    templateUrl: './cycle-configuration.component.html'
})
export class CycleConfigurationComponent implements OnInit {

    cycles: any = null;

    constructor(private cycleService: CycleService,
        private dialog: MatDialog,
        private dialogService: DialogService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.retrieveCycles();
    }

    openCycleDialog(cycleId: any): void {
        var dialogRef = this.dialog.open(CycleConfigurationDialogComponent, {
            data: {
                dialogTitle: `${cycleId ? 'Editar' : 'Novo'} Ciclo`,
                cycleId: cycleId
            }
        });

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.retrieveCycles();
            }
        })
    }

    removeCycle(cycleId: any): void {

        const options = {
            title: 'Atenção',
            message: 'Tem certeza que deseja excluir este ciclo?',
            cancelText: 'Não',
            confirmText: 'Sim'
        }

        this.dialogService.confirm(options)
            .subscribe(res => {
                if (res) {
                    this.cycleService.delete(cycleId)
                        .subscribe(data => {
                            this.cycles.splice(this.cycles.findIndex((cycle: any) => cycle.id == cycleId), 1);
                            this.dialogService.show("O ciclo foi excluído com sucesso!");
                        })
                }
            })
    }

    private retrieveCycles(): void {

        this.cycleService.getAll()
            .subscribe(
                data => {
                    this.cycles = data;
                },
                error => { console.log(error); });
    }
}