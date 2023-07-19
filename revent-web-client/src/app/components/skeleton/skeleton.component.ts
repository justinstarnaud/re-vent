import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  @Input() type: string = 'image';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() transparent: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
