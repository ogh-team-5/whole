from __future__ import unicode_literals

import logging
import os
import pickle
import sys

from flask import Flask, jsonify
from flask_restful import Api as API

from assets.resources import Info, Split, Result, Lemon

# Beginning of API methods
application = Flask(__name__)

application.config['SECRET_KEY'] = 'EXAMPLE'

application.logger.addHandler(logging.StreamHandler(sys.stdout))
application.logger.setLevel(logging.ERROR)

api = API(application)

api.add_resource(Info, '/')
api.add_resource(Split, '/<string:uuid>/split')
api.add_resource(Lemon, '/<string:uuid>/lemon')
api.add_resource(Result, '/<string:uuid>/result')

def main():
    application.run(
        host=os.environ.get('HTTP_HOST', '0.0.0.0'),
        port=int(os.environ.get('HTTP_PORT', 5000)),
        debug=int(os.environ.get('DEBUG', 0)),
    )
if __name__ == "__main__":
    main()
