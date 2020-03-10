const Get     = require('./../../lib/service/get');
const Snippet = require('./../../lib/data/snippet');
const NotOk   = require('./../../lib/exception/notOk');
const mock    = require('./../../node_modules/xhr-mock/dist/xhr-mock.js');

describe("Get", () => {
    it("returns function", () => {
        expect(Get('foo')).toBeInstanceOf(Function);
    });

    describe("()", () => {
        const id  = 1;
        const url = `https://www.jahuty.com/api/snippets/${id}`;

        const problem = { "status": 1, "type": "foo", "detail": "bar" };
        const snippet = { "id": 1, "content": "foo" };

        let subject;

        beforeEach(() => {
            mock.setup();
            subject = Get('foo');
        });

        afterEach(() => mock.teardown());

        it("sends User-Agent header", () => {
            mock.get(url, (req, res) => {
              expect(req.header('User-Agent')).toContain(Snippet.VERSION);
            });
        });

        it("sends Authorization header", () => {
            mock.get(url, (req, res) => {
              expect(req.header('Content-Type')).toContain('application/json');
            });
        });

        it("returns an error on invalid JSON response", () => {
            mock.get(url, { status: 200, body: '{foo: bar}' });

            return subject(id).catch((error) => {
                expect(error).toBeInstanceOf(Error);
            });
        });

        it("returns a problem on 401 status code", () => {
            problem.status = 401;

            mock.get(url, { status: 401, body: JSON.stringify(problem) });

            return subject(id).catch((problem) => {
                expect(problem).toBeInstanceOf(NotOk);
            });
        });


        it("returns a problem on 404 status code", () => {
            problem.status = 404;

            mock.get(url, { status: 404, body: JSON.stringify(problem) });

            return subject(id).catch((problem) => {
                expect(problem).toBeInstanceOf(NotOk);
            });
        });


        it("returns a problem on 5XX status code", () => {
            problem.status = 500;

            mock.get(url, { status: 500, body: JSON.stringify(problem) });

            return subject(id).catch((problem) => {
                expect(problem).toBeInstanceOf(NotOk);
            });
        });

        it("returns a snippet on success", () => {
            mock.get(url, { status: 200, body: JSON.stringify(snippet) });

            return subject(id).then((snippet) => {
                expect(snippet).toBeInstanceOf(Snippet);
            });
        });
    })
});
