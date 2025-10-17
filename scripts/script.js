const urlBase = "http://localhost:5271/api";

$(document).ready(function () {
    // 1. Carregar os dados da API
    $.ajax({
        url: urlBase + "/Obra",
        type: "GET",
        contentType: "application/json",
        success: function (dados) {
            const slides = $('#containeslide');
            
            // Limpa o conteúdo (se houver slides estáticos) e insere os novos
            slides.empty(); 
            
            // Cria e insere os slides dinâmicos
            dados.forEach(obra => {
                const item = `   
                    <li class="splide__slide" style="background-image: url(./img/heritage.jpg); border-radius: 16px; overflow: hidden;">
                        <div class="slide-content">
                            <div class="degrade">
                                <h3>${obra.nome}</h3>
                                <p>${obra.logradouro}</p>
                                <p>Alumínio: 70 ton | Área: 20km</p>
                            </div>
                        </div>
                    </li>
                `;
                slides.append(item);
            });
            
            // 2. ***PONTO CHAVE: INICIALIZAÇÃO DA SPLIDE***
            // Inicializa a Splide SÓ AGORA, com os slides já no DOM.
            const splide = new Splide('#heritage-carousel', {
                // Suas opções de configuração da Splide
                type: 'loop',
                perPage: 1, // Exemplo, ajuste conforme seu layout
                perMove: 1,
                autoplay: true,
                interval: 3000,
                gap: '1rem', // Espaçamento entre os slides
                // Se precisar de responsividade, coloque aqui:
                breakpoints: { 
                    768: {
                        perPage: 1,
                    },
                    1200: {
                        perPage: 2,
                    }
                }
            });

            // Monta (cria) o carrossel, se não for feito automaticamente com 'new Splide'
            splide.mount();

        },
        error: function (erro) {
            console.log("Ocorreu um erro ao carregar as obras: " + erro);
        }
    });
});