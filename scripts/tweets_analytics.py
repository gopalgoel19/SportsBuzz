from pathlib import Path
import re
import csv
from os import listdir
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import pickle
from collections import Counter
import nltk
from nltk.corpus import stopwords

import numpy as np

from scipy.signal import argrelextrema
from sklearn.feature_extraction.text import TfidfVectorizer
import json


tweetsTimeDictionary ={}
tweetsTimeDictionaryWithTweets ={}

tweetsTimeDictionaryWithTweetsData ={}

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

def get_time(sec):
    d = datetime(1,1,1) + timedelta(sec)

    #print("DAYS:HOURS:MIN:SEC")
    print("%d:%d:%d:%d" % (d.day-1, d.hour, d.minute, d.second))

def populate_Dictionary(includeText = 'false') :
    
    dirPath = 'C:/hackathon/python/tweets_data'
    filenames = find_csv_filenames(dirPath)
    for file in filenames :
        filename = dirPath + '/' +file
        with open(filename, 'r',  encoding="utf-8") as content_file:
            content = content_file.read()
        for tweet in content.split('&&&&') :
            tweetdata = re.split(r'\t+', tweet)
            try:
                tweetId = tweetdata[1]
                tweetDate = tweetdata[3]
                tweetText = tweetdata[4]
                tweetText = tweetText.replace('\r\n',' ')
                tweetFav = int(tweetdata[5])
                tweetRetweet = int(tweetdata[6])
                tweetTime = tweetDate.split(' ')[3]
                tweetsecTime = get_sec(tweetTime)
                if (tweetTime > '14:59:59' and tweetTime < '17:00:01') :
                    if tweetsecTime in tweetsTimeDictionary:
                        tweetsTimeDictionary[tweetsecTime] += 1
                        if(includeText == 'true') :
                            if (tweetText[0:2]!='RT' and tweetText[1:3]!='RT' ):
                                tweetsTimeDictionaryWithTweets[tweetsecTime].append(tweetText)
                                tweetsTimeDictionaryWithTweetsData[tweetsecTime].append([(tweetFav+tweetRetweet), tweetId,tweetTime,tweetText])
                    else:
                        tweetsTimeDictionary[tweetsecTime] = 1
                        if(includeText == 'true') :
                            if (tweetText[0:2]!='RT' and tweetText[1:3]!='RT' ):
                                tweetTextList = []
                            
                                tweetTextList.append(tweetText)
                                tweetsTimeDictionaryWithTweets[tweetsecTime] = tweetTextList
                            
                                tweetDataList =[]
                                tweetDataList.append([(tweetFav+tweetRetweet), tweetId,tweetTime,tweetText])
                                tweetsTimeDictionaryWithTweetsData[tweetsecTime] =tweetDataList
                    
                        
                    #print(tweetTime)
                #print(tweetdata[3])
            except:
                continue
def populate_Dictionary_with_tweets():
    populate_Dictionary('true')
    
    
def find_csv_filenames( path_to_dir, suffix=".csv" ):
    filenames = listdir(path_to_dir)
    return [ filename for filename in filenames if filename.endswith( suffix ) ]

def getTweetsCountInTimeInterval(initial, start, end, interval) :
    initialStart = get_sec(initial)
    startSec = get_sec(start)
    finalSec = get_sec(end)
    xdata =[]
    ydata =[]
    graphPlot = []
    while (startSec < finalSec) :
        endSec = min(finalSec,startSec +interval)
        finalCount = 0
        
        for sec in range(startSec, endSec+1):
            if (sec in tweetsTimeDictionary) :
                finalCount += tweetsTimeDictionary[sec]
        #print((startSec-initialStart), '-', (endSec-initialStart), finalCount)
        plot ={}
        plot['x']= endSec-initialStart
        plot['y']= finalCount
        graphPlot.append(plot)

        #xdata.append((startSec-initialStart)/60)
        #ydata.append(finalCount)
        startSec = startSec + interval
    #print(argrelextrema(np.array(ydata,dtype=np.float), np.greater))
    #c = (diff(sign(diff(ydata))) < 0).nonzero()[0] + 1 # local max
    #print(c)
    #print(argrelextrema(ydata, np.less))
    #plt.plot(xdata,ydata)
    #plt.show()
    return graphPlot
        
def getTweetsCountInTime(start, end) :
   
    startSec = get_sec(start)
    endSec = get_sec(end)
    finalCount = 0
        
    for sec in range(startSec, endSec+1):
        if (sec in tweetsTimeDictionary) :
            finalCount += tweetsTimeDictionary[sec]
    return finalCount

def getTweetsCountInTimeSec(startSec, endSec) :
   
    
    finalCount = 0
        
    for sec in range(startSec, endSec+1):
        if (sec in tweetsTimeDictionary) :
            finalCount += tweetsTimeDictionary[sec]
    return finalCount
