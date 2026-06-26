// Day 2: replaced all onclick attributes with addEventListener
// Compared to Day 1: no global functions called from HTML, DOMContentLoaded wrapper,
// input validation with error messages, safe rendering via escapeHtml()

const ideas = [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-btn').addEventListener('click', addIdea);
  document.getElementById('clear-btn').addEventListener('click', clearIdeas);

  document.getElementById('idea-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addIdea();
  });

  renderIdeas();
});

function addIdea() {
  const input = document.getElementById('idea-input');
  const errorMsg = document.getElementById('error-msg');
  const text = input.value.trim();

  if (!text) {
    errorMsg.textContent = 'Please enter an idea before adding.';
    input.focus();
    return;
  }

  errorMsg.textContent = '';
  ideas.push({ id: Date.now(), text });

  input.value = '';
  input.focus();
  renderIdeas();
}

function clearIdeas() {
  ideas.length = 0;
  renderIdeas();
}

function renderIdeas() {
  const list = document.getElementById('ideas-list');

  if (ideas.length === 0) {
    list.innerHTML = '<p class="empty">No ideas yet. Add one above!</p>';
    return;
  }

  list.innerHTML = ideas
    .map(idea => `
      <div class="idea-card">
        <span>${escapeHtml(idea.text)}</span>
        <button class="remove-btn" data-id="${idea.id}" aria-label="Remove idea">✕</button>
      </div>
    `)
    .join('');

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      removeIdea(id);
    });
  });
}

function removeIdea(id) {
  const idx = ideas.findIndex(idea => idea.id === id);

  if (idx !== -1) {
    ideas.splice(idx, 1);
  }

  renderIdeas();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}