import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xtz' })

export class XtzPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '0 XTZ';
    }

    const extraSign = value > 0 ? '+' : '';
    return `${extraSign}${value.toString()} XTZ`;
  }
}
