import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { SpinnerComponent } from '../spinner/spinner.component';
import { startWith } from 'rxjs';
import { QuizFacadeService } from '../../../../application/adapters/quiz-facade.service';
import { SidebarRightComponent } from '../sidebar-right/sidebar-right.component';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
    selector: 'app-main',
    imports: [CommonModule, HeaderComponent, SidebarComponent, SidebarRightComponent, SpinnerComponent, QuizComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {
    quizService = inject(QuizFacadeService);

    isInitialized$ = this.quizService.initializeApp().pipe(startWith(false));
    settings$ = this.quizService.getSettings();
}
