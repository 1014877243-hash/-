const factories = [
  {
    name: "XX家具厂",
    code: "DXS-2026-0001",
    phoneLast4: "6688",
    region: "广东省",
    category: "颗粒板 / 多层板 / 欧松板",
    valid: "2026.01.01 - 2026.12.31"
  },
  {
    name: "大雪杉示范合作工厂",
    code: "DXS-2026-0002",
    phoneLast4: "2026",
    region: "浙江省",
    category: "生态板 / 净芯板 / 全能多层板",
    valid: "2026.03.01 - 2027.02.28"
  },
  {
    name: "华南板材加工中心",
    code: "DXS-2026-0003",
    phoneLast4: "8899",
    region: "广东省",
    category: "多层板 / 实木板",
    valid: "2026.02.15 - 2027.02.14"
  }
];

function findFactory(keyword, phoneLast4, region) {
  const text = (keyword || "").trim().toLowerCase();
  const phone = (phoneLast4 || "").trim();
  const area = (region || "").trim();

  return factories.find((factory) => {
    const textMatch = text
      ? factory.name.toLowerCase().includes(text) || factory.code.toLowerCase() === text
      : true;
    const phoneMatch = phone ? factory.phoneLast4 === phone : true;
    const regionMatch = area ? factory.region === area : true;
    return textMatch && phoneMatch && regionMatch && (text || phone || area);
  });
}

function successMarkup(factory) {
  return `
    <div class="result success">
      <h3>查询结果：已授权</h3>
      <dl class="info-list">
        <div><dt>工厂名称</dt><dd>${factory.name}</dd></div>
        <div><dt>授权编号</dt><dd>${factory.code}</dd></div>
        <div><dt>授权地区</dt><dd>${factory.region}</dd></div>
        <div><dt>授权品类</dt><dd>${factory.category}</dd></div>
        <div><dt>有效期</dt><dd>${factory.valid}</dd></div>
      </dl>
      <div class="notice">官方提示：该工厂为大雪杉品牌授权合作工厂，请认准官方授权信息。</div>
    </div>
  `;
}

function failMarkup() {
  return `
    <div class="result fail">
      <h3>暂未查询到该工厂授权信息</h3>
      <p>请核对工厂名称或授权编号是否正确。如需进一步确认，请联系大雪杉官方客服。</p>
    </div>
  `;
}

function runQuery(form) {
  const keyword = form.querySelector("[name='keyword']")?.value || "";
  const phoneLast4 = form.querySelector("[name='phoneLast4']")?.value || "";
  const region = form.querySelector("[name='region']")?.value || "";
  const target = document.querySelector(form.dataset.resultTarget || "#queryResult");
  const factory = findFactory(keyword, phoneLast4, region);

  if (!target) return;
  target.innerHTML = factory ? successMarkup(factory) : failMarkup();
}

document.querySelectorAll("[data-query-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runQuery(form);
  });
});
