import Client from '../src/client';

describe('System', () => {
  const apiKey = 'kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc';
  const jahuty = new Client({ apiKey });

  const render1 = { snippetId: 1, content: '<p>This is my first snippet!</p>' };
  const render62 = { snippetId: 62, content: '<p>This foo is bar.</p>' };

  const publishedRender102 = { snippetId: 102, content: '<p>This content is published.</p>' }
  const latestRender102 = { snippetId: 102, content: '<p>This content is latest.</p>' }

  describe('user renders one snippet' , () => {
    describe('with a static snippet', () => {
      it('renders the snippet', async () => {
        let render = await jahuty.snippets.render(1);

        expect(render.content).toBe(render1.content);

        // A second render should use the cached value.
        const start = new Date().getTime();
        render = await jahuty.snippets.render(1);
        const end = new Date().getTime();

        expect(end - start).toBeLessThan(5);
        // Verify the content is correct (see #26 for details).
        expect(render.content).toBe(render1.content);
      });
    });

    describe('with parameters', () => {
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

    describe('with latest content', () => {
      it('renders the snippets', async () => {
        const render = await jahuty.snippets.render(102, { preferLatest: true });

        expect(render).toEqual(latestRender102);
      });
    });
  });

  describe('user renders many snippets', () => {
    describe('with parameters', () => {
      it('renders the snippets', async () => {
        const renders = await jahuty.snippets.allRenders('test', {
          params: { '*': { foo: 'foo' }, 62: { bar: 'bar' } },
        });

        expect(renders).toContainEqual(render1);
        expect(renders).toContainEqual(render62);
        expect(renders).toContainEqual(publishedRender102);

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

    describe('with latest content', () => {
      it('renders the snippets', async () => {
        const renders = await jahuty.snippets.allRenders('test', { preferLatest: true });

        expect(renders).toContainEqual(latestRender102);
      });
    });
  });
});
