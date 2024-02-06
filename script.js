document.getElementById("recommendationForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const searchInput = prompt("Enter a movie title:");
    if (!searchInput) return; // User canceled or entered empty input
  
    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = ""; // Clear previous recommendations
  
    try {
      const response = await fetch(`http://localhost:3000/recommendations?search=${encodeURIComponent(searchInput)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      data.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
          <h2>${movie.title}</h2>
          <p>${movie.description}</p>
          <img src="${movie.imageUrl}" alt="${movie.title}">
        `;
        recommendationsContainer.appendChild(movieElement);
      });
    } catch (error) {
      console.error(error);
      alert('Error fetching recommendations. Please try again later.');
    }
  });
  