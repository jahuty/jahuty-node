const Problem = require('./../../lib/data/problem');

describe(".detail", () => {
    it("returns detail", () => {
        expect(new Problem(1, 'foo', 'bar').detail).toEqual('bar');
    });
});

describe(".from", () => {
    var params;

    beforeEach(() => {
        params = { status: 1, type: 'foo', detail: 'bar' };
    });

    it("rasies error when status is missing", () => {
        delete params.status

        expect(() => Problem.from(params)).toThrow(Error);
    });

    it("rasies error when type is missing", () => {
        delete params.type

        expect(() => Problem.from(params)).toThrow(Error);
    });

    it("rasies error when detail is missing", () => {
        delete params.detail

        expect(() => Problem.from(params)).toThrow(Error);
    });

    it ("returns problem", () => {
        expect(Problem.from(params)).toBeInstanceOf(Problem);
    });
})

describe(".status", () => {
    it("returns status", () => {
        expect(new Problem(1, 'foo', 'bar').status).toEqual(1);
    });
});

describe(".type", () => {
    it("returns type", () => {
        expect(new Problem(1, 'foo', 'bar').type).toEqual('foo');
    });
});
