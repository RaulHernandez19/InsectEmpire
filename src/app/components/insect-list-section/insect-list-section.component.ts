import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input, EventEmitter, Output } from '@angular/core';
import { insectInfo } from '../../models/insectInfo.model';
import { InsectTypesService } from '../../services/insect-types.service';
import { InsectCardComponent } from '../insect-card/insect-card.component';
import { CommonModule } from '@angular/common';
import { insectType } from '../../models/insectTypes.model';

@Component({
  selector: 'app-insect-list-section',
  imports: [InsectCardComponent, CommonModule],
  templateUrl: './insect-list-section.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsectListSectionComponent implements OnInit{
  insects: insectInfo[] = [];
  @Input() taxonKey!: number;
  @Input() taxonName!: string;
  offset: number = 0;
  limit: number = 9;
  totalResults: number = 0; // Total de resultados de la API
  currentPage: number = 1;
  visiblePages: number[] = [];
  @Output() goBack = new EventEmitter<number>();
  loading: boolean = true;
  placeholders: any[] = new Array(8).fill(null);

  constructor(private gbifService: InsectTypesService) {}

  ngOnInit(): void {
    this.loadInsects();
  }

  loadInsects(): void {
    this.loading = true; // Inicia la carga
    this.insects=[];
    this.gbifService.getInsects(this.taxonKey, this.offset, this.limit).subscribe((data: any) => {
      let filteredResults = data.results
        .filter((result: any) => result.media?.length > 0 && result.media[0].identifier)
        .map((result: any) => ({
          name: this.cleanName(result.scientificName),
          taxonKey: result.taxonKey,
          img: result.media[0].identifier,
          country: result.country,
        }));

      let extraOffset = this.offset + this.limit;
      let extraLimit = this.limit;

      const fillInsects = () => {
        if (filteredResults.length < 8 && extraOffset < this.totalResults) {
          this.gbifService.getInsects(this.taxonKey, extraOffset, extraLimit).subscribe((extraData: any) => {
            let extraFiltered = extraData.results
              .filter((result: any) => result.media?.length > 0 && result.media[0].identifier)
              .map((result: any) => ({
                name: this.cleanName(result.scientificName),
                taxonKey: result.taxonKey,
                img: result.media[0].identifier,
                country: result.country,
              }));

            filteredResults.push(...extraFiltered);
            extraOffset += extraLimit;

            if (filteredResults.length < 8 && extraOffset < this.totalResults) {
              fillInsects();
            } else {
              this.insects = filteredResults.slice(0, 8);
              this.loading = false; // Termina la carga
            }
          });
        } else {
          this.insects = filteredResults.slice(0, 8);
          this.loading = false; // Termina la carga
        }
      };

      fillInsects();
      this.totalResults = data.count;
      this.updateVisiblePages();
    });
  }

  // Actualiza las páginas visibles
  updateVisiblePages(): void {
    const totalPages = Math.ceil(this.totalResults / this.limit);
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  // Navega a una página específica
  goToPage(page: number): void {
    this.currentPage = page;
    this.offset = (page - 1) * this.limit;
    this.loadInsects();
  }

  nextPage(): void {
    this.currentPage++;
    this.offset += this.limit;
    this.loadInsects();
  }

  previousPage(): void {
    this.currentPage--;
    this.offset -= this.limit;
    if (this.offset < 0) this.offset = 0;
    this.loadInsects();
  }

  // Función para limpiar el nombre
  cleanName(name: string): string {
    return name
      .replace(/\s*\([^)]*\)/g, '')
      .split(',')[0]
      .trim();
  }

  goBackAction(): void {
    this.taxonKey=0;
      this.goBack.emit(this.taxonKey); // Emitimos el valor directamente
    }

}
