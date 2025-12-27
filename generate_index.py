import os
import json
from bs4 import BeautifulSoup  # pip install beautifulsoup4

project_dir = os.path.dirname(__file__)
html_files = [f for f in os.listdir(project_dir) if f.endswith('.html') and f != 'search.html']

documents = []

for filename in html_files:
    filepath = os.path.join(project_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        text = soup.get_text(separator=' ', strip=True).lower()
        title_tag = soup.find('title')
        title = title_tag.get_text(strip=True) if title_tag else filename
        documents.append({
            'id': filename.replace('.html', ''),
            'title': title,
            'content': text,
            'url': filename
        })

with open(os.path.join(project_dir, 'search-index.json'), 'w', encoding='utf-8') as f:
    json.dump(documents, f, ensure_ascii=False, indent=2)

print("search-index.json создан!")
