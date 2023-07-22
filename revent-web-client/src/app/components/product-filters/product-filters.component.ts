import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { filters } from 'src/app/interfaces/filters';
import { Product } from '../../../../../common/product';
import { ClothingFilter } from '../../../../../common/filters';
import * as e from 'express';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit, OnChanges {
  @Output() updateFilters = new EventEmitter<Map<string, any[]>>();
  @Input() category: string;
  @Input() currentProducts: Product[];
  @ViewChild('form') form!: ElementRef<HTMLFormElement>;
  min: number;
  max: number;
  productFilters: Map<string, any[]>;
  selectedFilters: Map<string, any[]>;

  keys: string[];
  constructor(private ref: ChangeDetectorRef) {
    this.category = '';
    this.min = NaN;
    this.max = NaN;
    // this.productFilters = {
    //   price: [this.min, this.max],
    // };
    this.productFilters = new Map<string, any[]>([
      ['price', [this.min, this.max]],
    ]);
    this.selectedFilters = new Map<string, any[]>([]);
    this.currentProducts = [];
    this.keys = ['price'];
  }

  update() {
    this.updateFilters.emit(this.selectedFilters);
  }

  // slider

  ngOnInit(): void {}

  ngOnChanges(): void {
    // slider
    this.findMinMax();
    this.ref.detectChanges();
    this.slideOne();
    this.slideTwo();

    // compute filters
    this.currentProducts.forEach((p: Product) => {
      if (p.filters) {
        Object.keys(p.filters).forEach((v: string) => {
          if (this.productFilters.get(v)) {
            const existingFilters = this.productFilters.get(v)!;
            const newFilter = p.filters![v as keyof ClothingFilter];
            existingFilters.push(newFilter);
            this.productFilters.set(v, [...new Set(existingFilters)]);
          } else
            this.productFilters.set(v, [p.filters![v as keyof ClothingFilter]]);
        });
      }
    });

    this.keys = Array.from(this.productFilters.keys());
  }

  isNan(int: number) {
    return isNaN(int);
  }

  findMinMax() {
    this.currentProducts.forEach((product: Product) => {
      if (product.preview.price) {
        if (isNaN(this.max)) {
          this.max = 0;
        }
        if (isNaN(this.min)) {
          this.min = Infinity;
        }
        this.min = Math.min(this.min, parseInt(product.preview.price));
        this.max = Math.max(this.max, parseInt(product.preview.price));
        this.selectedFilters.set('price', [this.min, this.max]);
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
    this.selectedFilters.set('price', [
      parseInt(sliderOne.value),
      parseInt(sliderTwo.value),
    ]);
  }

  toggleFilter(category: string, option: string, event: Event) {
    const checked = (event.currentTarget as HTMLInputElement).checked;
    let currentFilter = this.selectedFilters.get(category);
    if (currentFilter) {
      if (checked) {
        currentFilter.push(option);
        this.selectedFilters.set(category, [...new Set(currentFilter)]);
      } else {
        currentFilter = currentFilter.filter((op: string) => {
          return op !== option;
        });
        this.selectedFilters.set(category, [...new Set(currentFilter)]);
        if (currentFilter.length === 0) {
          this.selectedFilters.delete(category);
        }
      }
    } else if (checked) {
      this.selectedFilters.set(category, [option]);
    }

    this.update();
  }
}
