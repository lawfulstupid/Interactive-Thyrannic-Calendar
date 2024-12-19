import { Component, Input } from '@angular/core';
import { TDateTime } from 'src/app/model/thyrannic-date-time';

@Component({
  selector: 'app-losit',
  standalone: true,
  imports: [],
  template: '<div></div>',
  styleUrl: './losit.component.scss'
})
export class LositComponent {

  @Input('datetime')
  set updatePosition(datetime: TDateTime) {

  }

}
