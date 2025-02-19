import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizSettings } from '../../../../domain/models/settings.models';

@Component({
    selector: 'app-main',
    imports: [CommonModule, HeaderComponent, SidebarComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {
    quizSettings: QuizSettings = {
        playerName: 'Player',
        difficulty: 'easy',
        type: 'multiple',
        category: null,
    };

    onSettingsChange(settings: QuizSettings) {
        this.quizSettings = settings;
    }
}
