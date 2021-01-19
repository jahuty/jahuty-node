/**
 * A problem resource.
 */
export default class Problem {
  constructor({ status, type, detail }) {
    this.status = status;
    this.type = type;
    this.detail = detail;
  }
}
