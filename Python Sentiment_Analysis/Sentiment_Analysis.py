
"""
Created on Thu Nov 19 17:20:29 2015

@author: abhinav
"""
import io,os

import re, math, collections, itertools
import nltk, nltk.classify.util, nltk.metrics
from nltk.metrics import BigramAssocMeasures
from nltk.probability import FreqDist, ConditionalFreqDist
import nltk.data 
_POS_TAGGER = 'taggers/maxent_treebank_pos_tagger/english.pickle' 
tagger=nltk.data.load( _POS_TAGGER ) 
from nltk.util import ngrams
from nltk.corpus import stopwords
from pymongo import MongoClient

client = MongoClient()
db = client['yelp']

cursor = db.reviews.find().limit(5000)

def replace_all(text, dic):
    for i, j in dic.iteritems():
        text = text.replace(i, j)
    return text

contractionsDic = {'isn\'t':'is not','aren\'t':'are not','wasn\'t':'was not','weren\'t':'were not','haven\'t':'have not','hasn\'t':'has not','hadn\'t':'had not','won\'t':'will not','wouldn\'t':'would not','don\'t':'do not','doesn\'t':'does not','didn\'t':'did not','can\'t':'can not','couldn\'t':'could not','shouldn\'t':'should not','mightn\'t':'might not','mustn\'t':'must not','would\'ve':'would have','should\'ve':'should have','could\'ve':'could have','might\'ve':'might have','must\'ve':'must have','you\'d':'you would','we\'d':'we would','i\'ve':'I have'}
htmlEntDic = {'&#39;':'\'','&#34;':'"','&amp;':'and','<br>':' '}    

ratings=[]  
reviews=[]
sent_detector = nltk.data.load('tokenizers/punkt/english.pickle')

stop = stopwords.words('english')    

for data in cursor:
    ratings.append(data['stars'])
    reviews.append(data['text'])
    
    

fwriter = io.open( 'positive.txt','w', encoding='utf8' )




for rev1, r1 in zip(reviews,ratings ):
    if r1==5 or r1==4:

         rev1 = replace_all(rev1,htmlEntDic)
         rev1 = replace_all(rev1,contractionsDic)
         fwriter.write(unicode(rev1)+'\n') 
         

fwriter.close()

fwriter= io.open( 'negative.txt','w', encoding='utf8' )

for rev2, r2 in zip(reviews,ratings ):
    if r2==1 or r2==2:
         rev2 = replace_all(rev2,htmlEntDic)
         rev2 = replace_all(rev2,contractionsDic)
         fwriter.write(unicode(rev1)+'\n')  
         
fwriter.close()






posWords = []
negWords = []
with open('positive.txt', 'r') as posSentences:
	for i in posSentences:
		posWord = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
		posWords.append(posWord)
with open('negative.txt', 'r') as negSentences:
	for i in negSentences:
		negWord = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
		negWords.append(negWord)
posWords = list(itertools.chain(*posWords))
negWords = list(itertools.chain(*negWords))
#print negWords
adjectives1=set()
adjectives2=set()
posWords2=[]
negWords2=[]
postagged_tokens=tagger.tag(posWords)
negtagged_tokens=tagger.tag(negWords)
#print postagged_tokens
for pair in postagged_tokens: 

        if pair[1].startswith('JJ'): adjectives1.add(pair[0])
for pair in negtagged_tokens: 

        if pair[1].startswith('JJ'): adjectives2.add(pair[0])


for i in range(len(posWords)-1):
    if posWords[i]=="not" and posWords[i+1] in adjectives1:
            negWords2.append(posWords[i+1])
    elif posWords[i]=="not" and posWords[i+2] in adjectives1:
            negWords2.append(posWords[i+2])

for i in range(len(negWords)-1):
    if negWords[i]=="not" and negWords[i+1] in adjectives2:
            posWords2.append(negWords[i+1])
    elif negWords[i]=="not" and negWords[i+2] in adjectives2:
            posWords2.append(negWords[i+2])


for i in adjectives1:
    if i not in posWords2:
        posWords2.append(i)
for i in adjectives2:
    if i not in negWords2:
        negWords2.append(i)
#print adjectives2
#print negWords            

	#creating frequency distibution of all words and also the frequency distributions of words within positive and negative labels
word_fd = FreqDist()
posword_fd= FreqDist()
negword_fd= FreqDist()
cond_word_fd = ConditionalFreqDist()
for word in posWords2:
	posword_fd[word.lower()] += 1
	cond_word_fd['pos'][word.lower()] += 1
for word in negWords2:
	negword_fd[word.lower()] += 1
	cond_word_fd['neg'][word.lower()] += 1

	#finding the number of positive and negative words, as well as the total number of words
pos_word_count = cond_word_fd['pos'].N()
neg_word_count = cond_word_fd['neg'].N()
total_word_count = pos_word_count + neg_word_count

	#creating dictionary of word scores based on chi-squared test
word_scores = {}
pos_word_score={}
neg_word_score={}
 
for word, freq in negword_fd.iteritems():
    neg_score = BigramAssocMeasures.chi_sq(cond_word_fd['neg'][word], (freq, neg_word_count), total_word_count)
    neg_word_score[word]=neg_score
     
for word, freq in posword_fd.iteritems():
    pos_score = BigramAssocMeasures.chi_sq(cond_word_fd['pos'][word], (freq, pos_word_count), total_word_count)
    pos_word_score[word]=pos_score
    
    
f1=open('positive_keywords.txt','w')
f2=open('negative_keywords.txt','w')    
positive=[]
negative=[]
#print pos_word_score     


for key in pos_word_score:
    if key in neg_word_score:
        if neg_word_score[key]>pos_word_score[key]:
            negative.append(key)
        elif neg_word_score[key]<pos_word_score[key]:
            positive.append(key)
    
for key in pos_word_score:
    if key not in positive:
        positive.append(key)

for key in neg_word_score:
    if key not in negative:
        negative.append(key)


#for (p1,v1), (n1,v2) in zip(pos_word_score.items(), neg_word_score.items()):
 #   if int(p1[v1])>int(n1[v2]):
  #      positive.append(p1)
  #  else:
   #     negative.append(n1)

for i in positive:
    f1.write(i+'\n')
for i in negative:
    f2.write(i+'\n')
#print negative

#print neg_word_score
#for key in pos_word_score:
  #  print key
f1.close()
f2.close()
