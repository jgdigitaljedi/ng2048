exports.conditions = function(req, res) {
    fs.access('cache.json', fs.F_OK, function (err) {
        if (err) {
            /*jshnit ignore:start*/
            var emptyCache = {
                "conditions": {
                    "data": {},
                    "timestamp": "1234"
                },
                "forecast": {
                    "data": {},
                    "timestamp": "1234"
                }
            };
            /*jshnit ignore:end*/
            fs.writeFileSync('cache.json', JSON.stringify(emptyCache, null, 4), 'utf-8');
        }
        
        fs.readFile('cache.json', 'utf-8', function (err, data) {
            var readError = false;
            if (err) readError = true;

            var jsonObj;
            try { // error handling for JSON.parse
                jsonObj = JSON.parse(data);
            } catch (e) {
                readError = true;
            }

            var now = moment().unix(),
                conTimestamp = readError ? false : parseInt(jsonObj.conditions.timestamp),
                cachedConditions = readError ? false : jsonObj.conditions.data;
            if (!conTimestamp || !cachedConditions || now - conTimestamp >= 900) { // if timestamp doesn't exist or timestamp from cache is more than 15 minutes old
                http.get('http://api.wunderground.com/api/'+ process.env.WEATHER_KEY + '/geolookup/conditions/q/' + req.params.loc + '.json')
                    .on('response', function (response) {
                        var statusCode = response.statusCode;
                        var body = '',
                            i = 0,
                            resError = false;

                        if (statusCode !== 200) resError = true; // check for no response and handle error


                        response.on('error', function (err) {
                            resError = true;
                        });

                        response.on('data', function (chunk) {
                            if (!resError) {
                                i++;
                                body += chunk;                            
                            }
                        });
                        response.on('end', function () {
                            try {
                                body = JSON.parse(body);                            
                            } catch (e) {
                                resError = true;
                            }

                            if (!resError) {
                                jsonObj.conditions.data = body;
                                jsonObj.conditions.timestamp = now.toString();
                                fs.writeFileSync('cache.json', JSON.stringify(jsonObj, null, 4), 'utf-8');                            
                            }

                            if(body) res.json(body);
                            else res.json({error: true});
                        });
                    });
            } else {
                res.json(cachedConditions);
            }
        });
    });
};