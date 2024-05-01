from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from elasticsearch_dsl.query import MatchPhrase , Match, MatchAll

# Elasticsearch settings
ELASTICSEARCH_ENDPOINT = 'https://localhost:9200'
ELASTICSEARCH_INDEX = 'article_search'  # Replace with your index name
ELASTICSEARCH_FIELD = 'designation_suggest'  # Replace with the field you're using for autocomplete
USERNAME = 'elastic'  # Replace with your Elasticsearch username
PASSWORD = 'X=rlwqh8f7O3_mUdpmBr'  # Replace with your Elasticsearch password
SSL_CA_PATH = 'http_ca.crt'  # Path to your CA certificate

# Initialize Elasticsearch connection
es = Elasticsearch(
    [ELASTICSEARCH_ENDPOINT],
    http_auth=(USERNAME, PASSWORD),
    verify_certs=True,
    ca_certs=SSL_CA_PATH
)

class AutocompleteViewSet(ViewSet):
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        query = request.GET.get('query', '')

        # Create Elasticsearch DSL search object
        s = Search(using=es, index=ELASTICSEARCH_INDEX)

        # Add prefix query for autocomplete
        s = s.query(Match(**{ELASTICSEARCH_FIELD: query},params={'type': 'phrase_prefix'}))

        # Execute search and retrieve suggestions
        response = s.execute()
        suggestions = [{'id' : hit['id'] , 'suggestion' : hit[ELASTICSEARCH_FIELD]} for hit in response]

        return Response({'suggestions': suggestions})

    @action(detail=False, methods=['post', 'put', 'delete'])
    def invalid_method(self, request):
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
