import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DialogService } from 'src/app/services/dialog.service';
import { KeyResultService } from 'src/app/services/keyresult.service';

export interface DialogData {
    dialogTitle: any,
    keyResultId: any
}

@Component({
    selector: 'keyresult-history-dialog',
    templateUrl: './keyresult-history-dialog.component.html'
})
export class KeyResultHistoryDialogComponent implements OnInit {

    public lineChartColors: Color[] = [{ borderColor: 'black', backgroundColor: '#673ab7' }];
    public history: any = null;
    public lineChartData: ChartDataSets[] = [];
    public lineChartLabels: Label[] = []
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    constructor(private keyResultService: KeyResultService,
        private dialogService: DialogService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<KeyResultHistoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit() {
        this.retrieveKeyResultHistory();

    }

    private retrieveKeyResultHistory(): void {

        this.keyResultService.getHistory(this.data.keyResultId)
            .subscribe(data => {
                let labels: any[] = [];
                let chartData: any[] = [];

                data.forEach(function(item: any){
                    let date = new Date(item.updatedDate);
                    labels.push(date.toLocaleDateString());
                    chartData.push(item.newValue)
                })

                this.lineChartData = [{ data: chartData, label: 'Evolução Valor Atual' }];
                this.lineChartLabels = labels;
            });
    }
}

