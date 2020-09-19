import Jahuty from './jahuty'
import NotOk from './exception/not-ok'
import Problem from './data/problem'
import Render from './data/render'

export default class Snippet
{
  static render(id, options = {}) {
    let params = 'params' in options ? options.params : {};

    const client = Jahuty.getClient();

    return client.get(`/snippets/${id}/render`, { params: params })
      .then(response => {
        return Render.from(response.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx.
          throw new NotOk(Problem.from(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received.

        } else {
          // Something happened in setting up the request.

        }
      });
  }
}
