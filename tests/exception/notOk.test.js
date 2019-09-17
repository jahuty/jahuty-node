const NotOk   = require('./../../lib/exception/notOk');
const Problem = require('./../../lib/data/problem');

describe(".problem", () => {
    it("returns problem", () => {
        let problem = new Problem(1, 'foo', 'bar');

        expect(new NotOk(problem).problem).toEqual(problem);
    });
});

describe(".message", () => {
    it("returns string", () => {
        let problem = new Problem(1, 'foo', 'bar');
        let message = new NotOk(problem).message;

        expect(message).toContain(1);
        expect(message).toContain('foo');
        expect(message).toContain('bar');
    });
});
