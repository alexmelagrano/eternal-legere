from flask import Blueprint, jsonify, request
from ..controller import kickass_controller as kc
from server.auth import auth_service

kickass_api = Blueprint('kickass_api', __name__)


# Test route that has pre-filled parameters
#@kickass_api.route('/api/kickass/test', methods=['GET'])
def kickass_test():
    return jsonify(kc.kickass_test())

# Starts a torrent stream to Youtube from magnet link
#@kickass_api.route('/api/start', methods=['POST'])
def start_torrent_stream():
    return jsonify(kc.start_torrent_stream())

# Kills any torrent stream that is running
#@kickass_api.route('/api/stop', methods=['DELETE'])
def stop_torrent_stream():
    return jsonify(kc.stop_torrent_stream())

# Delegates slack hook
@kickass_api.route('/api/slack_hook', methods=['POST'])
@requires_slack_auth
def slack_hook():
    cmds = request.get_json().get('text', '').split(' ')
    if len(cmds) > 0 and cmds[0] == 'stop':
        return jsonify(kc.stop_torrent_stream())
    elif len(cmds) > 1 and cmds[0] == 'start':
        return jsonify(kc.start_torrent_stream(cmds[1]))
    else:
        return jsonify(kc.error())

"""
TODO:
- Start Stream with Magnet URL
- Stop Stream
- Pause/Play Stream
- Get Stream URL
"""
