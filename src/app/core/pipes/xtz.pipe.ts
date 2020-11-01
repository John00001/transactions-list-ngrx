import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xtz' })

export class XtzPipe implements PipeTransform {
  transform(value: number): string {
    const extraSign = value > 0 ? '+' : '';
    return `${extraSign}${value.toString()} XTZ`;
  }
}
