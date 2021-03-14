import Client from '../src/client';

describe('System', () => {
  const apiKey = 'kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc';
  const jahuty = new Client({ apiKey });

  const render1 = { snippetId: 1, content: '<p>This is my first snippet!</p>' };
  const render62 = { snippetId: 62, content: '<p>This foo is bar.</p>' };

  describe('when the user renders a static snippet', () => {
    it('renders the snippet', async () => {
      const render = await jahuty.snippets.render(1);

      expect(render.content).toBe(render1.content);

      // A second render should use the cached value.
      const start = new Date().getTime();
      await jahuty.snippets.render(1);
      const end = new Date().getTime();

      expect(end - start).toBeLessThan(5);
    });
  });

  describe('when the user renders a parameterized snippet', () => {
    it('renders the snippet', async () => {
      const params = { foo: 'foo', bar: 'bar' };

      const render = await jahuty.snippets.render(62, { params });

      expect(render.content).toBe(render62.content);

      // A second render with the same params should use the cached value.
      let start = new Date();
      await jahuty.snippets.render(62, { params });
      let end = new Date();

      expect(end.getTime() - start.getTime()).toBeLessThan(5);

      // A third render with different params should render the snippet.
      params.bar = 'baz';

      start = new Date();
      await jahuty.snippets.render(62, { params });
      end = new Date();

      expect(end.getTime() - start.getTime()).toBeGreaterThan(5);
    });
  });

  describe('when the user renders many snippets', () => {
    it('renders the snippets', async () => {
      // This request should return two renders.
      const renders = await jahuty.snippets.allRenders('test', {
        params: { '*': { foo: 'foo' }, 62: { bar: 'bar' } },
      });

      expect(renders).toHaveLength(2);
      expect(renders).toContainEqual(render1);
      expect(renders).toContainEqual(render62);

      // A call to render a snippet in the collection should use the cached value.
      let start = new Date();
      await jahuty.snippets.render(1);
      let end = new Date();

      expect(end.getTime() - start.getTime()).toBeLessThan(5);

      // A call to render a snippet in the collection with the equivalent params
      // should use the cached value.
      start = new Date();
      await jahuty.snippets.render(62, { params: { foo: 'foo', bar: 'bar' } });
      end = new Date();

      expect(end.getTime() - start.getTime()).toBeLessThan(5);
    });
  });
});
