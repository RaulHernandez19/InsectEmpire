import { Component, Input } from '@angular/core';
import { insectInfo } from '../../models/insectInfo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insect-card',
  imports:[CommonModule],
  templateUrl: './insect-card.component.html',
})
export class InsectCardComponent {
  @Input() insect!: insectInfo;
  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
