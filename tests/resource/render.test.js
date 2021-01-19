import Render from '../../src/resource/render';

describe('Snippet', () => {
  const content = 'foo';

  const render = new Render({ content });

  describe('.content', () => {
    it('returns content', () => {
      expect(render.content).toEqual(content);
    });
  });

  describe('.toString()', () => {
    it('returns content', () => {
      expect(render.toString()).toEqual(content);
    });
  });
});
