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

  describe('.from', () => {
    let params;

    beforeEach(() => {
      params = { status: 1, type: 'foo', detail: 'bar' };
    });

    it('rasies error when status is missing', () => {
      delete params.status;

      expect(() => Problem.from(params)).toThrow(Error);
    });

    it('rasies error when type is missing', () => {
      delete params.type;

      expect(() => Problem.from(params)).toThrow(Error);
    });

    it('rasies error when detail is missing', () => {
      delete params.detail;

      expect(() => Problem.from(params)).toThrow(Error);
    });

    it('does not raise error when extra attribute is present', () => {
      params.foo = 'bar';

      expect(() => Problem.from(params)).not.toThrow(Error);
    });

    it('returns problem', () => {
      expect(Problem.from(params)).toBeInstanceOf(Problem);
    });
  });
});
