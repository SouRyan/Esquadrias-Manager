const urlBase = "http://localhost:5271/api";

$(document).ready(function () {
    const reqObra = $.ajax({
        url: urlBase + "/Obra",
        type: "GET",
        contentType: "application/json"
    });

    const reqCaixilho = $.ajax({
        url: urlBase + "/Caixilho",
        type: "GET",
        contentType: "application/json"
    });

    $.when(reqObra, reqCaixilho).done(function (resObra, resCaixilho) {
        const dadosObra = resObra[0];
        const dadosCaixilho = resCaixilho[0];

        const slides = $('#containeslide');
        slides.empty();
        const nomesExibidos = new Set();
        // Para cada obra, encontrar os caixilhos correspondentes
        dadosObra.forEach(obra => {

            dadosCaixilho.forEach(caixilho => {
               if (nomesExibidos.has(obra.nome)) return;
            const item = `   
                    <li class="splide__slide" style="background-image: url(./img/heritage.jpg); border-radius: 16px; overflow: hidden;">
                        <div class="slide-content">
                            <div class="degrade">
                                <h3>${obra.nome}</h3>
                                <p>${obra.logradouro} ${obra.nro} - ${obra.bairro}</p>
                                <p>Alumínio: ${(caixilho.pesoUnitario) * (caixilho.quantidade)} ton | Altura: ${caixilho.altura}</p>
                            </div>
                        </div>
                    </li>
                `;
                // @($"{item.Logradouro} {item.Nro} {item.Bairro} {item.Uf} {item.Cep}")
                nomesExibidos.add(obra.nome); 
                slides.append(item);
           })
        });

        const splide = new Splide('#heritage-carousel', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 3000,
            gap: '1rem',
            breakpoints: {
                768: { perPage: 1 },
                1200: { perPage: 2 }
            }
        });

        splide.mount();
    });
});
