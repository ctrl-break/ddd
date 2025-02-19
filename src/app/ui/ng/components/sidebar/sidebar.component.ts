import { Component, EventEmitter, Output } from '@angular/core';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, FormsModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
