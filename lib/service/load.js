const Snippet = require('./../../index');
const NotOk   = require('./../exception/notOk');

module.exports = function Load()
{
    let attribute = 'data-snippet-id';

    return () => {
        let containers = document.querySelectorAll(`[${attribute}]`);
        let requests   = [];

        if (containers.length) {
            containers.forEach((container) => {
                let id = container.getAttribute(attribute);

                let request = Snippet.get(id);

                requests.push(request);

                request.then((snippet) => {
                    container.innerHTML = snippet.content;
                });
            });
        }

        return Promise.all(requests);
    }
}
