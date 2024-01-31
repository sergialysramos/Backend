document.addEventListener("DOMContentLoaded", () => {
    const characterId = Math.floor(Math.random() * 500) + 1;
    const apiUrl = `https://api.disneyapi.dev/characters/xxx${characterId.toString().padStart(3, '0')}`;


    fetch('api https://api.disneyapi.dev/characters/xxx')
        .then(response => response.json())
        .then(data => {
        
            document.getElementById("character-image").src = data.image;
            document.getElementById("character-name").textContent = data.name;
            document.getElementById("character-id").textContent = `ID: ${data.id}`;

            const moviesList = document.getElementById("character-movies");
            moviesList.innerHTML = "";
            if (data.movies && data.movies.length > 0) {
                data.movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.textContent = movie;
                    moviesList.appendChild(listItem);
                });
            } else {
                const noMovies = document.createElement("li");
                noMovies.textContent = "No se encontraron películas.";
                moviesList.appendChild(noMovies);
            }
        })
        .catch(error => console.error("Error al obtener el personaje:", error));
});
