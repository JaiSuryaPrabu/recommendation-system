document.getElementById('movieInput').addEventListener('input', function() {
    const userInput = this.value.trim().toLowerCase();

    // Fetch movies from JSON file
    fetch('new_movie_recommendations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON file');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Get movie title suggestions based on user input
            const suggestions = getSuggestions(data, userInput);
            displaySuggestions(suggestions);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function getSuggestions(movies, userInput) {
    // Filter movie titles based on user input
    return movies.filter(movie => movie.movie.toLowerCase().includes(userInput))
                 .map(movie => movie.movie) // Extract movie titles
                 .slice(0, 5); // Return up to 5 suggestions
}

function displaySuggestions(suggestions) {
    const suggestionsDropdown = document.getElementById('suggestionsDropdown');
    suggestionsDropdown.innerHTML = ''; // Clear previous suggestions

    suggestions.forEach(title => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = title;
        suggestionItem.classList.add('suggestion');
        suggestionItem.addEventListener('click', function() {
            document.getElementById('movieInput').value = title;
            suggestionsDropdown.innerHTML = ''; // Clear suggestions after selection
        });
        suggestionsDropdown.appendChild(suggestionItem);
    });

    // Show or hide the dropdown based on the number of suggestions
    if (suggestions.length > 0) {
        suggestionsDropdown.style.display = 'block';
    } else {
        suggestionsDropdown.style.display = 'none';
    }
}

function getRecommendations() {
    // Get user input
    const userInput = document.getElementById('movieInput').value.trim().toLowerCase();

    // Fetch JSON data
    fetch('new_movie_recommendations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON file');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Process JSON data
            let recommendations = [];
            data.forEach(movie => {
                // Find recommendations for the user input movie
                if (movie.movie.toLowerCase() === userInput) {
                    recommendations = movie.recommendation.map((rec, index) => [rec, movie.link[index]]);
                }
            });

            // Display recommendations
            displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    if (recommendations.length > 0) {
        // Generate HTML for recommendations
        let recommendationsHTML = '<h2>Recommended Movies:</h2><ul>';
        recommendations.forEach(recommendation => {
            const movieName = recommendation[0];
            const imageUrl = recommendation[1];
            recommendationsDiv.classList.add('images');
            
            recommendationsHTML += `<li><b>${movieName}</b><br><img src="${imageUrl}" class="images" alt="${movieName}"></li>`;
        });
        recommendationsHTML += '</ul>';
        
        // Display recommendations on the page
        recommendationsDiv.innerHTML = recommendationsHTML;
    } else {
        // If no recommendations found, display a message
        recommendationsDiv.innerHTML = '<p>No recommendations found for the entered movie title.</p>';
    }
}
