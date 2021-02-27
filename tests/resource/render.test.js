import Render from '../../src/resource/render';

describe('Snippet', () => {
  const content = 'foo';

  const render = new Render({ content });

  describe('.content', () => {
    it('returns content', () => {
      expect(render.content).toEqual(content);
    });
  });

  describe('.from', () => {
    let params;

    beforeEach(() => {
      params = { content: 'foo' };
    });

    it('rasies error when content is missing', () => {
      delete params.content;

      expect(() => Render.from(params)).toThrow(Error);
    });

    it('does not rasie error when extra attribute is present', () => {
      params.foo = 'bar';

      expect(() => Render.from(params)).not.toThrow(Error);
    });

    it('returns snippet', () => {
      expect(Render.from(params)).toBeInstanceOf(Render);
    });
  });

  describe('.toString()', () => {
    it('returns content', () => {
      expect(render.toString()).toEqual(content);
    });
  });
});
