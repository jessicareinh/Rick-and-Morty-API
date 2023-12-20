import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=1"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    maxPage = data.info.pages; //Maximal erlaubte Seitenzahl aktualisieren

    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = ""; // Leeren des Containers vor dem Hinzufügen neuer Karten

    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });

    const paginationDisplay = document.querySelector('.navigation__pagination');
    paginationDisplay.textContent = `${page} / ${maxPage}`;

  } catch (error) {
    console.error("Error fetching character data:", error);
  }
}
//Event Listener für Next und Prev Button


nextButton.addEventListener('click', () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

fetchCharacters();
