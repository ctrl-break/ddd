import { Component, EventEmitter, Output, inject } from '@angular/core';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizFacadeService } from '../../adapters/quiz-facade.service';
import { WinnersTableComponent } from '../winners-table/winners-table.component';
import { WinnersObject } from '../../../../domain/models/winner.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, FormsModule, WinnersTableComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    initService = inject(QuizFacadeService);

    winners$: Observable<WinnersObject> = this.initService.getWinners();
}