def print_to_csv(startTime, endTime) :
    startSec = get_sec(startTime)
    finalSec = get_sec(endTime)
    csvData =[]
    xdata =[]
    ydata =[]
    for sec in range(startSec, finalSec) :
        normalizedSec = sec-startSec
        tweetValue =0
        if (sec in tweetsTimeDictionary) :
            tweetValue = tweetsTimeDictionary[sec]
        row = [normalizedSec, tweetValue]
        xdata.append(normalizedSec)
        ydata.append(tweetValue)
        csvData.append(row)
    
##    myFile = open('plot.csv', 'w')  
##    with myFile:  
##       writer = csv.writer(myFile)
##       writer.writerows(csvData)
    #plt.plot(xdata,ydata)
    #plt.show()
       

def get_tweet_text_in_interval(startTime, endTime) :
    
    startSec = get_sec(startTime)
    endSec = get_sec(endTime)
    finalList = []
    for sec in range(startSec,endSec) :
        if (sec in tweetsTimeDictionaryWithTweets) :
            finalList = finalList + tweetsTimeDictionaryWithTweets[sec]
    return finalList

def get_tweet_text_in_sec_interval(startSec, endSec) :
    populate_Dictionary_with_tweets()
    finalList = []
    for sec in range(startSec,endSec) :
        if (sec in tweetsTimeDictionaryWithTweets) :
            finalList = finalList + tweetsTimeDictionaryWithTweets[sec]
    word_list = []
    #with open('tweets.txt', 'wb') as fp:
    #    pickle.dump(finalList, fp)

    stop_words = stopwords.words('english')
    stop_words.extend(['russia','france', 'croatia', 'fifa', 'world', 'cup', 'football','final'])

    for d in finalList:
        d = d.replace(',', ' ')
        d = d.replace('\"', '')
        d = d.replace('!', '')
        d = d.replace('.',' ')
        s = d.lower().split()
        word_list += s
    word_list = [word for word in word_list if not word.startswith('#') and not word.startswith('croatia') and not word.startswith('france') and len(word)>3  ]

    #print(word_list)
    final_list = [word for word in word_list if word.lower() not in stop_words]
    final_noun_list =[]
    for word,pos in nltk.pos_tag(final_list):
         if (pos == 'NN' or pos == 'NNP' or pos == 'NNS' or pos == 'NNPS'):
             final_noun_list.append(word)
    counter1 = Counter(final_noun_list)
    most_occur = counter1.most_common(100)

#    vec = TfidfVectorizer(tokenizer=tokenize, stop_words='english')
#    X = vec.fit_transform(finalList)
#    response = vec.transform(finalList)

##    feature_array = np.array(vec.get_feature_names())
##    tfidf_sorting = np.argsort(response.toarray()).flatten()[::-1]
##
##    n = 10
##    top_n = feature_array[tfidf_sorting][:n]
##    print(top_n)
    #feature_names = vec.get_feature_names()
    #for col in response.nonzero()[1]:
     #   print (feature_names[col], ' - ', response[0, col])
    print(most_occur)
    return most_occur

def getKey(item):
    return item[0]
def get_top_k_popular_tweets_per_minute(startTime, endTime, interval, k=5):
    populate_Dictionary_with_tweets()
    startSec = get_sec(startTime)
    finalSec = get_sec(endTime)
    
    while (startSec < finalSec) :
        intervalTweetData =[]
        endSec = min(finalSec,startSec +interval)
        finalCount = 0
        
        for sec in range(startSec, endSec) :
            if (sec in tweetsTimeDictionaryWithTweetsData) :
                intervalTweetData =intervalTweetData+ tweetsTimeDictionaryWithTweetsData[sec]
        intervalTweetData.sort(key=getKey, reverse=True)
        print(intervalTweetData[0:k])
        startSec = startSec + interval

        
