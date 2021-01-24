import Client from '../src/client';
import Page from '../src/page';

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

  describe('when the user initializes a page', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div data-snippet-id="1"></div>';
    });

    it('renders the page', async () => {
      await Page.initialize(apiKey);

      expect(document.body.innerHTML).toBe(
        `<div data-snippet-id="1">${content}</div>`,
      );
    });
  });
});
