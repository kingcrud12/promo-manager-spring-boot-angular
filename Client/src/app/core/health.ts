import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface HealthResponse {
  status: string;
}

@Service()
export class Health {
  private readonly http = inject(HttpClient);

  check() {
    return this.http.get<HealthResponse>(`${environment.apiUrl}/actuator/health`);
  }
}
