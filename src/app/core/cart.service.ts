import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { TICKETS_URL } from "./tokens";

interface TicketEntry {
  id: string;
  eventId: string;
}


@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly http = inject(HttpClient);
  private readonly ticketUrl = inject(TICKETS_URL);
  private readonly ticketIds = signal<string[]>([]);
  readonly count = computed(() => this.ticketIds().length);

  constructor() {
    this.loadTicets();
  }

  private loadTicets(): void {
    this.http.get<TicketEntry[]>(this.ticketUrl).subscribe({
      next: (data: any[]) => {
        const ids = data.map(t => t.eventId);
        this.ticketIds.set(ids);
      }
    });
  }

  addTicket(eventId: string) {
    const previousIds = this.ticketIds();
    this.ticketIds.update(ids => [...ids, eventId]);

    this.http.post(this.ticketUrl, {eventId}).subscribe({
      next: () => console.log('optimistic update was successfull'),
      error: (err) => {
        console.error('Sync failed for', eventId);
        // (2) Restore previous state
        this.ticketIds.set(previousIds);
      }
    });
  }

}