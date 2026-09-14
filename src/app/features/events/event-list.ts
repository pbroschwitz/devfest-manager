import { Component, inject, model } from '@angular/core';
import { EventsService } from '../../core/event.service';
import { EventCard } from './event-card';
import { SearchBar } from './search-bar';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, SearchBar],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
      <app-search-bar [(query)]="searchQuery" />
      <p class="text-gray-500 mt-2">Searching for: {{ searchQuery() }}</p>
    </div>

    <!-- TODO Mod 2: Wrap in @if (events.isLoading()) -->

    <!-- src/app/features/events/event-list.ts -->
    <!-- 1. Error State -->
    @if (events.error()) {
      <div class="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        Failed to load events. Is the server running?
      </div>
    }

    <!-- 2. Loading State -->
    @if (events.isLoading()) {
      <div class="text-center py-12 text-gray-500 animate-pulse">Loading events...</div>
    }

    <!-- 3. Data State -->
    <!-- We guard the value access with hasValue() -->
    @if (events.hasValue()) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (event of events.value(); track event.id) {
          <app-event-card
            [title]="event.title"
            [image]="event.image"
            [date]="event.date"
            (delete)="deleteEvent(event.id)"
          />
        } @empty {
          <p>No events</p>
        }
      </div>
    }
  `,
})
export class EventList {
  readonly eventsService = inject(EventsService);
  readonly console = console;
  readonly alert = alert;
  readonly searchQuery = model('');

  readonly events = this.eventsService.getEventsResource(this.searchQuery);

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        this.events.reload();
      },
      error: (err) => {
        this.console.error('Delete', err);
        this.alert('Could not delete');
      },
    });
  }

  // TODO Mod 2: Inject Service and use resource()
}
