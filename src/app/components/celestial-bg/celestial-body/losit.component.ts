import { Component } from '@angular/core';
import { CelestialBody } from './celestial-body';
import { SunComponent } from './sun.component';

@Component({
  selector: 'app-losit',
  standalone: true,
  imports: [],
  templateUrl: './celestial-body.html',
  styleUrl: './celestial-body.scss'
})
export class LositComponent extends CelestialBody {
  
  override angularDiameter = 0.44;
  override color = 'rgb(63, 21, 16)';
  override brightness = 0.92;
  override zIndex = 2;

  override inclination = 10.1134;
  override periapsisArgument = 265.951;
  override eccentricity = 0.1361;
  override originAngle = SunComponent.INSTANCE.originAngle + 321.7148;
  override orbitalPeriod = CelestialBody.synodicToSiderealPeriod(48.28098);
  override ascendingNodeLongitude = 329.915;

}
