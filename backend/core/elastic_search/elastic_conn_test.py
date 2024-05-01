import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

# Load environment variables from .env file
load_dotenv()

# Elasticsearch authentication credentials
username = 'elastic'
password = os.getenv('ELASTIC_PASSWORD')

# SSL certificate path
ssl_ca_path = 'http_ca.crt'

# Elasticsearch connection
es = Elasticsearch(
    ['https://localhost:9200'],
    http_auth=(username, password),
    verify_certs=True,
    ca_certs=ssl_ca_path
)

# Test connection
if es.ping():
    print("Connected to Elasticsearch")
else:
    print("Connection to Elasticsearch failed")
