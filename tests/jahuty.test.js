import Axios from 'axios';
import Jahuty from './../src/jahuty.js'

describe('Jahuty', () => {
  beforeEach(() => {
    Jahuty._key = null;
    Jahuty._client = null;
  });

  afterEach(() => Jahuty._key = null);

  describe('::getClient()', () => {
    it('throws exception if key is not set', () => {
      expect(() => Jahuty.getClient()).toThrow(Error);
    });

    it('returns axios instance if key is set', () => {
      Jahuty.setKey('foo');
      expect(Jahuty.getClient()).toBeInstanceOf(Function);
    });
  });

  describe('::getKey()', () => {
    it('returns null if key does not exist', () => {
      expect(Jahuty.getKey()).toBeNull();
    });

    it('returns string if key does exist', () => {
      Jahuty._key = 'foo';
      expect(Jahuty.getKey()).toBe('foo');
    });
  });

  describe('::hasKey()', () => {
    it('returns false if key does not exist', () => {
      Jahuty._key = null;
      expect(Jahuty.hasKey()).toBeFalsy();
    });

    it('returns true if key does exist', () => {
      Jahuty._key = 'foo';
      expect(Jahuty.hasKey()).toBeTruthy();
    });
  });

  describe('::initialize()', () => {
    it("inserts snippet if container exists", () => {
      document.body.innerHTML = '<div data-snippet-id="1"></div>';

      let expected =
          '<div data-snippet-id="1">' +
            '<p>This is my first snippet!</p>' +
          '</div>';

      Jahuty.setKey('kn2Kj5ijmT2pH6ZKqAQyNexUqKeRM4VG6DDgWN1lIcc');

      return Jahuty.initialize().then(() => {
        expect(document.body.innerHTML).toEqual(expected);
      });
    });
  });

  describe('::ORIGIN', () => {
    it('returns an https url', () => {
      expect(Jahuty.ORIGIN).toBe('https://api.jahuty.com');
    });
  });

  describe('::VERSION', () => {
    it('returns a version number', () => {
      expect(Jahuty.VERSION).toMatch(/^\d+(\.\d+){0,2}$/);
    });
  });
});
