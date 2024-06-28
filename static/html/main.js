(() => {
  const cards = document.querySelectorAll(".memory-card");
  const marcador = {
    acierto: 0,
    aciertos: document.getElementById("aciertos"),
    cagadas: document.getElementById("cagadas"),
  };

  const cardQty = cards.length;

  let hasFlippedCard, firstCard, secondCard;

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

  (function startGame() {
    cards.forEach((card) => card.addEventListener("click", flipCard));
    resetGame();
  })();
})();
