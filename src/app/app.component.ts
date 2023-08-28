import { Component } from '@angular/core';
import { CsvReaderService } from './services/csv-reader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AXPO - Frontend Challenge';

    constructor(private csvReader: CsvReaderService) {
        this.csvReader.initAssets();
    }
}
