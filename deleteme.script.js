if (document) {
    if (window.jahuty_api_key) {
        document.addEventListener("DOMContentLoaded", function () {
            function load(snippet) {
                var id  = snippet.getAttribute('data-snippet-id');
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:3000/api/snippets/' + id);
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.jahuty_api_key);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.onload = function() {
                    var content, body = JSON.parse(xhr.responseText);
                    if (xhr.status === 200) {
                        content = body.content;
                    } else {
                        content = 'Request failed. Returned status of ' + xhr.status;
                    }
                    snippet.innerHTML = content;
                };
                xhr.send();
            };

            var snippets = document.querySelectorAll('[data-snippet-id]');

            if (snippets.length) {
                snippets.forEach(function(snippet) {
                    load(snippet);
                });
            }
        });
    } else if (window.console && window.console.error) {
        console.error('Missing jahuty API key!');
    }
}

create jahuty object with methods
create method set_auth
    if not run throw console error
    it's ok to put an error in console in production
there is no control about placement - must be agnostic because freameowkrs put it anywhere
no sure if DOmContentLoaded is right, because always uses document.ready

nowadays you don't touch the index file

examples:
    pub_nub
    jquery
