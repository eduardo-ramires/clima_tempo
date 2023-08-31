

var grausMax = null
  var grausMin = null
  var prob = null
  var descricao = null
  var icon = null
  var cidade = null

 function search() {
    var cityInput = document.getElementById('cityInput');
    console.log("1")
      var city = cityInput.value.replace(/\s/g, '');
      fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +city + '?key=QMN8JGBAF56D8TDT6EVB9QSWP&lang=pt')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Aqui você pode trabalhar com os dados recebidos
        mudaValores(data)
        $(".weather-container").hide()
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  function mudaValores(data){
    $(".card").remove();
    cidade = data.resolvedAddress
    var cardContainer = $(".card-container");

    var card = `
      <div class="card mt-5">
        <div class="card-header">
          <h4>Previsão para ${cidade} para os proximos dias</h4>
        </div>`;

    cardContainer.append(card);
  
    for (var i = 0; i <= 6; i++) {
      
      grausMax = ((data.days[i].tempmax) - 32) * 5/9;
      grausMin = ((data.days[i].tempmin) - 32) * 5/9;
      prob = data.days[i].precipprob
      descricao = data.days[i].description
      icon = data.days[i].icon
      dia = data.days[i].datetime.slice(-2)
      console.log(icon)
      var cardContainer = $(".card-container");

      var card = `<div class="card">
      <div class="card-body border border-light">
      <div class="row">
        <div class="col-1">
          <div class="row">
            <div class="col-12">
              <small style="font-size: 0.7rem;">Dia</small>
            </div>
            <div class="col-12">
              <h5 id="dia">${dia}</h5>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="row">
            <div class="col-5">
              <img src="2nd Set - Color/${icon}.png" alt="">
            </div>
            <div class="col-7 mt-1">
              <div class="row">
                <div class="col-4 ">
                  <i class="fa-solid fa-arrow-down" style="color: rgb(71, 71, 244);"></i>
                </div>
                <div class="col-8" id="min">${Math.round(grausMin)}º
                </div>
                <div class="col-4">
                  <i class="fa-solid fa-arrow-up" style="color: red;"></i>
                </div>
                <div class="col-8" id="max">${Math.round(grausMax)}º
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1">
          <div class="row">
            <div class="col-12">
              <i class="fa-solid fa-cloud-rain fa-xl"></i>
            </div>
            <div class="col-12 mt-2" id="prob"> ${prob}%
            </div>
          </div>
        </div>
        <div class="col-7 mt-3" id="descricao">${descricao}
        </div>
        <div class="col-1 mt-3">
          <button class="btn mais${i}" onclick="mais(${i})"><i class="fa-solid fa-chevron-down"></i></button>
          <button class="btn menos${i}" onclick="menos(${i})" style="display: none;"><i class="fa-solid fa-chevron-up" ></i></button>
        </div>
      </div>
    </div>
    <div value="${i}" class="card-footer card_${i} text-muted" style="display: none;">
    2 days ago
  </div>
    </div>

      `;

      cardContainer.append(card);
    }
  }

function mais(num){
  $(`.card_${num}`).show()
  $(`.mais${num}`).hide()
  $(`.menos${num}`).show()
}

function menos(num){
  $(`.card_${num}`).hide()
  $(`.menos${num}`).hide()
  $(`.mais${num}`).show()
}