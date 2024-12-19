import { TDateTime } from "src/app/model/thyrannic-date-time";
import { MathUtil } from "src/app/util/math-util";

export abstract class CelestialBody {
  
  private static readonly LATITUDE: number = 35.19; // can parameterise this later

  abstract ascendingNodeLongitude(d: number): number; // longitude of the ascending node (where body appears on horizon)
  abstract readonly inclination: number; // inclination to the ecliptic (plane of the Earth's orbit)
  abstract readonly perihelionAngle: number; // sidereal argument of perihelion
  abstract readonly meanDist: number; // semi-major axis, or mean distance from Sun
  abstract readonly eccentricity: number; // eccentricity (0=circle, 0-1=eclipse, 1=parabola)
  abstract readonly perihelionEpoch: number; // epoch of perihelion (in fractional day)
  abstract readonly originAngle: number; // anomaly at epoch
  abstract readonly orbitalPeriod: number; // orbital period (fractional days)
  readonly ecl: number = 24.1; // obliquity of ecliptic (tilt of earth's axis of rotation)

  // mean anomaly (0 at perihelion; increases uniformly with time)
  meanAnomaly(d: number): number {
    return MathUtil.fixAngle(this.originAngle + (360 / this.orbitalPeriod) * d);
  }

  // longitude of perihelion
  perihelionLongitude(d: number): number {
    return MathUtil.fixAngle(this.ascendingNodeLongitude(d) + this.perihelionAngle);
  }

  // mean longitude
  meanLongitude(d: number): number {
    return MathUtil.fixAngle(this.meanAnomaly(d) + this.perihelionLongitude(d));
  }

  // perihelion distance
  get perihelionDist(): number {
    return this.meanDist * (1 - this.eccentricity)
  }

  // aphelion distance
  get aphelionDist(): number {
    return this.meanDist * (1 + this.eccentricity);
  }

  // time of perihelion
  perihelionTime(d: number): number {
    return this.perihelionEpoch - (this.meanAnomaly(d) / 360) / this.orbitalPeriod;
  }
  
  update(datetime: TDateTime) {
    this.computeDaRA(datetime);
    this.computeApparentPosition(datetime);
  }

  private computeDaRA(datetime: TDateTime) {
    const d = datetime.date.valueOf() + datetime.hour / 24;
    const E = MathUtil.fixAngle(this.meanAnomaly(d) + MathUtil.rad2deg(
      this.eccentricity * Math.sin(MathUtil.deg2rad(this.meanAnomaly(d))) * (
        1 + this.eccentricity * Math.cos(MathUtil.deg2rad(this.meanAnomaly(d)))
      )
    ));

    const xv = Math.cos(MathUtil.deg2rad(E)) - this.eccentricity;
    const yv = Math.sqrt(1.0 - this.eccentricity**2) * Math.sin(MathUtil.deg2rad(E));
    const v = MathUtil.fixAngle(MathUtil.rad2deg(Math.atan2(yv, xv)));
    const r = Math.sqrt(xv**2 + yv**2);

    const true_long = v + this.perihelionAngle;
    const xs = r * Math.cos(MathUtil.deg2rad(true_long));
    const ys = r * Math.sin(MathUtil.deg2rad(true_long));

    const xe = xs;
    const ye = ys * Math.cos(MathUtil.deg2rad(this.ecl));
    const ze = ys * Math.sin(MathUtil.deg2rad(this.ecl));

    this.rightAscension = MathUtil.fixAngle(MathUtil.rad2deg(Math.atan2(ye, xe)));
    this.declination = MathUtil.fixAngle(MathUtil.rad2deg(Math.atan2(ze, Math.sqrt(xe**2 + ye**2))));
  }
  
  rightAscension: number = 0;
  declination: number = 0;
  
  private computeApparentPosition(datetime: TDateTime) {
    const zenith = this.declination + 180 - CelestialBody.LATITUDE;
    
    const hourAngle = (datetime.hour / 24) * 360;
    
    const degFromTop = Math.acos(
      Math.sin(MathUtil.deg2rad(CelestialBody.LATITUDE)) * Math.sin(MathUtil.deg2rad(this.declination)) +
      Math.cos(MathUtil.deg2rad(CelestialBody.LATITUDE)) * Math.cos(MathUtil.deg2rad(this.declination)) * Math.cos(MathUtil.deg2rad(hourAngle))
    );
    
    console.log(90 - degFromTop);
    
    // this.rightAscension - 360 / 24;
    // const horizontalAngle: number = MathUtil.fixAngle(this.rightAscension - (datetime.hour - 12) * 360 / 24);
  }
  
  degreesUp: number = 0;
  westwardness: number = 0;

}