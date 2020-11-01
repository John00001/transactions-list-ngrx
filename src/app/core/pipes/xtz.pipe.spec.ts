import { XtzPipe } from './xtz.pipe';

describe('XtzPipe', () => {
  const pipe = new XtzPipe();

  it('transforms 0 to "0 XTZ"', () => {
    expect(pipe.transform(0)).toBe('0 XTZ');
  });

  it('transforms 100 to "+100 XTZ"', () => {
    expect(pipe.transform(100)).toBe('+100 XTZ');
  });

  it('transforms -1000 to "-1000 XTZ"', () => {
    expect(pipe.transform(-1000)).toBe('-1000 XTZ');
  });

});
