import os
from dotenv import load_dotenv
import sqlite3
from elasticsearch import Elasticsearch

# Load environment variables from .env file
load_dotenv()

# Connect to SQLite database
conn = sqlite3.connect('backend\db.sqlite3')
cursor = conn.cursor()

# Elasticsearch authentication credentials
username = 'elastic'
password = os.getenv('ELASTIC_PASSWORD')

# SSL certificate path
ssl_ca_path = 'http_ca.crt'

# Elasticsearch connection
es = Elasticsearch(
    ['https://localhost:9200'],
    basic_auth=(username, password),
    verify_certs=True,
    ca_certs=ssl_ca_path
)

# Define mapping with n-gram analyzer for autocomplete

es_mapping = {
        "properties": {
            "designation": {
                "type": "text"
            },
            "designation_suggest": {
                "type": "text",
                "analyzer": "autocomplete",
                "search_analyzer": "standard"
            }
        }
    
}

es_settings = {
        "analysis": {
            "filter": {
                "autocomplete_filter": {
                    "type": "edge_ngram",
                    "min_gram": 1,
                    "max_gram": 20
                }
            },
            "analyzer": {
                "autocomplete": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": ["lowercase", "autocomplete_filter"]
                }
            }
        }
    
}

# Apply mapping to index (recreate index)
index_name = "article_search"  # Replace with your index name

# Delete index if it exists
if es.indices.exists(index=index_name):
    es.indices.delete(index=index_name)

# Create index with the new mapping
es.indices.create(index=index_name, settings=es_settings, mappings=es_mapping)

# Index your documents with the designation_suggest field populated
cursor.execute('SELECT * FROM Comptoire_s_article')

for doc in cursor.fetchall():
    doc_body = {
        "id": doc[0],
        "designation": doc[2],  # Original text field
        "designation_suggest": doc[2]  # Text to be used for autocomplete
    }
    es.index(index=index_name, body=doc_body)
    print(f"Indexed {doc[2]}")

print("Data indexed successfully.")
