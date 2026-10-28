const canvas = document.querySelector('#playfield');
const ctx = canvas.getContext('2d');
const input = document.querySelector('#word-input');
const resultPanel = document.querySelector('#result-panel');
const selectionPanel = document.querySelector('#selection-panel');
const gameShell = document.querySelector('#game-shell');
const umbrellaConfirm = document.querySelector('#umbrella-confirm');
const scoreNode = document.querySelector('#score');
const levelNode = document.querySelector('#level');
const timerNode = document.querySelector('#timer');
const umbrellaValue = document.querySelector('#umbrella-value');
const umbrellaMeter = document.querySelector('#umbrella-meter');
const toast = document.querySelector('#toast');
const mascot = new Image();
mascot.src = './towel-kun.png';
mascot.addEventListener('load', drawScene);
let selectedUmbrellaSprite = null;

const words = ['송월', '타올', '우산', '장마', '소나기', '보송보송', '빗방울', '산뜻한', '포근한', '맑은날', '선물', '감사', '행복', '튼튼한', '뽀송', '야호'];
const umbrellas = [
  { id: 'suc-606fa', category: '3단우산', name: '송월 3단 비즈니스 완자', code: 'SUS 606FA', type: '55cm · 8K · 완전자동', price: '18,000원', color: '#31554c', image: 'umbrella-01.jpg', features: ['세련된 딥컬러와 안정적인 내구성', '완전자동 · UV 차단 및 쿨링 기능', 'FRP 전착살대와 전착중봉'] },
  { id: 'sus-503a', category: '2단우산', name: '송월 2단 비즈니스', code: 'SUS 503A', type: '58cm · 8K · 반자동', price: '17,000원', color: '#466252', image: 'umbrella-02.jpg', features: ['안쪽 암막 코팅으로 햇빛과 비 차단', '변색 방지 전착살대와 전착중봉', '차분한 딥컬러'] },
  { id: 'sus-504a', category: '2단우산', name: '송월 2단 베이직', code: 'SUS-504A', type: '58cm · 8K · 반자동', price: '14,000원', color: '#75645a', image: 'umbrella-03.jpg', features: ['휴대하기 좋은 가벼운 무게와 작은 손잡이', '변색 방지 전착살대와 고급 포인트 라벨', '차분한 컬러감의 무지 원단'] },
  { id: 'suc-405a', category: '장우산', name: '카운테스마라 장 우드', code: 'SUC 405A', type: '70cm · 8K · 반자동', price: '23,000원', color: '#bf9e91', image: 'umbrella-04.jpg', features: ['고급스러운 우드 손잡이와 브랜드 라벨', 'UV 차단 · FRP 전착살대', '낙뢰 사고 대비 고무소재 완충장치 캡'] },
  { id: 'suc-605fa', category: '3단우산', name: '카운테스마라 3단 우드완자', code: 'SUC 605FA', type: '55cm · 8K · 완전자동', price: '21,000원', color: '#c27f91', image: 'umbrella-05.jpg', features: ['편리한 완전자동 기능과 고급 우드 손잡이', '변색·벗겨짐 방지 전착 살대와 중봉', '고급스러운 포인트 라벨'] },
  { id: 'sus-404m', category: '장우산', name: '송월 장 골프암막 수동', code: 'SUS 404M', type: '75cm · 8K · 수동', price: '28,000원', color: '#252525', image: 'umbrella-06.jpg', features: ['양면 동일 암막 원단으로 UV 차단', '송월 개발 골프 퍼터형 손잡이', 'FRP 살대와 알루미늄 중봉'] },
  { id: 'sus-608m', category: '3단우산', name: '송월 3단 베이직 수동', code: 'SUS 608M', type: '55cm · 8K · 수동', price: '11,000원', color: '#263750', image: 'umbrella-07.jpg', features: ['가방에 넣기 좋은 3단 접이식', 'FRP 전착살대와 전착중봉', '부담 없이 준비하기 좋은 기본 우산'] },
  { id: 'sus-501a', category: '2단우산', name: '송월 2단 대형', code: 'SUS 501A', type: '65cm · 8K · 반자동', price: '22,000원', color: '#68869c', image: 'umbrella-08.jpg', features: ['장우산처럼 넉넉한 65cm 대형 사이즈', '안쪽 암막 코팅으로 자외선 차단', '전착·FRP 살대와 전착 중봉'] },
  { id: 'sus-601fa', category: '3단우산', name: '송월 3단 대형 안전완자', code: 'SUS 601FA', type: '63cm · 8K · 완전자동 · 안전', price: '29,000원', color: '#5d788e', image: 'umbrella-09.jpg', features: ['넉넉한 63cm 대형 사이즈', '접을 때 튕김 걱정을 덜어주는 안전 완전자동', '전착·FRP 살대와 전착 중봉'] },
  { id: 'sus-402a', category: '장우산', name: '송월 장 방풍 컬러암막', code: 'SUS 402A', type: '75cm · 8K · 반자동', price: '34,000원', color: '#302c2c', image: 'umbrella-10.jpg', features: ['양면 다른 컬러의 방풍·암막 원단', '초고밀도 30D/280T 원단으로 차광·차열', '가벼운 FRP 살대와 알루미늄 중봉'] },
  { id: 'sus-406a', category: '장우산', name: '송월 장 비즈니스', code: 'SUS 406A', type: '70cm · 8K · 반자동', price: '20,000원', color: '#31554c', image: 'umbrella-11.jpg', features: ['세련된 딥컬러와 안정적인 내구성', '70cm 넉넉한 장우산', 'FRP 전착살대와 전착중봉'] },
  { id: 'sus-407a', category: '장우산', name: '송월 장 컬러바이어스', code: 'SUS 407A', type: '70cm · 8K · 반자동', price: '21,000원', color: '#725c50', image: 'umbrella-12.jpg', features: ['긴 스트랩으로 어깨에도 멜 수 있는 디자인', '바이어스 컬러 배색으로 포인트', 'UV 차단 · FRP 전착살대'] },
  { id: 'sus-607a', category: '3단우산', name: '송월 3단 솔리드 반자동', code: 'SUS 607A', type: '55cm · 8K · 반자동', price: '14,000원', color: '#91b0c7', image: 'umbrella-13.jpg', features: ['190T 무지 원단의 다양한 컬러', 'FRP 전착살대와 전착중봉', '깔끔하고 기본에 충실한 반자동'] },
];
let selectedUmbrella = null;
const game = {
  state: 'ready',
  targets: [],
  score: 0,
  level: 1,
  elapsed: 0,
  wetness: 0,
  playerX: 0.5,
  puddles: [],
  effects: [],
  commandedTargetId: null,
  lastFrame: 0,
  spawnElapsed: 0,
  lastTimestamp: 0,
  nextId: 0,
  toastTimeout: null,
};

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawScene();
}

