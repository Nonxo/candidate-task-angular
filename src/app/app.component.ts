import { Component } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Aura} from "primeng/themes/aura";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class AppComponent {

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura })
  }
}
