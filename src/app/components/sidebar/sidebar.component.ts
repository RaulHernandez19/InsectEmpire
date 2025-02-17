import { Component, OnInit, inject, signal,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsectTypesService } from '../../services/insect-types.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { of, catchError } from 'rxjs'; // Para manejar errores y valores predeterminados
import { TypeCardComponent } from '../type-card/type-card.component';
import { TypeInsectSectionComponent } from '../type-insect-section/type-insect-section.component';
import { InsectListSectionComponent } from '../insect-list-section/insect-list-section.component';
import { insectType } from '../../models/insectTypes.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, HttpClientModule,InsectListSectionComponent,TypeInsectSectionComponent],
  providers: [InsectTypesService],
  templateUrl: './sidebar.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent{
  taxonKey: number=0;
  taxonName: string="";

  handleTaxonKey(selectedKey: insectType):void {
    this.taxonKey=selectedKey.taxonKey;
    this.taxonName=selectedKey.name;
  }
  goBackHandler(selectedKey: number):void {
    this.taxonKey=selectedKey;
  }
}
