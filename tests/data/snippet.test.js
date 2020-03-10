const Snippet = require('./../../lib/data/snippet');

describe(".id", () => {
    it("returns id", () => {
        expect(new Snippet(1, 'foo').id).toEqual(1);
    });
});

describe(".content", () => {
    it("returns content", () => {
        expect(new Snippet(1, 'foo').content).toEqual('foo');
    });
});

describe(".from", () => {
    var params;

    beforeEach(() => {
        params = { id: 1, content: 'foo' };
    });

    it("rasies error when id is missing", () => {
        delete params.id

        expect(() => Snippet.from(params)).toThrow(Error);
    });

    it("rasies error when content is missing", () => {
        delete params.content

        expect(() => Snippet.from(params)).toThrow(Error);
    });

    it ("returns snippet", () => {
        expect(Snippet.from(params)).toBeInstanceOf(Snippet);
    });
});

describe(".toString()", () => {
    it("returns content", () => {
        expect(new Snippet(1, 'foo').toString()).toEqual('foo');
    });
});
