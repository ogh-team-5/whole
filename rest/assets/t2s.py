import json
from alchemyapi import AlchemyAPI

from audio import record_to_file
from tempfile import NamedTemporaryFile
import tempfile
import pickle
import os
import subprocess

WATSON_CRED = '4ef9fcf6-0766-4431-8d09-cac555f9cf0d:SIScuL90QEbS'
FNULL = open(os.devnull, 'w')

alchemyapi = AlchemyAPI('295fe00a32d087718a1fae4b419ab3bbed1b7e85')

_async_args = [['emotion', 'docEmotions'],
['entities', 'entities'],
['keywords', 'keywords'],
['sentiment', 'docSentiment'],
['concepts', 'concepts'],
['relations', 'relations']]

from multiprocessing import Pool

def parallel_run(f, *args, **kwargs):
    '''
    performs in-core map reduce of the function `f`
    over the parameter space spanned by parms.
    `f` MUST take only one argument. 
    '''
    pool = Pool()
    ret = pool.map(f, args)
    pool.close(); pool.join()
    return ret

def extract(text):
	return [getattr(alchemyapi, 'emotion')('text', text, {'sentiment': 1}).get('docEmotions'),
			getattr(alchemyapi, 'entities')('text', text, {'sentiment': 1}).get('entities'),
			getattr(alchemyapi, 'keywords')('text', text, {'sentiment': 1}).get('keywords'),
			getattr(alchemyapi, 'sentiment')('text', text, {'sentiment': 1}).get('docSentiment'),
			getattr(alchemyapi, 'concepts')('text', text, {'sentiment': 1}).get('concepts'),
			getattr(alchemyapi, 'relations')('text', text, {'sentiment': 1}).get('relations')]

def _extract(args):
	return getattr(alchemyapi, args[1])('text', args[0], {'sentiment': 1}).get(args[2])

def extract(text):
	return map(_extract, [([text] + ar) for ar in _async_args])

def speech_to_text():
	f = NamedTemporaryFile(delete=False)
	f = open('audio.txt', 'wb')
	path = record_to_file()
	f.write(path)
	f.close()
	# p = tempfile.mkdtemp()
	# cmd = 'python sttClient.py -credentials {} -in {} -out {} -threads 7'.format(WATSON_CRED, f.name, p)
	cmd = 'python sttClient.py -credentials {} -in {} -out ./output2'.format(WATSON_CRED, 'audio.txt')
	# cmd = 'python sttClient.py -credentials {} -in {} -out ./output -threads 2'.format(WATSON_CRED, f.name)
	print cmd
	# os.system(cmd)
	subprocess.call(cmd.split())#, stdout=FNULL)
	

	d = pickle.load(open('./output2/0.json.pkl', 'r'))
	return [y['alternatives'][0]['transcript'] for y in (x['results'][0] for x in d) if y['final']]

def text_from_file(fs):
	if hasattr(fs, 'read'):
		with open('./tmpfp', 'wb') as f:
			f.write(fs.read())
		with open('./audio.txt', 'wb') as f:
			f.write('./tmpfp')
	else:
		with open('./audio.txt', 'wb') as f:
			f.write('./tmpfp')
	with open('./audio.txt', 'wb') as f:
		f.write(fs)
	cmd = 'python sttClient.py -credentials {} -in {} -out ./output2'.format(WATSON_CRED, 'audio.txt')
	print cmd
	# os.system(cmd)
	subprocess.call(cmd.split())#, stdout=FNULL)
	

	d = pickle.load(open('./output2/0.json.pkl', 'r'))
	return [y['alternatives'][0]['transcript'] for y in (x['results'][0] for x in d) if y['final']]

print json.dumps(extract(speech_to_text()), indent=4)

# subprocess.call('python sttClient.py -credentials 4ef9fcf6-0766-4431-8d09-cac555f9cf0d:SIScuL90QEbS -in audio.txt -out ./output2'.split())