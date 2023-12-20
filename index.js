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
const maxPage = 1;
const page = 1;
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

    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = ""; // Leeren des Containers vor dem Hinzufügen neuer Karten

    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
}

fetchCharacters();
