from flask import Blueprint, jsonify
from ..controller import kickass_controller as kc
from server.auth import auth_service

kickass_api = Blueprint('kickass_api', __name__)


# Test route that has pre-filled parameters
@kickass_api.route('/api/kickass/test', methods=['GET'])
def kickass_test():
    return jsonify(kc.kickass_test())

"""
TODO:
- Start Stream with Magnet URL
- Stop Stream
- Pause/Play Stream
- Get Stream URL
"""
