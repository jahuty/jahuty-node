if (document) {
    document.addEventListener("DOMContentLoaded", function () {
        function load(snippet) {
            var id  = snippet.getAttribute('data-snippet-id');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://jahuty.com/api/snippets/' + id);
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
}
