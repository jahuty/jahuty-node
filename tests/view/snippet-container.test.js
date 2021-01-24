import SnippetContainer from '../../src/view/snippet-container';

describe('SnippetContainer', () => {
  describe(':all', () => {
    describe('when containers do not exist', () => {
      beforeEach(() => {
        document.body.innerHTML = '<div></div>';
      });

      it('returns empty array', () => {
        expect(SnippetContainer.all()).toHaveLength(0);
      });
    });

    describe('when containers do exist', () => {
      beforeEach(() => {
        document.body.innerHTML = '<div data-snippet-id="1"></div>'
          + '<div data-snippet-id="2"></div>';
      });

      it('returns non-empty array', () => {
        expect(SnippetContainer.all()).toHaveLength(2);
      });

      it('returns container instances', () => {
        expect(SnippetContainer.all()[0]).toBeInstanceOf(SnippetContainer);
      });
    });
  });

  describe('.getSnippetId()', () => {
    const id = 1;

    const element = document.createElement('div');
    element.setAttribute('data-snippet-id', id);

    const container = new SnippetContainer(element);

    it('returns snippet id', () => {
      expect(container.getSnippetId()).toBe(id);
    });
  });

  describe('.setContent()', () => {
    const content = '<p>foo</p>';

    const element = document.createElement('div');

    const container = new SnippetContainer(element);

    it('sets html', () => {
      container.setContent(content);

      expect(element.innerHTML).toBe(content);
    });
  });
});
