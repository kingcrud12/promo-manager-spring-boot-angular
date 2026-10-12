import { Component, OnInit, inject, signal } from '@angular/core';
import { InformationsPersonnelles } from './sections/informations-personnelles/informations-personnelles';
import { SoldePoints } from './sections/solde-points/solde-points';
import { CartesCadeaux } from './sections/cartes-cadeaux/cartes-cadeaux';
import { Health } from './core/health';

type Section = 'informations' | 'points' | 'cartes-cadeaux';

@Component({
  imports: [InformationsPersonnelles, SoldePoints, CartesCadeaux],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('client');
  protected readonly activeSection = signal<Section>('informations');
  protected readonly backendStatus = signal('…');

  private readonly health = inject(Health);

  ngOnInit(): void {
    this.health.check().subscribe({
      next: (res) => this.backendStatus.set(res.status),
      error: () => this.backendStatus.set('DOWN'),
    });
  }

  protected showSection(section: Section): void {
    this.activeSection.set(section);
  }
}
