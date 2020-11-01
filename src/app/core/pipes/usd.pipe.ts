import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usd' })

export class UsdPipe implements PipeTransform {
  transform(value: number): string {
    const xtzInUsd = 1.94; // the value from Nov 1 2020
    const usd = Math.abs(value * xtzInUsd); // in the provided example, usd values are without positives or negatives signs
    return `${usd.toString()} USD`;
  }
}
