import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { FormsModule } from '@angular/forms';
import { DefaultSettings } from '../../../../infrastructure/storage/settings-repository.service';
import { QuizFacadeService } from '../../adapters/quiz-facade.service';

@Component({
    selector: 'app-sidebar-right',
    imports: [CommonModule, FormsModule],
    templateUrl: './sidebar-right.component.html',
    styleUrl: './sidebar-right.component.scss',
})
export class SidebarRightComponent {
    @Input() set settings(_settings: QuizSettings) {
        this.updSettings = { ..._settings };
    }

    quizService = inject(QuizFacadeService);

    updSettings: QuizSettings = DefaultSettings;
    categories$ = this.quizService.getCategories();

    applySettings() {
        this.quizService.updateSettings(this.updSettings);
    }
}
