import { useEffect, useState } from "react";
import "./App.css";

const NUMERO = "244923030010";
const FIM_OFERTA = new Date("2026-12-31T23:59:59");

const LINKS = [
  ["inicio", "Início"],
  ["beneficios", "Benefícios"],
  ["precos", "Preços"],
  ["contacto", "Contacto"],
];

const BENEFICIOS = [
  ["Aulas curtas", "Vídeos e exercícios de 15 minutos. Cabem na pausa do trabalho ou no caminho para casa."],
  ["Fala desde o dia 1", "Praticas frases reais: cumprimentar, pedir, comprar e apresentar-te."],
  ["Dúvidas no WhatsApp", "Enviaste uma pergunta? Recebes resposta do professor no mesmo dia."],
];

const PLANOS = [
  {
    nome: "Básico",
    preco: "15.000 Kz",
    itens: ["30 aulas em vídeo", "Exercícios em PDF", "Acesso por 3 meses"],
    classe: "plano",
    botao: "btn wa",
  },
  {
    nome: "Completo",
    preco: "25.000 Kz",
    itens: ["Tudo do plano Básico", "Dúvidas no WhatsApp", "Correção de exercícios", "Certificado final"],
    classe: "plano destaque",
    botao: "btn",
  },
  {
    nome: "VIP",
    preco: "45.000 Kz",
    itens: ["Tudo do plano Completo", "4 aulas ao vivo", "Acesso para sempre"],
    classe: "plano",
    botao: "btn wa",
  },
];

const DEPOIMENTOS = [
  ["Nunca tinha estudado inglês. No fim do mês já conseguia apresentar-me numa entrevista.", "Ana, Luanda"],
  ["As aulas são curtas e as respostas no WhatsApp ajudam muito. Recomendo.", "Carlos, Benguela"],
];

const FAQ = [
  ["Preciso de saber inglês antes?", "Não. O curso começa do zero, no nível A1."],
  ["Quanto tempo devo estudar por dia?", "15 minutos de aula, mais 10 minutos de exercícios."],
  ["Como pago?", "Clicas no plano, falas connosco no WhatsApp e combinamos o pagamento."],
];

function useContagem(fim) {
  const calcular = () => {
    const falta = fim - new Date();
    if (falta <= 0) return "oferta terminada";
    const d = Math.floor(falta / 86400000);
    const h = Math.floor(falta / 3600000) % 24;
    const m = Math.floor(falta / 60000) % 60;
    const s = Math.floor(falta / 1000) % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };
  const [texto, setTexto] = useState(calcular);
  useEffect(() => {
    const id = setInterval(() => setTexto(calcular()), 1000);
    return () => clearInterval(id);
  }, []);
  return texto;
}

function abrirWhatsApp(plano) {
  const msg = `Olá! Quero o plano ${plano} do curso de Inglês A1.`;
  window.open(`https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
}

function Header() {
  const [aberto, setAberto] = useState(false);
  return (
    <header>
      <div className="container barra">
        <a className="logo" href="#inicio">Inglês<span>30</span></a>
        <button
          className="burger"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          onClick={() => setAberto(!aberto)}
        >
          ☰
        </button>
        <nav className={aberto ? "aberto" : ""} aria-label="Principal">
          <ul>
            {LINKS.map(([id, texto]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setAberto(false)}>{texto}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div>
          <h1>Em 30 dias, já falas inglês.</h1>
          <p>Curso A1 para iniciantes: 15 minutos de aula por dia e um professor a responder às tuas dúvidas no WhatsApp.</p>
          <a className="btn" href="#precos">Quero começar</a>
          <small>Aulas online. Estuda ao teu ritmo, no telemóvel.</small>
        </div>
        <div>
          <div className="dias" aria-hidden="true">
            {Array.from({ length: 30 }, (_, k) => k + 1).map((i) => (
              <div key={i} className={"dia" + (i === 30 ? " fim" : "")} style={{ "--i": i }}>
                {i === 30 ? "Falo!" : i}
              </div>
            ))}
          </div>
          <p className="legenda">Um quadrado por dia. No dia 30, já falas.</p>
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  return (
    <section className="beneficios" id="beneficios">
      <div className="container">
        <h2>Aprende um pouco todos os dias</h2>
        <div className="lista-ben">
          {BENEFICIOS.map(([titulo, texto]) => (
            <article key={titulo}>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Precos() {
  const contagem = useContagem(FIM_OFERTA);
  return (
    <section id="precos">
      <div className="container">
        <h2>Escolhe o teu plano</h2>
        <div className="oferta">Oferta termina em <span id="contagem">{contagem}</span></div>
        <div className="planos">
          {PLANOS.map((p) => (
            <div key={p.nome} className={p.classe}>
              <h3>{p.nome}</h3>
              <div className="preco">{p.preco}</div>
              <ul>
                {p.itens.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button className={p.botao} onClick={() => abrirWhatsApp(p.nome)}>
                Quero o plano {p.nome}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  return (
    <section className="depoimentos">
      <div className="container">
        <h2>Quem já estudou</h2>
        <div className="dep-grid">
          {DEPOIMENTOS.map(([texto, autor]) => (
            <blockquote key={autor}>
              “{texto}”
              <footer>{autor}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq">
      <div className="container">
        <h2>Perguntas frequentes</h2>
        {FAQ.map(([pergunta, resposta]) => (
          <details key={pergunta}>
            <summary>{pergunta}</summary>
            <p>{resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="rodape" id="contacto">
      <div className="container">
        <div>
          <strong>Inglês30</strong><br />
          Luanda, Angola
        </div>
        <div>
          WhatsApp: <a href={`https://wa.me/${NUMERO}`}>+244 923 030 010</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Precos />
        <Depoimentos />
        <Faq />
      </main>
      <Rodape />
    </>
  );
}