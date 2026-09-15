import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { CreateEvent } from './features/admin/create-event';
import { EventDetails } from './features/events/event-details';
import { EventList } from './features/events/event-list';

export const routes: Routes = [
  { path: '', component: EventList },
  { path: 'event/:id', component: EventDetails },
  { path: 'admin/create', component: CreateEvent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
