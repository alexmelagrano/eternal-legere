# The Eternal Legere

## T-Mobile's "Binge On" + [peerflix-server](https://github.com/asapach/peerflix-server) = ???

With T-Mobile's "Binge On" promotion allowing for unlimited streaming data for YouTube, we thought it could be cool to have a little app to help make this more interesting.  Enter the Eternal Legere.

By using a bit of Python, a flask webserver, and [asapach](https://github.com/asapach)'s torrent resolver, this app lets you find torrents, resolve them on an EC2 instance, and use that as a source for a YouTube livestream.  The end result is a simple YouTube link to the movie or show of your choice, and you can watch it on T-Mobile's 4G network - free of charge.

## Install

0. Add webhook to a Slack channel or update routes/auth
1. Install nodejs and npm
2. Install ffmpeg
3. Install [peerflix-server](https://github.com/asapach/peerflix-server)
4. Copy files from eternal-legere repo
5. Fill in variables in server.config.private
6. Start peerflix-server
7. Start eternal-legere
8. Test a stream and tweak [ffmpeg settings](https://github.com/alexmelagrano/eternal-legere/blob/dc89475233b091fc2f6e3848fdefd09fbac56343/server/api/kickass/controller/classes/FFMPEG.py#L25)

Developed by Alex Melagrano and Jonathan Northcott at Hack Beanpot 2017
