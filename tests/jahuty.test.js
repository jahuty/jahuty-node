import Jahuty from './../src/jahuty';

describe('Jahuty', () => {
  // describe('::initialize()', () => {
  //   it("inserts snippet if container exists", () => {
  //     document.body.innerHTML = '<div data-snippet-id="1"></div>';
  //
  //     let expected =
  //         '<div data-snippet-id="1">' +
  //           '<p>This is my first snippet!</p>' +
  //         '</div>';
  //
  //     Jahuty.setKey('kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc');
  //
  //     return Jahuty.initialize().then(() => {
  //       expect(document.body.innerHTML).toEqual(expected);
  //     });
  //   });
  // });

  describe('.ORIGIN', () => {
    it('returns an https url', () => {
      expect(Jahuty.BASE_URL).toBe('https://api.jahuty.com');
    });
  });

  describe('.VERSION', () => {
    it('returns a version number', () => {
      expect(Jahuty.VERSION).toMatch(/^\d+(\.\d+){0,2}$/);
    });
  });
});
