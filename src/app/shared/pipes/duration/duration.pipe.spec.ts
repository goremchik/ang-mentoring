// Pipes
import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
      pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should show 0 minutes', () => {
    expect(pipe.transform()).toBe('0 min');
  });

  it('should show only minutes', () => {
    expect(pipe.transform(59)).toBe('59 min');
  });

  it('should show hours and minutes', () => {
    expect(pipe.transform(78)).toBe('1h 18 min');
  });
});
