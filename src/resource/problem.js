/**
 * A problem resource.
 */
export default class Problem {
  constructor({ status, type, detail }) {
    this.status = status;
    this.type = type;
    this.detail = detail;
  }

  static from(payload) {
    if (!('status' in payload)) {
      throw new Error("Payload missing 'status' key");
    }

    if (!('type' in payload)) {
      throw new Error("Payload missing 'type' key");
    }

    if (!('detail' in payload)) {
      throw new Error("Payload missing 'detail' key");
    }

    return new Problem({
      status: payload.status,
      type: payload.type,
      detail: payload.detail,
    });
  }
}
