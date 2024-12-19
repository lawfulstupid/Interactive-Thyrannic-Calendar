import { Component, Input } from '@angular/core';
import { TDateTime } from 'src/app/model/thyrannic-date-time';
import { CelestialBody } from '../celestial-body';

@Component({
  selector: 'app-sun',
  standalone: true,
  imports: [],
  template: '<div></div>',
  styleUrl: './sun.component.scss'
})
export class SunComponent extends CelestialBody {

  @Input('datetime')
  set updatePosition(datetime: TDateTime) {
    this.update(datetime);
    console.log(this.rightAscension, this.declination);
  }

  override ascendingNodeLongitude(d: number): number {
    return 0;
  }

  override originAngle: number = 11.2854;
  override orbitalPeriod: number = 340.16433;
  override inclination: number = 0;
  override perihelionAngle: number = 94.662;
  override meanDist: number = 1;
  override eccentricity: number = 0.0167;
  override perihelionEpoch: number = (this.perihelionAngle - this.originAngle) * (this.orbitalPeriod / 360);

}
