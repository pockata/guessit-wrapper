guessit-wrapper
===============
NodeJS wrapper for the http://guessit.io API

# Installation

### Get the source
run `git clone https://github.com/pockata/guessit-wrapper.git`

### As an `npm` module
run `npm install guessit-wrapper`

# Usage
The wrapper uses promises from the `q` library
```javascript
var guessit = require('guessit-wrapper');

var filename = 'doctor_who_2005.6x03.the_curse_of_the_black_spot.720p_hdtv_x264-fov.mkv';
guessit.parseName(filename).then(function (data) {
  console.log(data);
});
```

# API
## guessit.parseName(filename, [request_method])
Make a request to the API:

* `filename` - The filaname that should be parsed