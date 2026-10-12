import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Health } from './core/health';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('dashboard');
  protected readonly backendStatus = signal('…');

  private readonly health = inject(Health);

  ngOnInit(): void {
    this.health.check().subscribe({
      next: (res) => this.backendStatus.set(res.status),
      error: () => this.backendStatus.set('DOWN'),
    });
  }
}
