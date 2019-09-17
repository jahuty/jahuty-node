const Load    = require('./../../lib/service/load');
const NotOk   = require('./../../lib/exception/notOk');
const Snippet = require('./../../index');
const mock    = require('./../../node_modules/xhr-mock/dist/xhr-mock.js');

describe("Load", () => {
    it("returns function", () => {
        expect(Load(document)).toBeInstanceOf(Function);
    });

    describe("()", () => {
        const base    = "https://www.jahuty.com/api/snippets"
        const snippet = { "id": 1, "content": "<p>bar</p>" };
        const problem = { "status": 1, "type": "foo", "detail": "bar" };

        let subject;

        beforeEach(() => {
            mock.setup();
            subject = Load()
        });

        afterEach(() => mock.teardown());

        it("does not change html if zero containers exist", () => {
            document.body.innerHTML =
                '<div>' +
                '  <p>foo</p>' +
                '</div>';

            let expected = document.body.innerHTML;

            return subject(document).then(() => {
                expect(document.body.innerHTML).toEqual(expected);
            });
        });

        it("inserts snippet if one container exists", () => {
            Snippet.key = 'foo';

            document.body.innerHTML =
                '<div data-snippet-id="1">' +
                '  <p>foo</p>' +
                '</div>';

            mock.get(`${base}/1`, { status: 200, body: JSON.stringify(snippet) });

            let expected =
                '<div data-snippet-id="1">' +
                    snippet.content +
                '</div>';

            return subject(document).then(() => {
                expect(document.body.innerHTML).toEqual(expected);
            });
        });

        it("inserts snippets if many containers exist", () => {
            Snippet.key = 'foo';

            document.body.innerHTML =
                '<div data-snippet-id="1">' +
                '  <p>foo</p>' +
                '</div>' +
                '<div data-snippet-id="2">' +
                '  <p>baz</p>' +
                '</div>';

            mock.get(`${base}/1`, { status: 200, body: JSON.stringify(snippet) });
            mock.get(`${base}/2`, { status: 200, body: JSON.stringify(snippet) });

            let expected =
                '<div data-snippet-id="1">' +
                    snippet.content +
                '</div>' +
                '<div data-snippet-id="2">' +
                    snippet.content +
                '</div>';

            return subject(document).then(() => {
                expect(document.body.innerHTML).toEqual(expected);
            });
        });

        // this test produces an "UnhandledPromiseRejectionWarning"
        // it("throws error if request fails", () => {
        //     Snippet.key = 'foo';
        //
        //     document.body.innerHTML =
        //         '<div data-snippet-id="1">' +
        //         '  <p>foo</p>' +
        //         '</div>';
        //
        //     mock.get(`${base}/1`, { status: 401, body: JSON.stringify(problem) });
        //
        //     return subject(document).catch((error) => {
        //         expect(error).toBeInstanceOf(NotOk);
        //     });
        // });
    });
});
