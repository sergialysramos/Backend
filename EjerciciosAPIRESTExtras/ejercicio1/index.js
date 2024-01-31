fetch('https://gutendex.com/books/')
    .then(response => response.json())
    .then(data => {
        const booksContainer = document.getElementById('books-container');

        data.results.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h3');
            title.textContent = book.title;

            const author = document.createElement('p');
            console.log(book.authors)
            author.textContent = `Author: ${book.authors[0].name}`;

            const cover = document.createElement('img');
            cover.src = book.formats['image/jpeg']; 

            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(cover);

            booksContainer.appendChild(card);
        });
    }).catch(error => {
        console.error('Error en la solicitud:', error);
    });
