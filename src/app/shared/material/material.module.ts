import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatToolbarModule,
        // MatDividerModule,
        MatIconModule,
        // MatMenuModule,
        MatListModule,
        // MatSidenavModule,
        // MatSnackBarModule,
        // MatTableModule,
        // MatCheckboxModule,
        // MatRadioModule,
        MatTooltipModule,
        // MatDialogModule,
        // MatTabsModule,
        // MatExpansionModule,
        // MatChipsModule,
        // MatStepperModule,
        // MatDatepickerModule,
        // MatSlideToggleModule,
        MatProgressSpinnerModule,
    ]
})
export class MaterialModule { }
