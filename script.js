const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const allCards = document.querySelectorAll('.manhwa-card');


function hideOriginalSections() {
  document.querySelectorAll('section').forEach(section => section.style.display = 'none');
}


function showOriginalSections() {
  document.querySelectorAll('section').forEach(section => section.style.display = 'block');
  searchResults.style.display = 'none';
}


searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();

  searchResults.innerHTML = '';
  let found = 0;

  if (query.trim() === '') {
    showOriginalSections();
    return;
  }

  hideOriginalSections();

  allCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
    const cardCol = card.closest('.col');

    if (title.includes(query) || description.includes(query)) {
      const clonedCard = cardCol.cloneNode(true);
      searchResults.appendChild(clonedCard);
      found++;
    }
  });

  searchResults.style.display = found > 0 ? 'flex' : 'none';
});



document.querySelectorAll('.dropdown-menu .dropdown-item[data-genre]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const selectedGenre = link.getAttribute('data-genre').toLowerCase();
    searchResults.innerHTML = '';
    let found = 0;

    hideOriginalSections();

    document.querySelectorAll('.row .col').forEach(cardCol => {
      const genres = (cardCol.getAttribute('data-genre') || '').toLowerCase().split(' ');

      if (genres.includes(selectedGenre)) {
        const clonedCard = cardCol.cloneNode(true);
        searchResults.appendChild(clonedCard);
        found++;
      }
    });

    searchResults.style.display = found > 0 ? 'flex' : 'none';
  });
});


