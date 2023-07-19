import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { filters } from 'src/app/interfaces/filters';
import { ProductPreview } from 'src/app/interfaces/product-preview';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit, OnChanges {
  @Output() updateFilters = new EventEmitter<filters>();
  @Input() category: string;
  @Input() currentProducts: ProductPreview[];
  min: number;
  max: number;
  productFilters: filters;
  constructor(private ref: ChangeDetectorRef) {
    this.category = '';
    this.min = NaN;
    this.max = NaN;
    this.productFilters = {
      price: [this.min, this.max],
    };
    this.currentProducts = [];
  }

  update() {
    this.updateFilters.emit(this.productFilters);
  }

  // TODO: Parmis tous les items disponibles après filtrage par options choisies, afficher seulement les filtres possibles. (CHECK SUR NIKE)

  // slider

  ngOnInit(): void {}

  ngOnChanges(): void {
    // slider
    this.findMinMax();
    this.ref.detectChanges();
    this.slideOne();
    this.slideTwo();
  }

  isNan(int: number) {
    return isNaN(int);
  }

  findMinMax() {
    this.currentProducts.forEach((product: ProductPreview) => {
      if (product.price) {
        if (isNaN(this.max)) {
          this.max = 0;
        }
        if (isNaN(this.min)) {
          this.min = Infinity;
        }
        this.min = Math.min(this.min, parseInt(product.price));
        this.max = Math.max(this.max, parseInt(product.price));
        this.productFilters.price = [this.min, this.max];
      }
    });
  }

  slideOne() {
    let sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    let sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    let displayValOne = document.getElementById('range1');
    let minGap = 0;
    let sliderMaxValue = (
      document.getElementById('slider-1') as HTMLInputElement
    ).max;
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = JSON.stringify(parseInt(sliderTwo.value) - minGap);
    }
    displayValOne!.textContent = sliderOne.value + ' $';
    this.fillColor();
  }
  slideTwo() {
    let sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    let sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    let displayValTwo = document.getElementById('range2');
    let minGap = 0;

    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = JSON.stringify(parseInt(sliderOne.value) + minGap);
    }
    displayValTwo!.textContent = sliderTwo.value + ' $';
    this.fillColor();
  }
  fillColor() {
    let sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    let sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    let sliderTrack = document.querySelector('.slider-track') as HTMLElement;
    let sliderMaxValue = (
      document.getElementById('slider-1') as HTMLInputElement
    ).max;
    let percent1 = (parseInt(sliderOne.value) / parseInt(sliderMaxValue)) * 100;
    let percent2 = (parseInt(sliderTwo.value) / parseInt(sliderMaxValue)) * 100;
    sliderTrack!.style.background = `linear-gradient(to right, #e0eae1 ${percent1}% , var(--color-accent-solid) ${percent1}% , var(--color-accent-solid) ${percent2}%, #e0eae1 ${percent2}%)`;
    this.productFilters.price = [
      parseInt(sliderOne.value),
      parseInt(sliderTwo.value),
    ];
  }
}
