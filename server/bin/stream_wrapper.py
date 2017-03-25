## First iteration will take a local file and set it up as a YouTube Live video

## Second iteration will be nested within a Node file, passed a Torrent stream, and set that up as a YouTube Live video

import httplib2
import os
import sys
import datetime
import json

from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow

## Needs to set up the stream, then set up the broadcast, then bind the two together


## Global vars
STREAM_TITLE = 'test_shiz_nit'
STREAM_URL = 'https://1drv.ms/v/s!AnLNeqMkjLFdgVYR6uP8Np6xOGVG'
ACCESS_TOKEN = 'ya29.GlsZBBnI6MHfvjziriZJ_cq5CkkSFV-KnGH2QHN5W3F8lOTrLTMw4mp9LkXPvhUu5Piv1h5G5XLCdvGhBnn01_PuIA6vV5xUXr2hGK-HTqwCx0h9Aai9TAmyoTp0'

## Parses the options
options = {
  'streamTitle': STREAM_TITLE,
  'streamUrl': STREAM_URL,
  'broadcastTitle': STREAM_TITLE,
  'startTime': str(datetime.datetime.now() + datetime.timedelta(days = 1)).replace(' ', 'T') + 'Z',
  'endTime': str(datetime.datetime.now() + datetime.timedelta(days = 1, hours = 2)).replace(' ', 'T') + 'Z',
  'accessToken': ACCESS_TOKEN  
}

print options['startTime']
print options['endTime']

## Setting up the stream
def insert_stream():
  h = httplib2.Http()
  headers = {'Content-type': 'application/json',
            'Authorization': 'Bearer ' + options['accessToken']}
  body = {
    'snippet': {
      'title': options['streamTitle']
    },
    'cdn': {
      'format': '720p',
      'ingestionType': 'rtmp',
      'ingestionInfo': { 'ingestionAddress': options['streamUrl'] }
    }
  }
  resp, content = h.request("https://www.googleapis.com/youtube/v3/liveStreams?part=snippet,cdn", 
                            method="POST",
                            body=json.dumps(body),
                            headers=headers)
  
  print "Made the POST for the stream: response of " + str(resp.status)
  print "Location of the request: " + options['streamUrl']
  
  
## Setting up the broadcast
def insert_broadcast():
  h = httplib2.Http()
  headers = {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + options['accessToken']}
  body = {
    'snippet':{
      'title': options['broadcastTitle'],
      'scheduledStartTime': options['startTime'],
      'scheduledEndTime': options['endTime']
    },
    'status': {
      'privacyStatus': 'private'
    }
  }
  resp, content = h.request("https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status", 
                            method="POST",
                            body=json.dumps(body),
                            headers=headers)
  
  print "Made the POST for the broadcast: response of " + str(resp.status)
  
  
## Binding the stream and the broadcast
## This will create the final version of the live stream on YouTube
def bind_broadcast(stream_id, broadcast_id):
  h = httplib2.Http()
  headers = {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + options['accessToken']}
  body = {
    'id': broadcast_id,
    'streamId': stream_id
  }
  resp, content = h.request("https://www.googleapis.com/youtube/v3/liveBroadcasts/bind?part=id,contentDetails", 
                            method="POST",
                            body=json.dumps(body),
                            headers=headers)
  
  print "Made the POST for the bind: response of " + str(resp.status)
  print content


## Main function
if __name__ == "__main__":
  
  ## arg parser shit needed for when this is hooked up to node
  
  try:
    broadcast_id = insert_broadcast()
    print broadcast_id
    
    stream_id = insert_stream()
    print stream_id
    
    bind_broadcast(stream_id, broadcast_id)
  except HttpError, e:
    print "An error occurred of status %d, here's the message: \n%s" % (e.resp.status, e.context)
  
  
