import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usd' })

export class UsdPipe implements PipeTransform {
  transform(value: number): string {
    const xtzInUsd = 1.94; // the value from Nov 1 2020
    const usd = value * xtzInUsd;
    return `${usd.toString()} USD`;
  }
}
