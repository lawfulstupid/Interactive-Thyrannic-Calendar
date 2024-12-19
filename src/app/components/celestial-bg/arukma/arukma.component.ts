import { Component, Input } from '@angular/core';
import { TDateTime } from 'src/app/model/thyrannic-date-time';

@Component({
  selector: 'app-arukma',
  standalone: true,
  imports: [],
  template: '<div></div>',
  styleUrl: './arukma.component.scss'
})
export class ArukmaComponent {

  readonly angularDiameter: number = 0;
  latitude: number = 0;
  longitude: number = 0;

  @Input('datetime')
  set updatePosition(datetime: TDateTime) {

  }

}
