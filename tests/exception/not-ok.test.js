import NotOk from './../../src/exception/not-ok';
import Problem from './../../src/data/problem';

describe('NoOk', () => {
  describe('.problem', () => {
    it('returns problem', () => {
      let problem = new Problem({ status: 1, type: 'foo', detail: 'bar' });

      expect(new NotOk(problem).problem).toEqual(problem);
    });
  });

  describe('.message', () => {
    it('returns string', () => {
      let problem = new Problem({ status: 1, type: 'foo', detail: 'bar' });
      let message = new NotOk(problem).message;

      expect(message).toContain(1);
      expect(message).toContain('foo');
      expect(message).toContain('bar');
    });
  });
});
