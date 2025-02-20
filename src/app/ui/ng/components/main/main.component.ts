import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { SpinnerComponent } from '../spinner/spinner.component';
import { startWith } from 'rxjs';
import { QuizFacadeService } from '../../adapters/quiz-facade.service';
import { SidebarRightComponent } from '../sidebar-right/sidebar-right.component';

@Component({
    selector: 'app-main',
    imports: [CommonModule, HeaderComponent, SidebarComponent, SidebarRightComponent, SpinnerComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {
    initService = inject(QuizFacadeService);

    isInitialized$ = this.initService.initializeApp().pipe(startWith(false));
}
