export default class NotOk extends Error
{
  constructor(problem) {
    super();

    this.problem = problem;
    this.message = `The API responded with ${this.problem.status}, ${this.problem.type}: ${this.problem.detail}`;
  }
}
