import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

const MODULES = [
  MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTableModule,
    MatTabsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
]

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
