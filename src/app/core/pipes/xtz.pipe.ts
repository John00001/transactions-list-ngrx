import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xtz' })

export class XtzPipe implements PipeTransform {
  transform(value: number): string {
    const sign = value === 0 ? '' : value > 0 ? '+' : '-';
    return `${sign}${value.toString()} XTZ`;
  }
}
