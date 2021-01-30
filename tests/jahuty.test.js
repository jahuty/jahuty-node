import Jahuty from '../src/jahuty';

describe('Jahuty', () => {
  describe('::ORIGIN', () => {
    it('returns an https url', () => {
      expect(Jahuty.BASE_URL).toBe('https://api.jahuty.com');
    });
  });

  describe('::VERSION', () => {
    it('returns a version number', () => {
      expect(Jahuty.VERSION).toMatch(/^\d+(\.\d+){0,2}$/);
    });
  });
});
