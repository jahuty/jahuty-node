import Base from './../../src/service/base';

describe('Base', () => {
  describe('.client', () => {
    it('constructs', () => {
      expect(new Base({ client: {} })).toBeInstanceOf(Base);
    });
  });
});
