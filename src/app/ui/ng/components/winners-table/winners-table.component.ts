import { Component, Input } from '@angular/core';
import { Winner } from '../../../../domain/models/winner.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-winners-table',
    imports: [CommonModule],
    templateUrl: './winners-table.component.html',
    styleUrl: './winners-table.component.scss',
})
export class WinnersTableComponent {
    @Input() winners: Winner[] = [];

    get tableRows(): (Winner | null)[] {
        const rows: (Winner | null)[] = [];
        for (let i = 0; i < 5; i++) {
            rows.push(this.winners[i] || null);
        }
        return rows;
    }
}
