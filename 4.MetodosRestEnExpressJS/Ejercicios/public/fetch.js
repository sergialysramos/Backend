fetch('/personas')
    .then(response => response.json())
    .then(personas => {
        
        const personasList = document.getElementById('personas-list');
        personas.forEach(persona => {
            const listItem = document.createElement('li');
            listItem.textContent = `${persona.nombre} ${persona.apellido}, Edad: ${persona.edad}`;
            personasList.appendChild(listItem);
        });
    })
    