from twython import Twython, TwythonError, TwythonRateLimitError
import json
import pandas as pd
import time
from os import listdir

# Load credentials from json file
with open("twitter_credentials.json", "r") as file:  
    creds = json.load(file)

# Instantiate an object
python_tweets = Twython(creds['CONSUMER_KEY'], creds['CONSUMER_SECRET'])

### Create our query
##query = {'q': 'fifa',  
##        'result_type': 'mixed',
##        'count': 2,
##        'lang': 'en',
##        }
##import pandas as pd
##
##
##query_results = python_tweets.search(**query)
##query_results['search_metadata']['next_resuls']
###print (query_results)
### Search tweets
##dict_ = {'id_str':[],'user': [], 'date': [], 'text': [], 'favorite_count': [], 'retweet_count':[]}  
##for status in python_tweets.search(**query)['statuses']:
##    dict_['id_str'].append(status['id_str'])
##    dict_['user'].append(status['user']['screen_name'])
##    dict_['date'].append(status['created_at'])
##    dict_['text'].append(status['text'])
##    dict_['favorite_count'].append(status['favorite_count'])
##    dict_['retweet_count'].append(status['retweet_count'])
##
##    
##
###print(dict_)
### Structure data in a pandas DataFrame for easier manipulation
##df = pd.DataFrame(dict_)
##
##df.sort_values(by='favorite_count', inplace=True, ascending=False)
##df.to_csv('fifa_tweets1.csv', sep='\t', encoding='utf-8')
#print(df)




tweets                          =   []
MAX_ATTEMPTS                    =   5000
COUNT_OF_TWEETS_TO_BE_FETCHED   =   1000
queryFileMap = {'France':'France_tweets_popular.csv'}

for term in queryFileMap.keys():
    print('Term is:', term)
    print('Start Time', time.time())
    dict_ = {'id_str':[],'user': [], 'date': [], 'text': [], 'favorite_count': [], 'retweet_count':[], 'eol':[]}  
    i=0
##    if(term =='France') :
##        next_max_id = 1018517463846268931
##        i=1
    while(1):
        try : 
            print ('trying ith:' ,i)
            #print('next max id:', next_max_id)
            
            if(COUNT_OF_TWEETS_TO_BE_FETCHED < len(tweets)):
                break # we got 500 tweets... !!

            #----------------------------------------------------------------#
            # STEP 1: Query Twitter
            # STEP 2: Save the returned tweets
            # STEP 3: Get the next max_id
            #----------------------------------------------------------------#

            # STEP 1: Query Twitter
            if(0 == i):
                # Query twitter for data. 
                results    = python_tweets.search(q=term,result_type='popular',lang='en',count='2000',since='2018-07-15',until='2018-07-16' )
            else:
                # After the first call we should have max_id from result of previous call. Pass it in query.
                results    = python_tweets.search(q=term,result_type='popular',lang='en',count='2000',include_entities='true',
                                                  since='2018-07-15',until='2018-07-16',max_id=next_max_id)
            count =0;
            # STEP 2: Save the returned tweets
            for status in results['statuses']:
                dict_['id_str'].append(status['id_str'])
                dict_['user'].append(status['user']['screen_name'])
                dict_['date'].append(status['created_at'])
                text = status['text'];
                text = text.replace('\n\r',' ')
                dict_['text'].append(status['text'])
                dict_['favorite_count'].append(status['favorite_count'])
                dict_['retweet_count'].append(status['retweet_count'])
                dict_['eol'].append('&&&&&')
                count =count +1

            print ('count of tweets fetched :', count) 

            # STEP 3: Get the next max_id
            try:
                # Parse the data returned to get max_id to be passed in consequent call.
                next_results_url_params    = results['search_metadata']['next_results']
                next_max_id        = next_results_url_params.split('max_id=')[1].split('&')[0]
            except:
                print('No more next pages')
                #print('last next_max_id :', next_max_id)
                break
            i =i+1
            if (i%100==0):
                print('reached 100')
                df = pd.DataFrame(dict_)
                df.sort_values(by='date', inplace=True, ascending=False)
                df.to_csv(queryFileMap[term],mode='a', sep='\t', encoding='utf-8')
                dict_ = {'id_str':[],'user': [], 'date': [], 'text': [], 'favorite_count': [], 'retweet_count':[], 'eol':[]}
                val = term + ',' +str(next_max_id)
                f=open("maxid", "a+")
                f.write(val)
                f.write("\r\n")
                f.close()
                print('next max is', next_max_id)
                
        except TwythonRateLimitError as error:
            print ('Rate Limit error occurred')
            print('next max is', next_max_id)
            print('Current Time with error', time.time())
            df = pd.DataFrame(dict_)
            df.sort_values(by='date', inplace=True, ascending=False)
            df.to_csv(queryFileMap[term],mode='a', sep='\t', encoding='utf-8')
            dict_ = {'id_str':[],'user': [], 'date': [], 'text': [], 'favorite_count': [], 'retweet_count':[], 'eol':[]}
            val = term + ',' +str(next_max_id)
            f=open("maxid", "a+")
            f.write(val)
            f.write("\r\n")
            f.close()
            #remainder = float(twitter.get_lastfunction_header(header='x-rate-limit-reset')) - time.time()
            time.sleep(60)
            continue
    #print('last next_max_id :', next_max_id)
    df = pd.DataFrame(dict_)
    df.sort_values(by='date', inplace=True, ascending=False)
    df.to_csv(queryFileMap[term],mode='a', sep='\t', encoding='utf-8')
