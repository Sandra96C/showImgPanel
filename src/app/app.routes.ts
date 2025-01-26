import { Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';

export const routes: Routes = [
    { path: '', redirectTo: '/grid', pathMatch: 'full' },
    { path: 'grid', component: PanelComponent },
    { path: 'columns', component: PanelComponent }
];

