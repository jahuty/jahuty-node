import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Page from '../src/page';

const mock = new MockAdapter(Axios);

describe('Jahuty', () => {
  describe('::initialize()', () => {
    describe('when zero containers exist', () => {
      beforeEach(() => {
        document.body.innerHTML = '<div></div>';
      });

      it('does not throw error', () => {
        expect(() => Page.initialize('foo')).not.toThrow(Error);
      });
    });

    describe('when one container exists', () => {
      const content = '<p>foo</p>';
      const payload = { content };

      beforeEach(() => {
        document.body.innerHTML = '<div data-snippet-id="1"></div>';

        mock.onGet('/snippets/1/render').reply(200, payload);
      });

      it('renders content', async () => {
        await Page.initialize('foo');

        expect(document.body.innerHTML).toBe(
          `<div data-snippet-id="1">${content}</div>`,
        );
      });
    });

    describe('when many containers exist', () => {
      const content1 = '<p>foo</p>';
      const content2 = '<p>bar</p>';
      const content3 = '<p>baz</p>';

      const payload1 = { content: content1 };
      const payload2 = { content: content2 };
      const payload3 = { content: content3 };

      beforeEach(() => {
        document.body.innerHTML = '<div data-snippet-id="1"></div>'
          + '<div data-snippet-id="2"></div>'
          + '<div data-snippet-id="3"></div>';

        mock.onGet('/snippets/1/render').reply(200, payload1);
        mock.onGet('/snippets/2/render').reply(200, payload2);
        mock.onGet('/snippets/3/render').reply(200, payload3);
      });

      it('renders content', async () => {
        await Page.initialize('foo');

        expect(document.body.innerHTML).toBe(
          `<div data-snippet-id="1">${content1}</div>`
            + `<div data-snippet-id="2">${content2}</div>`
            + `<div data-snippet-id="3">${content3}</div>`,
        );
      });
    });
  });
});
