const Library = require('./../../index');
const Snippet = require('./../../lib/data/snippet');
const Problem = require('./../../lib/data/problem');
const NotOk   = require('./../../lib/exception/notOk');

module.exports = function Get(key)
{
    const baseUrl = "https://www.jahuty.com/api/snippets";

    const headers = {
        "Accept":          "application/json;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type":    "application/json; charset=utf-8",
        "User-Agent":      `Jahuty JavaScript client ${Library.VERSION}`,
        "Authorization":   `Bearer ${key}`
    };

    return (id) => {
        const xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                try {
                    payload = JSON.parse(xhr.responseText);

                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(Snippet.from(payload));
        			} else {
        				reject(new NotOk(Problem.from(payload)));
        			}
                } catch (error) {
                    reject(error)
                }
            }

            xhr.open('GET', `${baseUrl}/${id}`, true);

            // can't set headers until after open()
            for (const [header, value] of Object.entries(headers)) {
                xhr.setRequestHeader(header, value);
            }

    		xhr.send();
        });
    }
}
