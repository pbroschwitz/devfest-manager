import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { DevFestEvent } from '../models/event.model';
import { API_URL } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private url = inject(API_URL);
  private apiUrl = `${this.url}/events`;
  private readonly http = inject(HttpClient);

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
    return this.http.post<DevFestEvent>(this.apiUrl, event);
  }
}
