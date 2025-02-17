import { Component, EventEmitter, Output } from '@angular/core';
import { TypeCardComponent } from '../type-card/type-card.component';
import { insectType } from '../../models/insectTypes.model';
import { insectTypesData } from '../../data/insectTypes.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-insect-section',
  imports: [TypeCardComponent,CommonModule],
  templateUrl: './type-insect-section.component.html'
})
export class TypeInsectSectionComponent {
  insect_Types_data: insectType[] = insectTypesData;

  @Output() selectedTaxonKey = new EventEmitter<insectType>(); // Ahora es Output directamente

  onCardClicked(taxonKey: insectType): void {
    this.selectedTaxonKey.emit(taxonKey); // Emitimos el valor directamente
  }
}
