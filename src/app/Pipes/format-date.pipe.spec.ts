import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('formatDate pipe type 1 success', () => {
    let date = '2021-09-25T00:00:00.000Z';

    const result1 = pipe.transform(new Date(date), 1);
    expect(result1).toBe('25092021');
  });
  it('formatDate pipe type 2 success', () => {
    let date = '2021-09-25T00:00:00.000Z';

    const result2 = pipe.transform(new Date(date), 2);
    expect(result2).toBe('25 / 09 / 2021');
  });
  it('formatDate pipe type 3 success', () => {
    let date = '2021-09-25T00:00:00.000Z';

    const result3 = pipe.transform(new Date(date), 3);
    expect(result3).toBe('25/09/2021');
  });
  it('formatDate pipe type 4 success', () => {
    let date = '2021-09-25T00:00:00.000Z';

    const result4 = pipe.transform(new Date(date), 4);
    expect(result4).toBe('2021-09-25');
  });
});
