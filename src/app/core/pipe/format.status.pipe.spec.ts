import { TestBed } from '@angular/core/testing';
import { FormatStatusPipe } from './format.status.pipe';

describe('FormatStatusPipe', () => {
  let pipe: FormatStatusPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatStatusPipe]
    });
    pipe = TestBed.inject(FormatStatusPipe);
  });

  it('should return "Active" for true values', () => {
    expect(pipe.transform(true)).toBe('Active');
  });

  it('should return "Inactive" for false values', () => {
    expect(pipe.transform(false)).toBe('Inactive');
  });

  it('should return "Inactive" for null values', () => {
    expect(pipe.transform(null)).toBe('Inactive');
  });

  it('should return "Inactive" for undefined values', () => {
    expect(pipe.transform(undefined)).toBe('Inactive');
  });
});
