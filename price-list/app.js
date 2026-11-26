const products = [
  { name: "CM장라인65", color: "갈색, 녹색", category: "장우산", factoryBeforeTax: 9600, factoryAfterTax: 10560, wholesale: 12800, recommended: 21000, sale: 25100 },
  { name: "CM장폰지바이어스70", color: "검정, 곤색", category: "장우산", factoryBeforeTax: 7300, factoryAfterTax: 8030, wholesale: 9700, recommended: 16000, sale: 19100 },
  { name: "타올쿤 골프70", color: "크림", category: "장우산", new: true, factoryBeforeTax: 17000, factoryAfterTax: 18700, wholesale: null, recommended: 34000, sale: null },
  { name: "클래식 스트라이프65", color: "곤색, 회색", category: "장우산", new: true, factoryBeforeTax: 15000, factoryAfterTax: 16500, wholesale: null, recommended: 30000, sale: null },
  { name: "CM2단도트보더", color: "검정, 곤색", category: "2단우산", factoryBeforeTax: 7800, factoryAfterTax: 8580, wholesale: 10400, recommended: 17000, sale: 20400 },
  { name: "SWU2단뉴모던체크", color: "검정", category: "2단우산", factoryBeforeTax: 5900, factoryAfterTax: 6490, wholesale: 7900, recommended: 13000, sale: 15500 },
  { name: "CM3단완자안전우산", color: "곤색", category: "3단우산", factoryBeforeTax: 10900, factoryAfterTax: 11990, wholesale: 14500, recommended: 24000, sale: 28500 },
  { name: "CM3단라인완자55", color: "갈색, 검정, 녹색, 파랑", category: "3단우산", factoryBeforeTax: 9200, factoryAfterTax: 10120, wholesale: 12200, recommended: 20000, sale: 24100 },
  { name: "CM3단완자63", color: "검정", category: "3단우산", factoryBeforeTax: 10000, factoryAfterTax: 11000, wholesale: 13300, recommended: 22000, sale: 26200 },
  { name: "SW장방풍컬러암막", color: "블랙, 딥블루", category: "장우산", factoryBeforeTax: 12800, factoryAfterTax: 14080, wholesale: 16900, recommended: 23100, sale: 23700 },
  { name: "SW장골프암막수동", color: "블랙, 핑크", category: "장우산", factoryBeforeTax: 10400, factoryAfterTax: 11440, wholesale: 13730, recommended: 18800, sale: 19300 },
  { name: "CM장우드", color: "차콜, 베이지, 핑크", category: "장우산", factoryBeforeTax: 8700, factoryAfterTax: 9570, wholesale: 11490, recommended: 15700, sale: 16100 },
  { name: "SW장컬러바이어스", color: "검정, 네이비, 브라운, 크림", category: "장우산", factoryBeforeTax: 7800, factoryAfterTax: 8580, wholesale: 10300, recommended: 14100, sale: 14500 },
  { name: "SW장비즈니스", color: "블랙, 그린, 딥블루", category: "장우산", factoryBeforeTax: 7300, factoryAfterTax: 8030, wholesale: 10830, recommended: 13200, sale: 13500 },
  { name: "SW장솔리드", color: "곤색, 갈색, 회색", category: "장우산", factoryBeforeTax: 4700, factoryAfterTax: 5170, wholesale: 6210, recommended: 8500, sale: 8700 },
  { name: "SW장베이직", color: "챠콜, 올리브, 크림", category: "장우산", factoryBeforeTax: 4500, factoryAfterTax: 4950, wholesale: 5940, recommended: 8100, sale: 8400 },
  { name: "SW2단대형", color: "블랙, 딥블루, 그린", category: "2단우산", factoryBeforeTax: 8200, factoryAfterTax: 9020, wholesale: 10830, recommended: 14800, sale: 15200 },
  { name: "SW2단비즈니스", color: "블랙, 딥블루, 그린", category: "2단우산", factoryBeforeTax: 6200, factoryAfterTax: 6820, wholesale: 8190, recommended: 11200, sale: 11500 },
  { name: "SW2단베이직", color: "네이비, 브라운, 그레이", category: "2단우산", factoryBeforeTax: 5000, factoryAfterTax: 5500, wholesale: 6600, recommended: 9000, sale: 9300 },
  { name: "SW3단대형안전완자", color: "블랙, 딥블루", category: "3단우산", factoryBeforeTax: 10800, factoryAfterTax: 11880, wholesale: 14260, recommended: 19500, sale: 20000 },
  { name: "SW3단미니안전완자", color: "네이비, 블루, 레몬", category: "3단우산", factoryBeforeTax: 11300, factoryAfterTax: 12430, wholesale: 14920, recommended: 20400, sale: 20900 },
  { name: "SW3단거꾸로안전우산", color: "블랙", category: "3단우산", factoryBeforeTax: 10100, factoryAfterTax: 11110, wholesale: 13340, recommended: 18300, sale: 18700 },
  { name: "CM3단우드완자", color: "챠콜, 베이지, 핑크", category: "3단우산", factoryBeforeTax: 7900, factoryAfterTax: 8690, wholesale: 10430, recommended: 14300, sale: 14700 },
  { name: "SW3단비즈니스완자", color: "블랙, 그린, 딥블루", category: "3단우산", factoryBeforeTax: 6600, factoryAfterTax: 7260, wholesale: 8720, recommended: 11900, sale: 12300 },
  { name: "SW3단솔리드반자동", color: "블랙, 베이지, 스카이", category: "3단우산", factoryBeforeTax: 5000, factoryAfterTax: 5500, wholesale: 6600, recommended: 9000, sale: 9300 },
  { name: "SW3단베이직수동", color: "검정, 하늘, 베이지", category: "3단우산", factoryBeforeTax: 3900, factoryAfterTax: 4290, wholesale: 5150, recommended: 7000, sale: 7300 }
];

