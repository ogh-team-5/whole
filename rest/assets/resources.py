#!/usr/bin/env python
'''
author: Luke de Oliveira (lukedeo@ldo.io)
'''
import subprocess
import json
from flask_restful import Resource, reqparse
from flask import jsonify, request
import cPickle as pickle
import hashlib
import os

from errno import EEXIST
from os import makedirs

def safe_mkdir(path):
    '''
    Safe mkdir (i.e., don't create if already exists, 
    and no violation of race cond.)
    '''
    try:
        makedirs(path)
    except OSError as exception:
        if exception.errno != EEXIST:
            raise exception

PREFIX = '/'

INGESTED_VIDEO = os.path.join(PREFIX, 'data/ingested/video/{}')

LEMON_PATH = os.path.join(PREFIX, 'data/lemons/{}')

SPLIT_AUDIO_FILE_OUT = os.path.join(PREFIX, 'data/split/audio/{}')
SPLIT_VIDEO_FOLDER_OUT = os.path.join(PREFIX, 'data/split/video/{}')

ANALYZED_VIDEO_FILE_OUT = os.path.join(PREFIX, 'data/analyzed/audio/{}')
ANALYZED_TEXT_FILE_OUT = os.path.join(PREFIX, 'data/analyzed/video/{}')

safe_mkdir(INGESTED_VIDEO)
safe_mkdir(LEMON_PATH)
safe_mkdir(SPLIT_AUDIO_FILE_OUT)
safe_mkdir(SPLIT_VIDEO_FOLDER_OUT)
safe_mkdir(ANALYZED_VIDEO_FILE_OUT)
safe_mkdir(ANALYZED_TEXT_FILE_OUT)

def uid(obj):
    m = hashlib.md5()
    m.update(bytes(obj))
    return m.hexdigest()


class Info(Resource):
    '''
    Simple resource for the /info or / (root) endpoint.
    '''
    def get(self):
        return jsonify(
            data= {
                'info' : 'Sample API'
            },
            success=True,
        )

class Lemon(Resource):

    def post(self, uuid):
        '''
        Accepts POST arguments to the API endpoint.
        '''
        lemons = json.loads(request.get_data())
        with open(LEMON_PATH.format(uuid), 'wb') as f:
            f.write(json.dumps(lemons))

        return jsonify(
                 success=True, 
                 data = {'uuid' : uuid}
               )

class Split(Resource):

    def post(self, uuid):
        '''
        Accepts POST arguments to the API endpoint.
        '''
        video = request.get_data()
        with open(INGESTED_VIDEO.format(uuid), 'wb') as f:
            f.write(video)

        # execute to '/data/split/frames/{}'.format(uuid)
        # execute to '/data/split/text/{}'.format(uuid)

        with open(ANALYZED_VIDEO_FILE_OUT.format(uuid), 'wb') as jf:
            jf.write(json.dumps({'msg': 'Hello World from video!'}, indent=4))

        with open(ANALYZED_TEXT_FILE_OUT.format(uuid), 'wb') as tf:
            tf.write(json.dumps({'msg': 'Hello World from text!'}, indent=4))


        # subprocess.Popen(["rm","-r","some.file"])

        return jsonify(
                 success=True, 
                 data = {'uuid' : uuid}
               )


class Result(Resource):

        def get(self, uuid):
            frames = os.path.isfile(ANALYZED_VIDEO_FILE_OUT.format(uuid))
            text = os.path.isfile(ANALYZED_TEXT_FILE_OUT.format(uuid))
            if not frames and text:
                return jsonify(
                    success=False, 
                    data = {'uuid' : uuid}
                )
                
            payload = {'uuid' : uuid}

            with open(ANALYZED_VIDEO_FILE_OUT.format(uuid), 'r') as f:
                payload.update({'video': json.loads(f.read())})

            with open(ANALYZED_TEXT_FILE_OUT.format(uuid), 'r') as f:
                payload.update({'text': json.loads(f.read())})

            try:
                with open(LEMON_PATH.format(uuid), 'r') as f:
                    payload.update({'lemons': json.loads(f.read())})
            except IOError:
                pass

            return jsonify(
                    success=True, 
                    data = payload
                )



