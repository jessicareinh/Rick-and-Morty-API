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
// von const auf let geändert, damit die variable veränderbar ist
let maxPage = 42;
let page = 1;
let searchQuery = "";

searchBar.addEventListener("submit", (event) => {
  event.preventDefault(); //verhindert das neu laden der seite beim absenden
  // searchQuery = searchBar.querySelector(".search-bar__input").value.trim();

  const formElements = event.target.elements;
  searchQuery = formElements.query.value;
  //searchQuery = event.target.elements.query.value
  //searchQuery = event.target.query.value
  fetchCharacters();
});

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Antwort:", data);

    maxPage = data.info.pages; //Maximal erlaubte Seitenzahl aktualisieren

    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = ""; // Leeren des Containers vor dem Hinzufügen neuer Karten

    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });

    const paginationDisplay = document.querySelector(".navigation__pagination");
    paginationDisplay.textContent = `${page} / ${maxPage}`;
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
  console.log("Aktuelle Seite:", page);
}
//Event Listener für Next und Prev Button

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

fetchCharacters();
