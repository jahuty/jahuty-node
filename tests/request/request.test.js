import Request from '../../src/request/request';

describe('Request', () => {
  const method = 'foo';
  const path = 'bar';
  const params = { baz: 'qux' };

  const request = new Request({ method, path, params });

  describe('.method', () => {
    it('returns method', () => {
      expect(request.method).toBe(method);
    });
  });

  describe('.path', () => {
    it('returns path', () => {
      expect(request.path).toBe(path);
    });
  });

  describe('.params', () => {
    it('returns params', () => {
      expect(request.params).toBe(params);
    });
  });
});
