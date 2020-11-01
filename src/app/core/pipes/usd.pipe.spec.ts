import { UsdPipe } from './usd.pipe';

describe('UsdPipe', () => {
  const pipe = new UsdPipe();

  it('transforms 0 to "0 USD"', () => {
    expect(pipe.transform(0)).toBe('0 USD');
  });

  it('transforms 100 to "194 USD"', () => {
    expect(pipe.transform(100)).toBe('194 USD');
  });

  it('transforms -1000 to "1940 USD"', () => {
    expect(pipe.transform(-1000)).toBe('1940 USD');
  });

});
