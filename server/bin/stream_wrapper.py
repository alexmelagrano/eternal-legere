## First iteration will take a local file and set it up as a YouTube Live video

## Second iteration will be nested within a Node file, passed a Torrent stream, and set that up as a YouTube Live video

import httplib2
import os
import sys

from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow


