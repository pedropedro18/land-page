/* ---------- Configuração (muda estes dois valores) ---------- */
const NUMERO = "244923030010";
const FIM_OFERTA = new Date("2026-12-31T23:59:59");

/* ---------- 1. Quadrados dos 30 dias ---------- */
const dias = document.getElementById("dias");
for (let i = 1; i <= 30; i++) {
  const d = document.createElement("div");
  d.className = "dia" + (i === 30 ? " fim" : "");
  d.style.setProperty("--i", i);
  d.textContent = i === 30 ? "Falo!" : i;
  dias.appendChild(d);
}

/* ---------- 2. Menu hambúrguer ---------- */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  burger.setAttribute("aria-expanded", aberto);
});
menu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ---------- 3. Botões de plano abrem o WhatsApp ---------- */
document.querySelectorAll("[data-plano]").forEach(botao => {
  botao.addEventListener("click", () => {
    const msg = `Olá! Quero o plano ${botao.dataset.plano} do curso de Inglês A1.`;
    window.open(`https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
  });
});
document.getElementById("contacto-wa").href = `https://wa.me/${NUMERO}`;

/* ---------- 4. Contagem decrescente ---------- */
const contagem = document.getElementById("contagem");
function atualizar() {
  const falta = FIM_OFERTA - new Date();
  if (falta <= 0) { contagem.textContent = "oferta terminada"; return; }
  const d = Math.floor(falta / 86400000);
  const h = Math.floor(falta / 3600000) % 24;
  const m = Math.floor(falta / 60000) % 60;
  const s = Math.floor(falta / 1000) % 60;
  contagem.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
atualizar();
setInterval(atualizar, 1000);