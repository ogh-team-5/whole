#Get the files to be processed.
from PIL import Image                                                            
import glob
import requests

imageFolderPath = '/home/B/Pictures/'
images = glob.glob(imageFolderPath+'/*.JPG') 

for i in images:
	# POST https://api.projectoxford.ai/emotion/v1.0/recognize HTTP/1.1
	# Content-Type: application/json
	# Host: api.projectoxford.ai
	# Content-Length: 43
	# Ocp-Apim-Subscription-Key: ••••••••••••••••••••••••••••••••

	# { "url": "http://example.com/picture.jpg" }
	req = urllib2.Request('http://example.com/api/posts/create')
	req.add_header('Content-Type', 'application/json')
	req.add_header('Host', 'api.projectoxford.ai')
	req.add_header('Content-Length', '43')
	req.add_header('Ocp-Apim-Subscription-Key', '6c854d058d4d4a74be77049409211e1e')

	postdata = images[i]
	response[i] = urllib2.urlopen(req, json.dumps(postdata))