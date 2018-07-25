from nltk.stem import PorterStemmer
from nltk.tokenize import sent_tokenize, word_tokenize
import csv
from nltk.corpus import stopwords
import json
from pprint import pprint
import math

ps = PorterStemmer()


timeToTextMap = {}

def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False
    
def _read_csv():
    csv_path = "C:/hackathon/python/plot/result.csv"
    commentary_words = []

    with open(csv_path, "r") as f_obj:
        reader = csv.reader(f_obj, delimiter=',')
        for row in reader:
            #print(row[0])
            if (RepresentsInt(row[0])):
                #print("entered words")
                words = []
                for r in row[1:]:
                    r = r.replace(',', '')
                    r = r.replace('.', '')
                    words+= r.split()
                    
                if (row[0] in timeToTextMap):
                    timeToTextMap[int(row[0])]+= words
                else :
                    timeToTextMap[int(row[0])]=words;
    print(timeToTextMap.keys())
    print(timeToTextMap[18])
                    



def get_matching_time(tweet_word, start_time, end_time):
    tweet_word_stem = ps.stem(tweet_word.lower())

    normalizedStartTime = int(start_time) - 2
    normalizedEndTime = int(math.ceil((start_time + end_time)/2))
    
    if (start_time >45) :
            normalizedStartTime = normalizedStartTime -19
            normalizedEndTime = normalizedEndTime -19
    if (normalizedStartTime == normalizedEndTime) :
            normalizedEndTime +=1
        
    #print(normalizedStartTime, '-', normalizedEndTime)        
	#csv_path = "result.csv"
    timeList = []

##	with open(csv_path, "r") as f_obj:
##	    reader = csv.reader(f_obj, delimiter=',')
##	    for row in reader:
##	    	# print(row[0])
##	    	if (RepresentsInt(row[0])):
##	    		for r in row[1:]:
##	    			commentary_words += r.split()

    for time in range(normalizedStartTime, normalizedEndTime+1):
        
        if (time in timeToTextMap):
            final_commentary_words = [ps.stem(word.lower()) for word in timeToTextMap[time] if word.lower() not in stopwords.words('english')]
            if(tweet_word_stem in final_commentary_words):
                timeList.append(time)
	#temp_commentary_words = [ps.stem(word.lower()) for word in commentary_words if word.lower() not in stopwords.words('english')]

	#final_commentary_words = []

##	for word in temp_commentary_words:
##		# print(word)
##		word = word.replace(',', '')
##		word = word.replace('.', '')
##		# print(word)
##		final_commentary_words.append(word)
	# print(final_commentary_words)

	#if(tweet_word_stem in final_commentary_words):
	#	return True
	#else:
	#	return False
    return timeList





_read_csv()
print("hello")
with open('C:/hackathon/python/plot/twit_peak_keywords.json') as f:
    data = json.load(f)
#print(data)
keywordDict = {}
for entry in data :
    #print(entry)
    list_ = entry['keywords']
    
    for l in list_:
        curWord = l['word']
        #print(curWord)
        timeList = get_matching_time(curWord, entry['startTime'], entry['endTime'])
        if len(timeList)>0:
            keyDict ={}
            keyDict['startTime'] = timeList[0]-0.5
            keyDict['endTime'] = timeList[len(timeList)-1]+0.5
            if curWord in keywordDict:
                keywordDict[curWord].append(keyDict)
            else :
                list1 = []
                list1.append(keyDict)
                keywordDict[curWord] = list1

#print(keywordDict)
with open("C:/hackathon/python/plot/final_keywords.json", 'w') as outfile:
        json.dump(keywordDict, outfile)


# pprint(data)

