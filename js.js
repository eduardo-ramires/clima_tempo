

var grausMax = null
var grausMin = null
var prob = null
var descricao = null
var icon = null
var cidade = null
var sunset = null
var sunrise = null
var vento = null
var lua = null
var visibilidade = null
var cityInput = null

document.addEventListener("DOMContentLoaded", search(true));

 function search(num) {
  num == true ? cityInput ="brasil" : cityInput = document.getElementById('cityInput').value.replace(/\s/g, '');
      fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +cityInput + '?key=QMN8JGBAF56D8TDT6EVB9QSWP&lang=pt')
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

      if (data.days[i].moonphase >=0.75){
        lua = "Minguante"
      }else if (data.days[i].moonphase >=0.50){
        lua = "Cheia"
      }else if(data.days[i].moonphase >=0.25){
        lua = "Crescente"
      }else{
        lua = "Nova"
      }

      grausMax = ((data.days[i].tempmax) - 32) * 5/9;
      grausMin = ((data.days[i].tempmin) - 32) * 5/9;
      prob = data.days[i].precipprob
      descricao = data.days[i].description
      icon = data.days[i].icon
      dia = data.days[i].datetime.slice(-2)
      sunset = data.days[i].sunset.slice(0, 5)
      sunrise = data.days[i].sunrise.slice(0, 5)
      vento = data.days[i].windspeed 
      visibilidade = data.days[i].visibility
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
    <div value="${i}" class="card-footer card_${i}">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <div class="col-1">
              <span class="variables-border-identifier sol"></span>
            </div>
            <div class="col-7 ">
              <div class="row" >
                <div class="col-12 "style="margin-left: -0.938rem;">
                  <h6>Sol</h6>
                </div>
                <div class="col-12" id="min" style="margin-left: -0.938rem;">
                  <img src="2nd Set - Color/sunset.png" style="width: 2rem;" alt=""> <small>${sunrise}-${sunset}</small>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <div class="col-1">
              <span class="variables-border-identifier vento"></span>
            </div>
            <div class="col-7 ">
              <div class="row" >
                <div class="col-12 "style="margin-left: -0.938rem;">
                  <h6>Vento</h6>
                </div>
                <div class="col-12" id="min" style="margin-left: -0.938rem;">
                  <i class="fa-solid fa-wind fa-xl"></i>
                  ${vento} Km/h
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <div class="col-1">
              <span class="variables-border-identifier lua"></span>
            </div>
            <div class="col-7 ">
              <div class="row" >
                <div class="col-12 "style="margin-left: -0.938rem;">
                  <h6>${lua}</h6>
                </div>
                <div class="col-12" id="min" style="margin-left: -0.938rem;">
                  <i class="fa-regular fa-moon fa-xl"></i>
                   Cheia
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <div class="col-1">
              <span class="variables-border-identifier visibilidade"></span>
            </div>
            <div class="col-7 ">
              <div class="row" >
                <div class="col-12 "style="margin-left: -0.938rem;">
                  <h6>Visibilidade</h6>
                </div>
                <div class="col-12" id="min" style="margin-left: -0.938rem;">
                  <i class="fa-solid fa-eye fa-xl"></i>
                  ${visibilidade}KM
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    </div>

      `;

      cardContainer.append(card);
    }
    $(".card-footer").hide()
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