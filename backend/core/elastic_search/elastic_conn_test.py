from elasticsearch import Elasticsearch

# Elasticsearch authentication credentials
username = 'elastic'
password = 'X=rlwqh8f7O3_mUdpmBr'

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
