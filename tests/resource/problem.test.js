import Problem from '../../src/resource/problem';

describe('Problem', () => {
  const status = 1;
  const type = 'foo';
  const detail = 'bar';

  const problem = new Problem({ status, type, detail });

  describe('.detail', () => {
    it('returns detail', () => {
      expect(problem.detail).toEqual(detail);
    });
  });

  describe('.status', () => {
    it('returns status', () => {
      expect(problem.status).toEqual(status);
    });
  });

  describe('.type', () => {
    it('returns type', () => {
      expect(problem.type).toEqual(type);
    });
  });
});
