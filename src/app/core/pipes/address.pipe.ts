import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'address' })

export class AddressPipe implements PipeTransform {
  transform(value: string): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (value.length < 10) {
      return value;
    }

    return `${value.slice(0, 2)}...${value.slice(-5)}`;
  }
}
