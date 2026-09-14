import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../core/event.service';

@Component({
  selector: 'app-event-details',
  template: `
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto min-h-[600px]">
      <!-- TODO Mod 3: Use Input Binding for ID -->
      <h1 class="text-3xl font-bold mb-4">Event Details Placeholder</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 space-y-4">
          <p class="text-gray-700 leading-relaxed text-lg">Description goes here...</p>

          <!-- Day 2 Mod 2: Tab Group will go here -->
        </div>

        <div class="bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
          <!-- Day 2 Mod 1: Defer Block for Map -->
          <div class="h-48 bg-gray-200 rounded mb-4 overflow-hidden">Map Loading...</div>

          <button
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  `,
})
export class EventDetails {
  // TODO Mod 3: id = input<string>()
  activeRoute = inject(ActivatedRoute);

  // Instead doing conversion of Rx.js to signal
  // id = toSignal(this.activeRoute.paramMap)()?.get('id');
  // we use `withComponentInputBinding()` in provideRouter, see @app.config.ts:11
  // and then can use, so the URL http://localhost:4200/event/1 --> becomes
  readonly id = input.required<string>();

  readonly eventService = inject(EventsService);

  readonly eventResouce = this.eventService.getEventResource(this.id);
}
