let skills = [];
const MAX_SKILLS = 8;
let map = null;

document.addEventListener("DOMContentLoaded", () => {
  const skillInput = document.getElementById('skillInput');
  const addSkillBtn = document.getElementById('addSkillBtn');
  const tagsSelecionadas = document.getElementById('tagsSelecionadas');

  function renderSkills() {
    tagsSelecionadas.innerHTML = '';
    skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      span.classList.add('tag');
      tagsSelecionadas.appendChild(span);
    });
  }

  if (addSkillBtn && skillInput && tagsSelecionadas) {
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
  }

  function redirecionarAoClicar(idBotao, destino) {
    const botao = document.getElementById(idBotao);
    if (botao) {
      botao.addEventListener('click', () => {
        window.location.href = destino;
      });
    }
  }

  redirecionarAoClicar('btnVoltarHomeLogin', 'index.html');
  redirecionarAoClicar('btnLogin', 'login.html');
  redirecionarAoClicar('btnProfissional', 'register.html');
  redirecionarAoClicar('btnCliente', 'register.html');
  redirecionarAoClicar('homeRegister', 'index.html');
  redirecionarAoClicar('btnProfissionalCadastro', 'register.html');
   redirecionarAoClicar('cadastreProfissional', 'register.html');

  

  if (document.getElementById('listaProfissionais')) {
    renderProfissionais(profissionais);
  }

  if (document.getElementById('map')) {
    initMap();
  }

  const filtroDistancia = document.getElementById('filtroDistancia');
  const distanciaValor = document.getElementById('distanciaValor');
  if (filtroDistancia && distanciaValor) {
    filtroDistancia.addEventListener('input', (e) => {
      distanciaValor.innerText = `${e.target.value}km`;
    });
  }
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
  if (!container) return;

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

function verMaisProfissionais() {
  alert('Carregar mais profissionais (simulado).');
}

function initMap() {
  if (map) {
    map.remove();
  }

  map = L.map('map').setView([-20.5, -45], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  profissionais.forEach(p => {
    L.marker(p.coords).addTo(map).bindPopup(`<b>${p.nome}</b><br>${p.profissao}`);
  });
}
