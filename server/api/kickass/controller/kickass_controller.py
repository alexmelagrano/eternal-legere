import requests
import time
from classes.FFMPEG import FFMPEG


# Function for a pre-defined test to start torrent to youtube
def kickass_test():
    # Options to send to the peerflix-server
    options = {
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "*/*"
        },
        "url": 'http://localhost:9000/torrents',
        "body": '{"link": "magnet:?xt=urn:btih:4b642d022980e5ebaa7cf4b6e1cc93769921cb42&dn=The+Wolf+of+Wall+Street+%282013%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969"}'
    }
    # Send request to peerflix-server
    torrent_hash = start_torrent(options)

    # Wait for 10 seconds to allow torrent to process
    time.sleep(10)

    # Get the torrent streaming link
    torrent_link = get_max_file(torrent_files('http://localhost:9000', torrent_hash))['link']

    success = FFMPEG().start_stream('http://localhost:9000', torrent_link)
    if success:
        return 'https://gaming.youtube.com/channel/UClunXnj9ruW8ZBGUQlXSHaA'
    else:
        return 'Failed to start the FFMPEG live stream.... :{'


def start_torrent(options):
    """
    Starts a torrent on the peerflix-server
    :param options: contains url for server, body with magnet link, and headers
    :return: a hash for the torrent process
    """
    response = requests.post(options['url'], headers=options['headers'], data=options['body'])
    return response.json()['infoHash']


def torrent_files(server_url, torrent_hash):
    """
    Gets list of files that makes up the torrent
    :param server_url: url for peerflix-server
    :param torrent_hash: hash for the torrent job
    :return: array of file objects
    """
    response = requests.get(server_url + '/torrents/' + torrent_hash)
    torrent = response.json()
    return torrent['files']


def get_max_file(files):
    """
    Finds the largest file in an array of files
    :param files: an array of peerflix-files
    :return: largest file
    """
    max_length = 0
    max_file = None
    for f in files:
        if f['length'] > max_length:
            max_length = f['length']
            max_file = f
    return max_file
