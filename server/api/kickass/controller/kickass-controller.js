"use strict";
const request = require('request');

module.exports = class KickAssController {

    static rfError(req, res) {
        res.status(500).end('Unknown error occurred while processing your request.')
    }

    static rfGetReq(req, res) {

    }

    /**
     * The following process for an API GET request will be:
     * Get Magnet link
     * Post to the peerflix server
     * Check 3 times in 3 second intervals if a connection is established
     * Loop through files to find the longest one
     * Return
     */

    static kickAssTest(req, res) {
        let options = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "*/*"
        },
            url: 'http://localhost:9000/torrents',
            body: '{"link": "magnet:?xt=urn:btih:4b642d022980e5ebaa7cf4b6e1cc93769921cb42&dn=The+Wolf+of+Wall+Street+%282013%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969"}'
        };
        // This starts the torrent downloading
        request.post(options, function (err, response, body) {
            let fileOptions = {
              url: 'http://localhost:9000/torrents/' + JSON.parse(body).infoHash
            };
            // Retry this 3 times and then say cannot connect to this link looking for results
            // This retrievies the link for the files
            setTimeout(function(fileOptions) {
                request.get(options,function (err, response, body) {
                    let jsonBody = JSON.parse(body);
                    // This will need to be checked
                    let torrent = jsonBody[0];
                    let maxLength = 0;
                    let maxFile = null;
                    let filesLeft = torrent.files.length;
                    torrent.files.forEach(function(file) {
                        filesLeft -= 1;
                        if (file.length > maxLength) {
                            maxLength = file.length;
                            maxFile = file;
                        }
                        if (filesLeft === 0) {
                            res.status(200).send('http://localhost:9000/' + maxFile.link);
                        }
                    });
                });
            }, 3000);

        });
    }

};
