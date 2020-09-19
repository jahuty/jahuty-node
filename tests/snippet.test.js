import Jahuty from './../src/jahuty';
import Snippet from './../src/snippet';

// jest.mock('axios');

describe('Snippet', () => {
  describe('render', () => {
    it('throws error if key is not set', () => {
      expect(() => Snippet.render(1)).toThrow(Error);
    });

    // An end-to-end test that hits external API.
    it('returns render if key is set', () => {
      Jahuty.setKey('kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc');

      return Snippet.render(1).then((render) => {
          expect(render.content).toEqual('<p>This is my first snippet!</p>');
      });
    });
  });
});
