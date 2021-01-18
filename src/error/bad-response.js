/**
 * Thrown when the API responds with a client or server error.
 */
export default class BadResponse extends Error {
  constructor(problem) {
    super();

    this.problem = problem;
    this.message = `The API responded with ${this.problem.status}, ${this.problem.type}: ${this.problem.detail}`;
  }
}
