import BadResponse from '../../src/error/bad-response';
import Problem from '../../src/resource/problem';

describe('BadResponse', () => {
  const status = 1;
  const type = 'foo';
  const detail = 'bar';
  const problem = new Problem({ status, type, detail });

  const error = new BadResponse(problem);

  describe('.problem', () => {
    it('returns problem', () => {
      expect(error.problem).toEqual(problem);
    });
  });

  describe('.message', () => {
    it('contains status', () => {
      expect(error.message).toContain(1);
    });

    it('contains type', () => {
      expect(error.message).toContain(type);
    });

    it('contains detail', () => {
      expect(error.message).toContain(detail);
    });
  });
});
