import { Component, Input } from '@angular/core';
import { TDateTime } from 'src/app/model/thyrannic-date-time';
import { EarthComponent } from "./earth/earth.component";
import { SkyComponent } from './sky/sky.component';
import { SunComponent } from "./sun/sun.component";
import { ArukmaComponent } from './arukma/arukma.component';
import { LositComponent } from './losit/losit.component';

@Component({
  selector: 'app-celestial-bg',
  standalone: true,
  templateUrl: './celestial-bg.component.html',
  imports: [EarthComponent, SkyComponent, SunComponent, ArukmaComponent, LositComponent]
})
export class CelestialBgComponent {

  @Input()
  datetime!: TDateTime;

}