const labels = [
  ["factoryBeforeTax", "공장도 (세별도)"],
  ["factoryAfterTax", "공장도 (세포함)"],
  ["wholesale", "출하가 (도매용)"],
  ["recommended", "소비자 권장가격"],
  ["sale", "판매가"]
];
const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");
const emptyMessage = document.querySelector("#empty-message");
const count = document.querySelector("#product-count");
let activeCategory = "전체";

function formatPrice(value) {
  return value == null ? "미정" : `${value.toLocaleString("ko-KR")}원`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("ko-KR");
  const visible = products.filter((product) => {
    const matchesCategory = activeCategory === "전체" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.color}`.toLocaleLowerCase("ko-KR").includes(query);
    return matchesCategory && matchesSearch;
  });

  count.textContent = visible.length.toLocaleString("ko-KR");
  clearSearch.hidden = searchInput.value.length === 0;
  emptyMessage.hidden = visible.length > 0;
  productList.innerHTML = visible.map((product) => {
    const sale = product.sale == null
      ? '<strong class="sale-price pending">원본 미기재</strong>'
      : `<strong class="sale-price">${formatPrice(product.sale)}</strong>`;
    const priceDetails = labels.map(([key, label]) => {
      const missing = product[key] == null ? " class=\"missing\"" : "";
      return `<dt>${label}</dt><dd${missing}>${formatPrice(product[key])}</dd>`;
    }).join("");

    return `<article class="product-card">
      <div class="card-main">
        <div class="card-top"><span class="category-tag">${product.category}</span>${product.new ? '<span class="category-tag new-tag">타올쿤 신제품</span>' : ""}</div>
        <h2 class="product-name">${product.name}</h2>
        <p class="product-colors">색상 · ${product.color}</p>
        <div class="sale-row"><span class="sale-label">판매가</span>${sale}</div>
      </div>
      <details class="details"><summary>가격 전체 보기</summary><dl class="price-table">${priceDetails}</dl></details>
    </article>`;
  }).join("");
}

searchInput.addEventListener("input", renderProducts);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  renderProducts();
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter").forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
  });
});

renderProducts();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("앱 오프라인 저장을 시작하지 못했습니다.", error);
    });
  });
}