def event_peaks(startTime, endTime) :
    initialSec = get_sec(startTime)
    startSec = get_sec(startTime)
    finalSec = get_sec(endTime)

    #configurations
    probingInterval =10 #sec
    perThresholdRise =20 #percent
    absoluteThresholdRise = 50
    minPositiveChanges = 3
    minNegativeChanges = 3
    
    peaksTimeIntervals =[] # will be a model having low time, high time and tweet count at max time interval of 10 sec.
    #lowestPoint = startSec
    #currentPoint = startSec
    #initializations
    previousTweetCount = getTweetsCountInTimeSec(startSec,min(startSec+probingInterval,finalSec))
    startSec = startSec + probingInterval
    currentProbingPeak = -1
    startTimeProbingPeak = -1
    probingPeakTweetsCount =0
    currPositiveSteps =0
    currNegativeSteps =0
    currentState = 'neutral'
    
    while(startSec < finalSec) :
        
        currentTweetCount = getTweetsCountInTimeSec(startSec,min(startSec+probingInterval,finalSec))
        print(startSec, ':',currentTweetCount, '-', previousTweetCount)
        if (currentTweetCount > previousTweetCount):
            if(currPositiveSteps==0) :
                if ((currentTweetCount-previousTweetCount)>absoluteThresholdRise
                                                  or (currentTweetCount-previousTweetCount)/previousTweetCount >perThresholdRise):
                    #print('case1')
                    currPositiveSteps +=1
                    currentProbingPeak = startSec
                    startTimeProbingPeak = currentProbingPeak - probingInterval
                    probingPeakTweetsCount = currentTweetCount
                else :
                    #print('case2')
                    startSec = startSec + probingInterval
                    continue
            elif(currentState == 'negative') :
                    if (currPositiveSteps > minPositiveChanges) :
                        if (currentTweetCount > probingPeakTweetsCount) :
                            #print('case3')
                            currPositiveSteps +=1
                            currentProbingPeak = startSec
                            probingPeakTweetsCount = currentTweetCount
                            currentNegative=0
            else :
                #print('case4')
                currPositiveSteps +=1
                currentProbingPeak = startSec
                probingPeakTweetsCount = currentTweetCount
            currentState = 'positive'
        else :
            if (currPositiveSteps<minPositiveChanges and currentProbingPeak!=-1):
                #print('case5')
                currentProbingPeak = -1
                startTimeProbingPeak =-1
                currPositiveSteps=0
            elif (currPositiveSteps>=minPositiveChanges) :
                currNegativeSteps +=1
                #print('case6')
                if (currNegativeSteps >= minNegativeChanges):
                    #print('case7')
                    entry = [(startTimeProbingPeak-initialSec),(startSec+probingInterval-initialSec),probingPeakTweetsCount]
                    if (len(peaksTimeIntervals)>0) :
                        lastEntry = peaksTimeIntervals[len(peaksTimeIntervals)-1]
                        if (entry[0]-lastEntry[1]<30) :
                            peaksTimeIntervals[len(peaksTimeIntervals)-1] = [lastEntry[0],entry[1],max(lastEntry[2],entry[2])]
                        else :
                            peaksTimeIntervals.append(entry)
                    else :
                        peaksTimeIntervals.append(entry)
                    
                    currPositiveSteps=0
                    currNegativeSteps=0
                    currentProbingPeak = -1
                    startTimeProbingPeak = -1
                
            currentState = 'negative'                                     
                                               
        previousTweetCount = currentTweetCount
        startSec = startSec + probingInterval

    #for item in peaksTimeIntervals :
    #    item[:] = [x / 60 for x in item]
    print(peaksTimeIntervals)
    peakFile = open('peaks.csv', 'w')  
    with peakFile:
        writer = csv.writer(peakFile)
        writer.writerows(peaksTimeIntervals)

def get_dictionary_tuple(keywordList):
    dictionaryList = []
    for keyword in keywordList :
        dictionary1 = {}
        dictionary1['word'] = keyword[0]
        dictionary1['count'] = keyword[1]
        dictionaryList.append(dictionary1)
    return dictionaryList
        
        
def create_top_keywords_json():
    #read the peak csv
    #ignore the time 49 to 64.
    csv_path = "C:/hackathon/python/plot/peaks.csv"
    listValues = []
    with open(csv_path, "r") as f_obj:
        reader = csv.reader(f_obj, delimiter=',')
        for row in reader:
            if row:
                print(row)
                dictionary = {}
                startTime = int(row[0])
                endTime = int(row[1])
                keywordsList = get_tweet_text_in_sec_interval((15*3600) + startTime,(15*3600)+ endTime)
                keywordDictionaryList = get_dictionary_tuple(keywordsList)
                dictionary['startTime'] = startTime/60
                dictionary['endTime'] = endTime/60
                dictionary['keywords'] = keywordDictionaryList
                listValues.append(dictionary)
    

    with open("twit_peak_keywords.json", 'w') as outfile:
        json.dump(listValues, outfile)

    
    
populate_Dictionary()
#print_to_csv('15:00:00', '17:00:01')
#populate_Dictionary_with_tweets()
#create_top_keywords_json()


#list1 = get_tweet_text_in_sec_interval((15*3600) + 4330,(15*3600)+ 4430)




#event_peaks('15:00:00','17:00:01')
list1 = getTweetsCountInTimeInterval('15:00:00','15:00:00', '15:49:00', 10)
list2 = getTweetsCountInTimeInterval('15:15:00','16:04:00', '16:55:01', 10)
finalList = list1+list2
with open("graphplot.json", 'w') as outfile:
        json.dump(finalList, outfile)
#get_top_k_popular_tweets_per_minute('15:00:00', '15:05:01', 60)



#print(tweetsTimeDictionary)
    

