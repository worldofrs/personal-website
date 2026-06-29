// === Project Card Renderer with Filters ===

let allProjects = [];

function loadProjects(jsonPath, containerId, options = {}) {
  const container = document.getElementById(containerId);

  fetch(jsonPath)
    .then(res => res.json())
    .then(projects => {
      allProjects = projects;

      if (options.filters) {
        buildFilters(container);
      }

      // Create the grid container
      const grid = document.createElement('div');
      grid.classList.add('project-grid');
      grid.id = containerId + '-grid';
      container.appendChild(grid);

      renderCards(allProjects, grid);
    })
    .catch(err => {
      container.innerHTML = '<p class="text-muted">Could not load projects.</p>';
      console.error(err);
    });
}

function buildFilters(container) {
  // Extract unique categories from the data
  const categories = [...new Set(allProjects.map(p => p.category))];

  const tabs = document.createElement('div');
  tabs.classList.add('tabs');

  // "All" button
  const allBtn = document.createElement('button');
  allBtn.classList.add('tab-btn', 'active');
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => {
    setActiveBtn(allBtn);
    renderCards(allProjects, document.getElementById(container.id + '-grid'));
  });
  tabs.appendChild(allBtn);

  // One button per category
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.classList.add('tab-btn');
    btn.textContent = formatCategory(cat);
    btn.addEventListener('click', () => {
      setActiveBtn(btn);
      const filtered = allProjects.filter(p => p.category === cat);
      renderCards(filtered, document.getElementById(container.id + '-grid'));
    });
    tabs.appendChild(btn);
  });

  container.appendChild(tabs);
}

function setActiveBtn(activeBtn) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

function renderCards(projects, grid) {
  if (projects.length === 0) {
    grid.innerHTML = '<p class="text-muted">No projects in this category yet.</p>';
    return;
  }

  grid.innerHTML = projects.map(project => {
    const imageHTML = project.image
      ? `<div class="project-card-image"><img src="${project.image}" alt="${project.title}"></div>`
      : `<div class="project-card-image no-image">${project.title.charAt(0)}</div>`;

    const tagsHTML = (project.tags || [])
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    // Fine art uses medium/year instead of tags
    const metaHTML = project.medium
      ? `<div class="project-card-tags"><span class="tag">${project.medium}</span>${project.year ? `<span class="tag">${project.year}</span>` : ''}</div>`
      : tagsHTML ? `<div class="project-card-tags">${tagsHTML}</div>` : '';

    const linkOpen = project.link
      ? `<a href="${project.link}" class="project-card" target="_blank" rel="noopener">`
      : `<div class="project-card">`;

    const linkClose = project.link ? `</a>` : `</div>`;

    return `
      ${linkOpen}
        ${imageHTML}
        <div class="project-card-body">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-description">${project.description}</p>
          ${metaHTML}
        </div>
      ${linkClose}
    `;
  }).join('');
}

function formatCategory(cat) {
  const names = {
    swe: 'SWE',
    dataviz: 'Data Viz',
    uiux: 'UI/UX',
    graphic: 'Graphic Design',
    fineart: 'Fine Art',
    newspaper: 'Newspaper',
  };
  return names[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
}
