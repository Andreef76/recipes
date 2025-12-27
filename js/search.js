let idx;
let documents = [];

fetch('search-index.json')
  .then(res => res.json())
  .then(data => {
    documents = data;

    idx = lunr(function () {
      this.ref('id');
      this.field('title');
      this.field('content');

      data.forEach(doc => this.add(doc));
    });
  });

function doSearch(query) {
  const results = idx.search(query);
  const container = document.getElementById('search-results');
  container.innerHTML = '';

  results.forEach(result => {
    const doc = documents.find(d => d.id === result.ref);
    const a = document.createElement('a');
    a.href = doc.url;
    a.textContent = doc.title;
    a.style.display = 'block';
    container.appendChild(a);
  });
}
