import Client from '../src/client';
import Render from '../src/resource/render';

describe('System', () => {
  describe('snippets.render', () => {
    it('returns render', async () => {
      const jahuty = new Client({
        apiKey: 'kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc',
      });

      const render = await jahuty.snippets.render(1);

      expect(render).toBeInstanceOf(Render);
      expect(render.content).toEqual('<p>This is my first snippet!</p>');
    });
  });
});
