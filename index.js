function getRecommendations() {
    var userInput = document.getElementById("movieInput").value.trim().toLowerCase();
    console.log(userInput)

    // Fetch the JSON data
    fetch('new_movie_recommendations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON file');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Process JSON data
            var recommendations = [];
            data.forEach(movie => {
                if (movie.movie.toLowerCase() === userInput) {
                    recommendations = movie.recommendation.map((rec, index) => [rec, movie.link[index]]);
                    console.log(recommendations)
                }
            });

            // Display recommendations
            displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecommendations(recommendations) {
    var recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "";

    if (recommendations.length > 0) {
        var recommendationsHTML = "<h2>Recommended Movies:</h2><ul>";
        recommendations.forEach(recommendation => {
            var movieName = recommendation[0];
            var imageUrl = recommendation[1];
            recommendationsHTML += "<li><b>" + movieName + "</b><br><img src='" + imageUrl + "' alt='" + movieName + "'></li>";
        });
        recommendationsHTML += "</ul>";
        recommendationsDiv.innerHTML = recommendationsHTML;
    } else {
        recommendationsDiv.innerHTML = "<p>No recommendations found for the entered movie title.</p>";
    }
}