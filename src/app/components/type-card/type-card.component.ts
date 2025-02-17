import { Component, EventEmitter, Input, Output } from '@angular/core';
import { insectType } from '../../models/insectTypes.model';

@Component({
  selector: 'app-type-card',
  imports: [],
  templateUrl: './type-card.component.html',
})
export class TypeCardComponent {
  @Input() infocard!: insectType;
  @Output() cardClicked = new EventEmitter<insectType>(); // Emite el taxonKey

  onClick(): void {
    this.cardClicked.emit(this.infocard); // Emite el taxonKey al hacer clic
  }

}
