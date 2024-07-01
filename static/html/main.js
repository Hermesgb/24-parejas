(() => {
  const tiempoContador = 1000; //En milisegundos
  const cards = document.querySelectorAll(".memory-card");
  const cardQty = cards.length;
  const marcador = {
    acierto: 0,
    aciertos: document.getElementById("aciertos"),
    cagadas: document.getElementById("cagadas"),
  };

  let hasFlippedCard, firstCard, secondCard, seconds;

  function flipCard() {
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    addPoint();
    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 400);
    addCagada();
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function resetGame() {
    function shuffle() {
      cards.forEach((card) => {
        let ramdomPos = Math.floor(Math.random() * cardQty);
        card.style.order = ramdomPos;
      });
    }

    hasFlippedCard = false;
    marcador.acierto = 0;
    marcador.cagada = 0;
    shuffle();
  }

  function addPoint() {
    marcador.acierto++;
    marcador.aciertos.innerText = marcador.acierto;
  }

  function addCagada() {
    marcador.cagada++;
    marcador.cagadas.innerText = marcador.cagada;
  }

  function startTimer() {

    function actualizarTiempo(seconds) {
        let tiempoTranscurrido = `${seconds}`;
        document.getElementById("game-timer").innerText = tiempoTranscurrido;
        console.log(`Contador segundos: ${seconds}`);        
    }


    function incrementarContador() {
      //Establecer intervalo
      seconds++;
      actualizarTiempo(seconds)
    }
    seconds = 0;
    timer = setInterval(incrementarContador, tiempoContador); //Comienzo del Tiempo
    //clearInterval(timer);
    actualizarTiempo(seconds)
  }

  (function startGame() {
    cards.forEach((card) => card.addEventListener("click", flipCard));
    resetGame();
    startTimer();
  })();
})();
