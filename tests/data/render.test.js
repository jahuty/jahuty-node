import Render from './../../src/data/render';

describe('Snippet', () => {
  describe('.content', () => {
    it('returns content', () => {
      expect(new Render('foo').content).toEqual('foo');
    });
  });

  describe('.from', () => {
    let params;

    beforeEach(() => {
      params = { content: 'foo' };
    });

    it('rasies error when content is missing', () => {
        delete params.content

        expect(() => Render.from(params)).toThrow(Error);
    });

    it ('returns snippet', () => {
        expect(Render.from(params)).toBeInstanceOf(Render);
    });
  });

  describe('.toString()', () => {
    it('returns content', () => {
      expect(new Render('foo').toString()).toEqual('foo');
    });
  });
});
