#!/usr/bin/env python


from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx

# app
app = Flask(__name__)


def preprocessing(text):
    sentences = []
    sentences.append(sent_tokenize(text))
    sentences = [y for x in sentences for y in x] # flatten list
    # remove punctuations, numbers and special characters
    clean_sentences = pd.Series(sentences).str.replace("[^a-zA-Z]", " ")
    # make alphabets lowercase
    clean_sentences = [s.lower() for s in clean_sentences]
    stop_words = stopwords.words('english')
    def remove_stopwords(sen):
        sen_new = " ".join([i for i in sen if i not in stop_words])
        return sen_new
    clean_sentences = [remove_stopwords(r.split()) for r in clean_sentences]
    return sentences, clean_sentences

def load_Glove():
    word_embeddings_dict = {}
    f = open(r'glove.6B.100d.txt', encoding='utf-8')
    for line in f:
        values = line.split()
        word = values[0]
        coefs = np.asarray(values[1:], dtype='float32')
        word_embeddings_dict[word] = coefs
    f.close()
    return word_embeddings_dict

def word_embedding(clean_sentences):
    sentence_vectors = []
    for i in clean_sentences:
      if len(i) != 0:
        v = sum([embeddings_dict.get(w, np.zeros((100,))) for w in i.split()])/(len(i.split())+0.001)
      else:
        v = np.zeros((100,))
      sentence_vectors.append(v)
    return sentence_vectors


def similarity_matrix(len_clean_sentences,sentence_vectors):
    sim_mat = np.zeros([len_clean_sentences, len_clean_sentences])
    for i in range(len_clean_sentences):
      for j in range(len_clean_sentences):
        if i != j:
          sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,100), sentence_vectors[j].reshape(1,100))[0,0]
    return sim_mat


def predict_summary(sim_mat,sentences):
    nx_graph = nx.from_numpy_array(sim_mat)
    scores = nx.pagerank(nx_graph)
    ranked_sentences = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
    # Extract top 5 sentences as the summary
    #idx = min(5,len(ranked_sentences))
    #print(ranked_sentences[:5][1])
    #return " ".join(ranked_sentences[:5][1]) if (len(ranked_sentences)>=5) else ""
    #return ranked_sentences[:5][1]
    final_sentence=[]
    for i in range(5):
      final_sentence.append(ranked_sentences[i][1])
    return final_sentence
      



# routes
@app.route('/', methods=['POST','GET'])
def predict():
  #text_data = request.get_json(force=True)["data"]
  #text_data = request.args.get('data')
  with open('MLtextsample.txt', 'r', newline='', encoding='ISO-8859-1') as csvfile:
        text_data =csvfile.read()
  sentences, clean_sentences=preprocessing(text_data)
  sentence_vectors=word_embedding(clean_sentences)
  sim_mat=similarity_matrix(len(sentences), sentence_vectors)
  d=predict_summary(sim_mat,sentences)
  print(d)
  return jsonify(results = predict_summary(sim_mat,sentences))


if __name__ == '__main__':  
  nltk.download('punkt')
  nltk.download('stopwords')
  embeddings_dict = load_Glove()
  app.run(port = 5000, debug=True)

