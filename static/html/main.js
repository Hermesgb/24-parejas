function flipCard() {
    this.classList.toggle('flip');
  }
  
  const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => card.addEventListener('click', flipCard));