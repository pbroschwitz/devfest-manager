import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { finalize } from 'rxjs';
import { DevFestEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events';
  private readonly http = inject(HttpClient);
  readonly isCreating = signal(false);

  getEventsResource(query: Signal<string>) {
    // const q = query();  // <-- (1) this will not work !! Must be in the body of the callback !!
    return httpResource<DevFestEvent[]>(() => {
      const q = query(); // <-- (2) this will work
      return q ? `${this.apiUrl}?q=${q}` : this.apiUrl;
    });
  }

  getEventResource(id: Signal<string>) {
    return httpResource<DevFestEvent>(() => {
      const eventId = id();
      return `${this.apiUrl}/${eventId}`;
    });
  }

  deleteEvent(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Omit<DevFestEvent, 'id'>) {
    this.isCreating.set(true);
    return this.http.post<DevFestEvent>(this.apiUrl, event).pipe(
      finalize(() => {
        this.isCreating.set(false);
      }),
    );
  }
}
