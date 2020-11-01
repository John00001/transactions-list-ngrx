import { AddressPipe } from './address.pipe';

describe('AddressPipe', () => {
  const pipe = new AddressPipe();

  it('transforms "abcd" to "abcd"', () => {
    expect(pipe.transform('abcd')).toBe('abcd');
  });

  it('transforms "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX" to "tz...Cj4MX"', () => {
    expect(pipe.transform('tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX')).toBe('tz...Cj4MX');
  });

});
