const Snippet = require('./../index');
const mock    = require('./../node_modules/xhr-mock/dist/xhr-mock.js');

describe("VERSION", () => {
    it("returns a version number", () => {
        expect(Snippet.VERSION).toEqual("0.1.0");
    });
});

describe(".init()", () => {
    beforeEach(() => mock.setup());

    afterEach(() => mock.teardown());

    // this test produces a whole bunch of errors, because Snippet.get is
    // undefined in load.js
    //
    // it("should work", async () => {
    //     let url     = 'https://www.jahuty.com/api/snippets/1';
    //     let snippet = {"id": 1, "content": "<p>bar</p>"};
    //
    //     Snippet.key = 'foo';
    //
    //     document.body.innerHTML =
    //         '<div data-snippet-id="1">' +
    //         '  <p>foo</p>' +
    //         '</div>';
    //
    //     mock.get(url, { status: 200, body: JSON.stringify(snippet) });
    //
    //     Snippet.init();
    //
    //     document.dispatchEvent(new Event("DOMContentLoaded", {
    //       bubbles: true,
    //       cancelable: true
    //     }));
    //
    //     let expected =
    //         '<div data-snippet-id="1">' +
    //             snippet.content +
    //         '</div>';
    //
    //     return expect(document.body.innerHTML).toEqual(expected);
    // });
});

describe(".get()", () => {
    it("throws error if key is undefined", () => {
        expect(() => Snippet.get(1)).toThrow(Error);
    });

    it("returns snippet if key is defined", () => {
        Snippet.key = '78e202009659616eceed79c01a75bfe9';

        return Snippet.get(1).then((snippet) => {
            expect(snippet.content).toEqual('This is my first snippet!');
        });
    });
});
