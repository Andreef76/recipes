let idx = null;
let documents = [];

// Загружаем индекс
fetch('search-index.json')
  .then(res => res.json())
  .then(data => {
    documents = data;
    idx = lunr(function () {
      this.use(lunr.ru);
      this.ref('id');
      this.field('title');
      this.field('content');
      documents.forEach(doc => this.add(doc));
    });
  });

function doSearch(q) {
  q = q.toLowerCase();
  if (!idx || q.length < 2) return;

  const results = idx.search(q);
  const box = document.getElementById('search-results');
  box.innerHTML = '';

  results.forEach(r => {
    const doc = documents.find(d => d.id === r.ref);
    const a = document.createElement('a');
    a.href = doc.url;
    a.textContent = doc.title;
    box.appendChild(a);
  });
}
