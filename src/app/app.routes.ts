import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {
        'path': 'settings',
        'component': SettingsComponent
    },
    {
        'path': '**',
        'component': MainComponent
    }
];
