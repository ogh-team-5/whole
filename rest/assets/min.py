import json
from alchemyapi import AlchemyAPI

demo_text = "I'm not feeling very happy...my dog died today, and I lost my job. I'm going to shut myself off from reality. I went to Geneva with my iPython"



# Create the AlchemyAPI Object
alchemyapi = AlchemyAPI()

print '\n\nEmotion, analysis'
response = alchemyapi.emotion('text', demo_text)

print '\n\n', json.dumps(response['docEmotions'], indent=4)

print '\n\nEntity analysis'
response = alchemyapi.entities('text', demo_text, {'sentiment': 1})

print '\n\n', json.dumps(response['entities'], indent=4)

print '\n\nKeyword analysis'
response = alchemyapi.keywords('text', demo_text, {'sentiment': 1})

print '\n\n', json.dumps(response['keywords'], indent=4)

print '\n\nSentiment analysis'
response = alchemyapi.sentiment('text', demo_text)

print '\n\n', json.dumps(response['docSentiment'], indent=4)

print '\n\nConcepts analysis'
response = alchemyapi.concepts('text', demo_text)

print '\n\n', json.dumps(response['concepts'], indent=4)

print '\n\nRelation analysis'
response = alchemyapi.relations('text', demo_text)

print '\n\n', json.dumps(response['relations'], indent=4)


from multiprocessing import Pool

def parallel_run(f, *args, **kwargs):
    '''
    performs in-core map reduce of the function `f`
    over the parameter space spanned by parms.
    `f` MUST take only one argument. 
    '''
    pool = Pool(nodes=4)
    ret = pool.map(f, args)
    pool.close(); pool.join()
    return ret







print '\n\nEmotion, analysis'
response = alchemyapi.emotion('text', demo_text)

print '\n\n', json.dumps(response['docEmotions'], indent=4)

print '\n\nEntity analysis'
response = alchemyapi.entities('text', demo_text, {'sentiment': 1})

print '\n\n', json.dumps(response['entities'], indent=4)

print '\n\nKeyword analysis'
response = alchemyapi.keywords('text', demo_text, {'sentiment': 1})

print '\n\n', json.dumps(response['keywords'], indent=4)

print '\n\nSentiment analysis'
response = alchemyapi.sentiment('text', demo_text)

print '\n\n', json.dumps(response['docSentiment'], indent=4)

print '\n\nConcepts analysis'
response = alchemyapi.concepts('text', demo_text)

print '\n\n', json.dumps(response['concepts'], indent=4)

print '\n\nRelation analysis'
response = alchemyapi.relations('text', demo_text)

print '\n\n', json.dumps(response['relations'], indent=4)

