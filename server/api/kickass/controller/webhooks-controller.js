'use strict';
let request = require('request');
let Slack = require('slack-node');
let slack = new Slack();
let URL = 'https://eternal-legere.chisigma.co/';

// Figures out if Slack is asking for list/start/stop
export function slashCmd(req, res) {
    try {
        let varArgs = req.body.text.split(" ");
        if (varArgs[0].toUpperCase() === 'LIST') {
            return listTorrents(varArgs, res);
        } else if (varArgs[0].toUpperCase() === 'START') {
            return startTorrent(varArgs, res);
        } else if (varArgs[0].toUpperCase() === 'STOP') {
            return stopTorrent(varArgs, res);
        } else {
            return res.status(200).send('Sorry, I do not know what you meant by the command that you sent me.');
        }
    } catch (err) {
        return res.status(500).send('Sorry, an error occurred while processing your Slack request. Please contact JNorth.')
    }
}

// Returns a list of available
function listTorrents(args, res) {
    return res.status(200).send('Sorry, I don\'t do this yet :(')
}

// Starts a torrent using a magnet link
function startTorrent(args, res) {
    request.get(URL + 'api/kickass/start/' + args[1], function (err, response, body) {
        if (err) {
            return res.status(500).send('Uhhh oh... something went wrong. You may need to try a different link.')
        }
        let response = {
            text: 'Here is your YouTube Link: ' + body
        };
        return res.status(200).json(response);
    })
}

// Stops a torrent if it exists
function stopTorrent(args, res) {
    request.get(URL + 'api/kickass/stop' + args[1], function (err, response, body) {
        if (err) {
            return res.status(500).send('Either the ID you used does not exist, or my code is broken somewhere...')
        }
        let response = {
            text: 'The torrent you have requested to be stopped has been killed. The YouTube stream should end automatically.'
        };
        return res.status(200).json(response);
    })
}