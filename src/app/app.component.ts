import {Component, inject} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Aura} from "primeng/themes/aura";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true
})
export class AppComponent {

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura })
  }
}