function dimensions() {
  const rect = canvas.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawScene() {
  const { width, height } = dimensions();
  if (!width || !height) return;
  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#dcecf0');
  sky.addColorStop(0.68, '#eff2e9');
  sky.addColorStop(1, '#e8e3d5');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255,255,255,.55)';
  drawCloud(width * 0.19, height * 0.18, 30);
  drawCloud(width * 0.79, height * 0.14, 38);
  drawCloud(width * 0.46, height * 0.3, 21);

  ctx.strokeStyle = 'rgba(112,155,177,.28)';
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 34; i += 1) {
    const x = ((i * 83 + 31) % Math.max(width, 1));
    const y = ((i * 47 + game.elapsed * 58) % Math.max(height * 0.68, 1));
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 5, y + 13);
    ctx.stroke();
  }

  const groundY = height * 0.86;
  ctx.fillStyle = '#d6d3bd';
  ctx.fillRect(0, groundY, width, height - groundY);
  ctx.fillStyle = '#bdcdb9';
  ctx.fillRect(0, groundY, width, 6);

  drawWetGround(width, height * 0.86);
  drawSelectedUmbrella(width * game.playerX, height * 0.86, width);
  drawTowelKun(width * game.playerX, height * 0.86);
  drawTargets(width);
  drawEffects(width, height);
}

