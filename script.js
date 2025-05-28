
  const skillInput = document.getElementById('skillInput');
  const addSkillBtn = document.getElementById('addSkillBtn');
  const tagsSelecionadas = document.getElementById('tagsSelecionadas');
  const MAX_SKILLS = 8;

  let skills = [];

  function renderSkills() {
    tagsSelecionadas.innerHTML = '';
    skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      span.classList.add('tag');
      tagsSelecionadas.appendChild(span);
    });
  }

  addSkillBtn.addEventListener('click', () => {
    const newSkill = skillInput.value.trim();
    if (newSkill === '' || skills.includes(newSkill)) return;

    if (skills.length >= MAX_SKILLS) {
      alert("Você atingiu o número máximo de habilidades.");
      return;
    }

    skills.push(newSkill);
    renderSkills();
    skillInput.value = '';
  });


  document.getElementById('btnProfissional').addEventListener('click', () => {
    window.location.href = 'register.html';
  });

   document.getElementById('btnLogin').addEventListener('click', () => {
    window.location.href = 'login.html';
  });

    document.getElementById('btnVoltarHome').addEventListener('click', () => {
    window.location.href = 'index.html';
  });




 const profissionais = [
    {
      nome: 'Ana Ferreira',
      profissao: 'Designer de Interiores',
      cidade: 'São Paulo, SP',
      nota: 4.9,
      reviews: 127,
      imagem: 'https://randomuser.me/api/portraits/women/65.jpg',
      coords: [-23.5505, -46.6333]
    },
    {
      nome: 'Ricardo Santos',
      profissao: 'Consultor Financeiro',
      cidade: 'Rio de Janeiro, RJ',
      nota: 4.8,
      reviews: 84,
      imagem: 'https://randomuser.me/api/portraits/men/42.jpg',
      coords: [-22.9068, -43.1729]
    },
    {
      nome: 'Juliana Lima',
      profissao: 'Personal Trainer',
      cidade: 'Belo Horizonte, MG',
      nota: 5.0,
      reviews: 203,
      imagem: 'https://randomuser.me/api/portraits/women/44.jpg',
      coords: [-19.9167, -43.9345]
    }
  ];

  function renderProfissionais(lista) {
    const container = document.getElementById('listaProfissionais');
    container.innerHTML = '';
    lista.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('card-profissional');
      card.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}"/>
        <div>
          <h4>${p.nome}</h4>
          <span>${p.profissao}</span>
          <p>${p.nota} (${p.reviews} avaliações)</p>
          <p>${p.cidade}</p>
          <div class="botoes">
            <button>Agendar</button>
            <button>Ver Perfil</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function buscarProfissionais() {
    const ratingMin = [...document.querySelectorAll('.filtro-rating input:checked')].map(el => parseFloat(el.value));
    const filtrados = profissionais.filter(p => {
      if (ratingMin.length > 0) {
        return ratingMin.some(min => p.nota >= min);
      }
      return true;
    });
    renderProfissionais(filtrados);
  }

  function limparFiltros() {
    document.getElementById('servicoInput').value = '';
    document.getElementById('localInput').value = '';
    document.querySelectorAll('input[type=checkbox], input[type=radio]').forEach(el => el.checked = false);
    document.getElementById('filtroDistancia').value = 10;
    document.getElementById('distanciaValor').innerText = '10km';
    renderProfissionais(profissionais);
  }

  document.getElementById('filtroDistancia').addEventListener('input', (e) => {
    document.getElementById('distanciaValor').innerText = `${e.target.value}km`;
  });

  function verMaisProfissionais() {
    alert('Carregar mais profissionais (simulado).');
  }

  function initMap() {
    const map = L.map('map').setView([-20.5, -45], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    profissionais.forEach(p => {
      L.marker(p.coords).addTo(map).bindPopup(`<b>${p.nome}</b><br>${p.profissao}`);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProfissionais(profissionais);
    initMap();
  });