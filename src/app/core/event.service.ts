import { httpResource } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { DevFestEvent } from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events';

  getEventsResource(query: Signal<string>) {
    // const q = query();  // <-- (1) this will not work !! Must be in the body of the callback !!
    return httpResource<DevFestEvent[]>(() => {
      const q = query(); // <-- (2) this will work
      return q? `${this.apiUrl}?q=${q}` : this.apiUrl
    });
  }

}