const urlBase = "http://localhost:5271/api";

$(document).ready(function () {
  const reqObra = $.ajax({
    url: urlBase + "/Obra",
    type: "GET",
    contentType: "application/json",
  });
  const reqObraFinalizada = $.ajax({
    url: urlBase + "/Obra/finalizadas",
    type: "GET",
    contentType: "application/json",
  });
  const reqObraNaoFinalizada = $.ajax({
    url: urlBase + "/Obra/naofinalizadas",
    type: "GET",
    contentType: "application/json",
  });

  const reqCaixilho = $.ajax({
    url: urlBase + "/Caixilho",
    type: "GET",
    contentType: "application/json",
  });

  $.when(reqObra, reqCaixilho,reqObraFinalizada, reqObraNaoFinalizada).done(function (resObra, resCaixilho,resObraFinalizada,resObraNaoFinalizada) {
    const dadosObra = resObra[0];
    const dadosCaixilho = resCaixilho[0];
    const dadosObrasFinalizadas = resObraFinalizada[0];
    const dadosObrasNaoFinalizadas = resObraNaoFinalizada[0];
    const tempo_intervalo = 5;
    const tempo = 2000;
    
    const dados_demonstrativos = $(".dados_demostrativos");
    dados_demonstrativos.empty();

    const pesoTotal = dadosCaixilho.reduce(
      (soma, item) =>
        soma + parseInt(item.quantidade) * parseFloat(item.pesoUnitario),
      0
    );
    

    const item = `
      <div class="indicador-card">
        <div class="titulo">Obras Concluídas</div>
        <div class="conteudo">
            <div class="valor-container">
                <span class="valor counter-up" data-count-to="${dadosObrasFinalizadas.length}">d</span>
                <div class="subtexto">Neste mês</div>
            </div>
            <img src="./img/icons/bank.png" alt="" class="icons_dados">
        </div>
      </div>
      <div class="indicador-card">
        <div class="titulo">Caixilhos Produzidos</div>
        <div class="conteudo">
            <div class="valor-container">
                <span class="valor counter-up" data-count-to="${Math.round(pesoTotal)}"></span>
                <div class="subtexto">Toneladas</div>
            </div>
            <img src="./img/icons/weight.png" alt="" class="icons_dados">
        </div>
      </div>
       <div class="indicador-card">
          <div class="titulo">Obras Ativas</div>
          <div class="conteudo">
              <div class="valor-container">
                  <span class="valor counter-up " data-count-to="${dadosObrasNaoFinalizadas.length}">3</span>
                  <div class="subtexto">Obras em andamento</div>
              </div>
              <img src="./img/icons/verifica.png" alt="" class="icons_dados">
          </div>
          </div>
    `;

    dados_demonstrativos.append(item);

    // Animação dos contadores
    $('.counter-up').each(function () {
      let count_to = parseInt($(this).data('countTo'));
      let intervalos = tempo / tempo_intervalo;
      let incremento = count_to / intervalos;
      let valor = 0;
      let el = $(this);

      let timer = setInterval(function () {
        if (valor >= count_to) {
          valor = count_to;
          clearInterval(timer);
        }

        let texto = valor.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        el.text(texto);
        valor += incremento;
      }, tempo_intervalo);
    });

    // Carrossel
    const slides = $("#containeslide");
    slides.empty();
    const nomesExibidos = new Set();

    dadosObra.forEach((obra) => {
      dadosCaixilho.forEach((caixilho) => {
        if (nomesExibidos.has(obra.nome)) return;
        const item = `
          <li class="splide__slide" style="background-image: url(./img/heritage.jpg); border-radius: 16px; overflow: hidden;">
            <div class="slide-content">
              <div class="degrade">
                <h3>${obra.nome}</h3>
                <p>${obra.logradouro} ${obra.nro} - ${obra.bairro}</p>
                <p>Alumínio: ${caixilho.pesoUnitario * caixilho.quantidade} ton | Altura: ${caixilho.altura}</p>
              </div>
            </div>
          </li>
        `;
        nomesExibidos.add(obra.nome);
        slides.append(item);
      });
    });

    const splide = new Splide("#heritage-carousel", {
      type: "loop",
      perPage: 1,
      perMove: 1,
      autoplay: true,
      interval: 3000,
      gap: "1rem",
      breakpoints: {
        768: { perPage: 1 },
        1200: { perPage: 2 },
      },
    });

    splide.mount();
  });
});