function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x - size * 0.45, y + 4, size * 0.38, 0, Math.PI * 2);
  ctx.arc(x, y - size * 0.08, size * 0.55, 0, Math.PI * 2);
  ctx.arc(x + size * 0.48, y + 5, size * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawTowelKun(x, groundY) {
  if (!mascot.complete || !mascot.naturalWidth) return;
  const imageHeight = Math.min(165, groundY * 0.48);
  const imageWidth = imageHeight * mascot.naturalWidth / mascot.naturalHeight;
  const imageX = x - imageWidth / 2;
  const imageY = groundY - imageHeight;
  ctx.save();
  ctx.fillStyle = 'rgba(80,83,70,.14)';
  ctx.beginPath();
  ctx.ellipse(x, groundY + 1, imageWidth * 0.43, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.drawImage(mascot, imageX, imageY, imageWidth, imageHeight);
  ctx.restore();
}

function getUmbrellaLayout(playerX, width, groundY) {
  const mascotHeight = Math.min(165, groundY * 0.48);
  const mascotAspect = mascot.naturalWidth && mascot.naturalHeight
    ? mascot.naturalWidth / mascot.naturalHeight
    : 1;
  const mascotWidth = mascotHeight * mascotAspect;
  const handX = width * playerX + mascotWidth * 0.25;
  const handY = groundY - mascotHeight + mascotHeight * 0.16;
  const imageWidth = Math.min(115, width * 0.24);
  const imageAspect = selectedUmbrellaSprite?.naturalWidth
    ? selectedUmbrellaSprite.naturalHeight / selectedUmbrellaSprite.naturalWidth
    : 0.72;
  const imageHeight = imageWidth * imageAspect;
  const imageY = handY - imageHeight * 0.9;

  return {
    x: handX,
    y: imageY,
    width: imageWidth,
    height: imageHeight,
    canopyTop: imageY + imageHeight * 0.04,
    canopyBottom: imageY + imageHeight * 0.52,
    canopyY: imageY + imageHeight * 0.4,
    halfWidth: imageWidth * 0.48,
    handOffset: mascotWidth * 0.25,
  };
}

function targetTouchesUmbrella(target, layout, width, height) {
  const x = target.x * width;
  const y = target.y * height;
  ctx.save();
  ctx.font = '700 14px "Pretendard", sans-serif';
  const pillWidth = Math.max(62, ctx.measureText(target.word).width + 26);
  ctx.restore();

  return x + pillWidth / 2 >= layout.x - layout.halfWidth
    && x - pillWidth / 2 <= layout.x + layout.halfWidth
    && y + 16 >= layout.canopyTop
    && y - 16 <= layout.canopyBottom;
}

function targetTouchesMascot(target, playerX, width, height) {
  if (!mascot.naturalWidth || !mascot.naturalHeight) return false;
  const groundY = height * 0.86;
  const mascotHeight = Math.min(165, groundY * 0.48);
  const mascotWidth = mascotHeight * mascot.naturalWidth / mascot.naturalHeight;
  const mascotX = width * playerX;
  const mascotTop = groundY - mascotHeight;
  const targetX = target.x * width;
  const targetY = target.y * height;
  ctx.save();
  ctx.font = '700 14px "Pretendard", sans-serif';
  const targetWidth = Math.max(62, ctx.measureText(target.word).width + 26);
  ctx.restore();

  return targetX + targetWidth / 2 >= mascotX - mascotWidth / 2
    && targetX - targetWidth / 2 <= mascotX + mascotWidth / 2
    && targetY + 16 >= mascotTop
    && targetY - 16 <= groundY;
}

function drawWetGround(width, groundY) {
  if (!game.wetness) return;
  const puddleHeight = 7 + game.wetness * 0.12;
  const gradient = ctx.createLinearGradient(0, groundY, 0, groundY + puddleHeight * 2);
  gradient.addColorStop(0, `rgba(99, 153, 170, ${0.14 + game.wetness / 260})`);
  gradient.addColorStop(1, 'rgba(99, 153, 170, 0)');
  game.puddles.forEach((puddle) => {
    const age = Math.min(1, puddle.age / 1.1);
    const radius = 5 + age * puddle.radius;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(puddle.x * width, groundY + puddleHeight * 0.35, radius, puddleHeight * 0.2 + age * 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(90, 144, 161, ${(0.2 + game.wetness / 260) * (1 - age * 0.42)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(puddle.x * width, groundY + puddleHeight * 0.35, radius * 0.64, puddleHeight * 0.09 + age * 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawSelectedUmbrella(x, groundY, width) {
  if (!selectedUmbrellaSprite?.complete || !selectedUmbrellaSprite.naturalWidth || !mascot.naturalWidth) return;
  const layout = getUmbrellaLayout(x / width, width, groundY);
  ctx.drawImage(selectedUmbrellaSprite, layout.x - layout.width / 2, layout.y, layout.width, layout.height);
}

function drawTargets(width) {
  const { height } = dimensions();
  game.targets.forEach((target) => {
    const x = target.x * width;
    const y = target.y * height;
    ctx.font = '700 14px "Pretendard", sans-serif';
    const textWidth = ctx.measureText(target.word).width;
    const pillWidth = Math.max(62, textWidth + 26);
    ctx.save();
    ctx.shadowColor = 'rgba(50,74,78,.15)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    roundedRect(ctx, x - pillWidth / 2, y - 16, pillWidth, 32, 12);
    ctx.fillStyle = '#fffdf8';
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = target.armed ? '#f18768' : target.focused ? '#e5ad68' : '#d7e3dc';
    ctx.lineWidth = target.armed || target.focused ? 2 : 1;
    roundedRect(ctx, x - pillWidth / 2, y - 16, pillWidth, 32, 12);
    ctx.stroke();
    ctx.fillStyle = target.armed ? '#db694f' : '#485d56';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(target.word, x, y + 1);
    ctx.restore();
  });
}

function drawEffects(width, height) {
  game.effects.forEach((effect) => {
    const progress = Math.min(1, effect.age / effect.duration);
    const x = effect.x * width;
    const y = effect.y * height;
    if (effect.type === 'block') {
      const radius = 8 + progress * 35;
      ctx.save();
      ctx.globalAlpha = 1 - progress;
      ctx.strokeStyle = '#f2b752';
      ctx.lineWidth = 3 - progress * 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i += 1) {
        const angle = i * Math.PI / 4 + progress * 0.45;
        const inner = radius * 0.55;
        const outer = inner + 8 * (1 - progress);
        ctx.strokeStyle = i % 2 ? '#f6d477' : '#fff4bd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * inner, y + Math.sin(angle) * inner);
        ctx.lineTo(x + Math.cos(angle) * outer, y + Math.sin(angle) * outer);
        ctx.stroke();
      }
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.strokeStyle = '#79b6c4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 4 + progress * 26, 2 + progress * 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 7; i += 1) {
      const angle = i * Math.PI * 2 / 7;
      const distance = 5 + progress * 23;
      const dropX = x + Math.cos(angle) * distance;
      const dropY = y + Math.sin(angle) * distance * 0.36;
      ctx.fillStyle = i % 2 ? '#9ed3dc' : '#6ca7b7';
      ctx.beginPath();
      ctx.arc(dropX, dropY, 2.5 * (1 - progress * 0.7), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}

function setUmbrellaMeter() {
  umbrellaValue.textContent = `${Math.ceil(game.wetness)}%`;
  umbrellaMeter.style.width = `${Math.max(0, game.wetness)}%`;
  umbrellaMeter.classList.toggle('low', game.wetness > 55);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(game.toastTimeout);
  game.toastTimeout = window.setTimeout(() => toast.classList.remove('visible'), 950);
}

function openUmbrellaConfirmation() {
  if (!selectedUmbrella) return;
  document.querySelector('#confirm-product-image').src = `./assets/umbrellas/${selectedUmbrella.image}`;
  document.querySelector('#confirm-product-image').alt = selectedUmbrella.name;
  document.querySelector('#confirm-product-code').textContent = selectedUmbrella.code;
  document.querySelector('#confirm-product-name').textContent = selectedUmbrella.name;
  document.querySelector('#confirm-product-features').innerHTML = selectedUmbrella.features.map((feature) => `<li>${feature}</li>`).join('');
  document.querySelector('#confirm-product-price').textContent = `${selectedUmbrella.type} · 참고가 ${selectedUmbrella.price}`;
  umbrellaConfirm.showModal();
}

function renderUmbrellas() {
  const groups = document.querySelector('#umbrella-groups');
  const categories = ['2단우산', '3단우산', '장우산'];
  groups.innerHTML = categories.map((category) => {
    const products = umbrellas.filter((umbrella) => umbrella.category === category);
    return `<section class="umbrella-group" aria-label="${category}">
      <h3><span>☂</span> ${category}<small>${products.length}종</small></h3>
      <div class="umbrella-options">${products.map((umbrella) => `
        <button type="button" class="umbrella-choice" data-umbrella="${umbrella.id}" aria-pressed="false">
          <img src="./assets/umbrellas/${umbrella.image}" alt="${umbrella.name} 펼친 모습과 컬러" loading="lazy" />
          <span class="umbrella-card-body">
            <span class="product-code">${umbrella.code}</span>
            <b>${umbrella.name}</b>
            <span class="umbrella-type">${umbrella.type}</span>
            <span class="umbrella-features"><i>✦ ${umbrella.features[0]}</i><i>✦ ${umbrella.features[1]}</i></span>
            <span class="umbrella-price">${umbrella.price}</span>
          </span>
        </button>`).join('')}</div>
    </section>`;
  }).join('');

  groups.querySelectorAll('.umbrella-choice').forEach((choice) => {
    choice.addEventListener('click', () => {
      const umbrella = umbrellas.find((item) => item.id === choice.dataset.umbrella);
      selectedUmbrella = umbrella;
      selectedUmbrellaSprite = new Image();
      const sprite = selectedUmbrellaSprite;
      sprite.addEventListener('load', drawScene, { once: true });
      sprite.addEventListener('error', () => {
        console.error(`Unable to load the selected umbrella image: ${umbrella.image}`);
        showToast('선택한 우산 이미지를 불러오지 못했어요.');
      }, { once: true });
      sprite.src = `./assets/umbrellas/game/horizontal/${umbrella.image.replace(/\.jpg$/, '.png')}`;
      groups.querySelectorAll('.umbrella-choice').forEach((item) => {
        const selected = item === choice;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      document.querySelector('#selection-hint').textContent = `${umbrella.name} 선택 완료 · ${umbrella.code}`;
      document.querySelector('#choose-umbrella-start').disabled = false;
      openUmbrellaConfirmation();
    });
  });
}

function showPlayedUmbrella() {
  document.querySelector('#result-product-image').src = `./assets/umbrellas/${selectedUmbrella.image}`;
  document.querySelector('#result-product-image').alt = selectedUmbrella.name;
  document.querySelector('#result-product-code').textContent = selectedUmbrella.code;
  document.querySelector('#result-product-name').textContent = selectedUmbrella.name;
  document.querySelector('#result-product-features').innerHTML = selectedUmbrella.features.map((feature) => `<li>${feature}</li>`).join('');
  document.querySelector('#result-product-price').textContent = `자료 기준 참고가 ${selectedUmbrella.price} · ${selectedUmbrella.type}`;
}

function spawnTarget() {
  const word = words[Math.floor(Math.random() * words.length)];
  ctx.save();
  ctx.font = '700 14px "Pretendard", sans-serif';
  const pillWidth = Math.max(62, ctx.measureText(word).width + 26);
  ctx.restore();
  const { width } = dimensions();
  const margin = Math.min(0.06, pillWidth / (2 * width));
  const x = margin + Math.random() * (1 - margin * 2);
  game.targets.push({
    id: game.nextId++,
    word,
    x,
    y: -0.035,
    speed: 0.12 + game.level * 0.012 + Math.random() * 0.025,
    focused: false,
  });
}

function hitTarget(target, canopyY) {
  game.targets = game.targets.filter((item) => item.id !== target.id);
  game.effects.push({ type: 'block', x: target.x, y: canopyY / dimensions().height, age: 0, duration: 0.48 });
  if (game.commandedTargetId === target.id) game.commandedTargetId = null;
  game.score += 10 + game.level * 2;
  scoreNode.textContent = String(game.score).padStart(4, '0');
  showToast('팡! 타올쿤이 빗방울을 막았어요 +점수');
}

function movePlayer(delta) {
  const { width, height } = dimensions();
  const layout = getUmbrellaLayout(game.playerX, width, height * 0.86);
  const minPlayerX = Math.max(0, (layout.halfWidth - layout.handOffset) / width);
  const maxPlayerX = Math.min(1, (width - layout.halfWidth - layout.handOffset) / width);
  const target = game.targets.find((item) => item.id === game.commandedTargetId);
  if (!target) return;
  const distance = target.x - game.playerX;
  const movement = Math.sign(distance) * Math.min(Math.abs(distance), delta * 0.82);
  game.playerX = Math.max(minPlayerX, Math.min(maxPlayerX, game.playerX + movement));
}

function finishGame(won) {
  if (game.state !== 'running') return;
  game.state = won ? 'won' : 'lost';
  input.disabled = true;
  document.querySelector('#submit-word').disabled = true;
  document.querySelector('#result-icon').textContent = won ? '☀️' : '💧';
  document.querySelector('#result-title').textContent = won ? '땅을 뽀송하게 지켜냈어요!' : '앗, 땅이 빗물에 젖었어요!';
  document.querySelector('#result-message').textContent = `${game.elapsed}초 동안 ${game.score}점을 얻었어요. ${won ? '타올쿤이 열심히 빗방울을 막았어요!' : '다시 도전해서 타올쿤과 땅을 지켜주세요!'}`;
  showPlayedUmbrella();
  resultPanel.classList.remove('hidden');
  drawScene();
}

function update(timestamp) {
  if (game.state !== 'running') return;
  const delta = Math.min((timestamp - game.lastTimestamp) / 1000, 0.05);
  game.lastTimestamp = timestamp;
  game.elapsed += delta;
  game.spawnElapsed += delta;
  game.effects.forEach((effect) => { effect.age += delta; });
  game.effects = game.effects.filter((effect) => effect.age < effect.duration);
  game.puddles.forEach((puddle) => { puddle.age += delta; });
  game.puddles = game.puddles.filter((puddle) => puddle.age < 16);
  movePlayer(delta);
  game.level = Math.min(8, 1 + Math.floor(game.elapsed / 12));
  levelNode.textContent = String(game.level);
  timerNode.textContent = String(Math.floor(game.elapsed)).padStart(2, '0');

  const spawnInterval = Math.max(0.72, 1.85 - game.level * 0.13);
  if (game.spawnElapsed >= spawnInterval) {
    game.spawnElapsed = 0;
    spawnTarget();
  }

  const { width, height } = dimensions();
  const layout = getUmbrellaLayout(game.playerX, width, height * 0.86);
  const remaining = [];

  game.targets.forEach((target) => {
    if (game.state !== 'running') return;
    target.y += target.speed * delta;
    const x = target.x * width;
    const y = target.y * height;
    if (target.armed) {
      const hitUmbrella = targetTouchesUmbrella(target, layout, width, height);
      if (hitUmbrella || targetTouchesMascot(target, game.playerX, width, height)) {
        hitTarget(target, hitUmbrella ? layout.canopyY : y);
        return;
      }
    }
    if (y >= height * 0.86) {
      game.wetness = Math.min(100, game.wetness + 20);
      game.puddles.push({ x: target.x, age: 0, radius: 11 + game.wetness * 0.12 });
      game.effects.push({ type: 'splash', x: target.x, y: 0.86, age: 0, duration: 0.8 });
      game.commandedTargetId = game.commandedTargetId === target.id ? null : game.commandedTargetId;
      showToast('촤악! 빗방울이 땅에 떨어졌어요!');
      if (game.wetness >= 100) finishGame(false);
      return;
    }
    if (target.y < 1) remaining.push(target);
  });
  game.targets = remaining;
  setUmbrellaMeter();
  drawScene();
  if (game.state !== 'running') return;

  if (game.elapsed >= 60) {
    finishGame(true);
    return;
  }
  game.lastFrame = window.requestAnimationFrame(update);
}

function startGame() {
  game.state = 'running';
  game.targets = [];
  game.score = 0;
  game.level = 1;
  game.elapsed = 0;
  game.wetness = 0;
  game.playerX = 0.5;
  game.puddles = [];
  game.effects = [];
  game.commandedTargetId = null;
  game.spawnElapsed = 0;
  game.lastTimestamp = performance.now();
  scoreNode.textContent = '0000';
  levelNode.textContent = '1';
  timerNode.textContent = '00';
  resultPanel.classList.add('hidden');
  input.value = '';
  input.disabled = false;
  document.querySelector('#submit-word').disabled = false;
  game.puddles = [];
  game.effects = [];
  game.commandedTargetId = null;
  setUmbrellaMeter();
  input.focus();
  game.lastFrame = window.requestAnimationFrame(update);
}

function handleWordInput() {
  const value = input.value.trim();
  game.targets.forEach((target) => {
    target.focused = value.length > 0 && target.word.startsWith(value);
  });
  if (!value) {
    drawScene();
    return;
  }
  const target = game.targets
    .filter((item) => item.word === value)
    .sort((a, b) => b.y - a.y)[0];
  if (!target) {
    drawScene();
    return;
  }
  game.targets.forEach((item) => { item.armed = false; });
  target.armed = true;
  target.focused = true;
  game.commandedTargetId = target.id;
  input.value = '';
  const { width, height } = dimensions();
  const layout = getUmbrellaLayout(game.playerX, width, height * 0.86);
  const hitUmbrella = targetTouchesUmbrella(target, layout, width, height);
  if (hitUmbrella || targetTouchesMascot(target, game.playerX, width, height)) {
    hitTarget(target, hitUmbrella ? layout.canopyY : target.y * height);
    drawScene();
    return;
  }
  showToast(`타올쿤 출동! 「${target.word}」 빗방울을 막으러 가요!`);
  drawScene();
}

document.querySelector('#typing-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (game.state === 'running') handleWordInput();
  input.focus();
});
input.addEventListener('input', (event) => {
  if (event.isComposing || game.state !== 'running') return;
  handleWordInput();
});

document.querySelector('#choose-umbrella-start').addEventListener('click', () => {
  openUmbrellaConfirmation();
});

document.querySelector('#confirm-yes').addEventListener('click', () => {
  if (!selectedUmbrella) return;
  umbrellaConfirm.close();
  selectionPanel.classList.add('hidden');
  gameShell.classList.remove('hidden');
  resizeCanvas();
  startGame();
});

document.querySelector('#confirm-another').addEventListener('click', () => umbrellaConfirm.close());
document.querySelector('#confirm-close').addEventListener('click', () => umbrellaConfirm.close());

document.querySelector('#restart-button').addEventListener('click', () => {
  if (game.lastFrame) window.cancelAnimationFrame(game.lastFrame);
  game.state = 'ready';
  resultPanel.classList.add('hidden');
  gameShell.classList.add('hidden');
  selectionPanel.classList.remove('hidden');
  selectedUmbrella = null;
  document.querySelector('#selection-hint').textContent = '마음에 드는 우산을 선택해 주세요.';
  document.querySelector('#choose-umbrella-start').disabled = true;
  document.querySelectorAll('.umbrella-choice').forEach((item) => {
    item.classList.remove('selected');
    item.setAttribute('aria-pressed', 'false');
  });
  game.targets = [];
  game.score = 0;
  game.elapsed = 0;
  game.wetness = 0;
  game.playerX = 0.5;
  game.puddles = [];
  game.effects = [];
  game.commandedTargetId = null;
  scoreNode.textContent = '0000';
  levelNode.textContent = '1';
  timerNode.textContent = '00';
  setUmbrellaMeter();
  drawScene();
});
document.querySelector('#retry-button').addEventListener('click', startGame);
document.querySelector('#result-close').addEventListener('click', () => {
  resultPanel.classList.add('hidden');
  gameShell.classList.add('hidden');
  selectionPanel.classList.remove('hidden');
});

document.querySelector('#dealer-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const region = document.querySelector('#region-input').value.trim();
  if (!region) return;
  const query = encodeURIComponent(`송월타올 대리점 ${region}`);
  window.open(`https://map.naver.com/p/search/${query}`, '_blank', 'noopener,noreferrer');
});

new ResizeObserver(resizeCanvas).observe(canvas);
setUmbrellaMeter();
renderUmbrellas();
