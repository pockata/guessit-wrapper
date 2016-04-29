module.exports = (function () {

    var http = require('http');
    var qs   = require('querystring');
    var Q    = require('q');

    function apiCall (path, query, post) {

        var deferred = Q.defer();

        var isPOST = (post === true);

        query = (query ? qs.stringify(query): '');

        if ( !isPOST) {
            path = path + (query.length ? '?' + query : '');
        }

        var options = {
            'hostname': 'guessit.io',
            'port': 80,
            'path': path,
            'method': isPOST ? 'POST' : 'GET'
        };

        if (isPOST) {
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': query.length
            };
        }

        var req = http.request(options, function (res) {

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                var parsedJson;
                try {
                    parsedJson = JSON.parse(chunk);
                }
                catch(e) {
                    deferred.reject(e.message);
                    return;
                }
                deferred.resolve(parsedJson);
            });
        });

        req.on('error', function (err) {
            deferred.reject(err);
        });

        if (isPOST) {
            req.write(query);
        }

        req.end();

        return deferred.promise;
    }

    function getVersion () {

        return apiCall('/guessit_version');
    }

    function parseName (filename, post) {

        return apiCall('/guess', {
            'filename': filename
        }, post);
    }

    function submitBug (filename) {

        return apiCall('/bugs', {
            'filename': filename
        }, true);
    }

    return {
        'apiCall': apiCall,
        'getVersion': getVersion,
        'parseName': parseName,
        'submitBug': submitBug
    };
})();
