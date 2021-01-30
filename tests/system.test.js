import Client from '../src/client';

describe('System', () => {
  const apiKey = 'kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc';
  const content = '<p>This is my first snippet!</p>';
  const jahuty = new Client({ apiKey });

  describe('when the user renders a snippet', () => {
    it('returns render', async () => {
      const render = await jahuty.snippets.render(1);

      expect(render).toMatchObject({ content });
    });
  });
});
