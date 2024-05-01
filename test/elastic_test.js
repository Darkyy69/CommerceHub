const elasticsearchEndpoint = 'https://localhost:9200'; // Replace with your Elasticsearch endpoint
const basicAuthUsername = 'elastic'; // Replace with your Elasticsearch username
const basicAuthPassword = 'X=rlwqh8f7O3_mUdpmBr'; // Replace with your Elasticsearch password
const indexName = 'article_search'; // Replace with your Elasticsearch index name
const suggestField = 'designation_suggest'; // Replace with the field you're using for autocomplete

const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', _.debounce(async () => {
    const userInput = searchInput.value.trim();

    if (userInput === '') {
        suggestionsList.innerHTML = '';
        return;
    }

    try {
        const response = await searchAutocomplete(userInput);
        const suggestions = response.suggestions;
        renderSuggestions(suggestions);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}, 300)); // Debounce input to reduce API requests

async function searchAutocomplete(query) {
    const url = `http://127.0.0.1:8000/api/comptoire/search/autocomplete/autocomplete/?query=${query}`;

    const response = await axios.get(url)
    console.log(response.data)
    return response.data;
}

function renderSuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion.id + ' : ' + suggestion.suggestion;
        suggestionsList.appendChild(listItem);
    });
}
