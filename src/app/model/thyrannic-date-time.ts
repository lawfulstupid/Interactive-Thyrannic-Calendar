import { MathUtil } from '../util/math-util';
import { TemporalUnit } from './temporal-unit';
import { TDate } from './thyrannic-date';

export class TDateTime {

  constructor (
    readonly date: TDate,
    readonly hour: number = 0
  ) {}

  public static fromValue(seq: number): TDateTime {
    seq = Math.floor(seq);
    const [daySeq, hourSeq] = MathUtil.divMod(seq, TemporalUnit.DAY.as(TemporalUnit.HOUR));
    return new TDateTime(TDate.fromValue(daySeq), hourSeq);
  }

  public static fromDate(date: Date = new Date()): TDateTime {
    return new TDateTime(TDate.fromDate(date), date.getUTCHours());
  }

  public valueOf(): number {
    return this.date.valueOf() * TemporalUnit.DAY.as(TemporalUnit.HOUR) + this.hour;
  }

  public getTime(): string {
    const displayHour = MathUtil.mod(this.hour - 1, 12) + 1;
    const amPm = this.hour < 12 ? 'AM' : 'PM';
    return displayHour + ' ' + amPm;
  }

  public toString(): string {
    return this.getTime() + ', ' + this.date.toString();
  }

  public add(quantity: number, unit: TemporalUnit = TemporalUnit.HOUR): TDateTime {
    if (TemporalUnit.HOUR.defines(unit)) {
      return TDateTime.fromValue(this.valueOf() + quantity * unit.as(TemporalUnit.HOUR));
    } else {
      return new TDateTime(<TDate>this.date.add(quantity, unit), this.hour);
    }
  }

}