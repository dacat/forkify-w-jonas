'use strict';
import { API_URL } from './config';
import { getJSON } from './helpers';
import { RESULTS_PER_PAGE} from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};


export const loadRecipe = async function(id) {
  try {
    // 1) loading recipe
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResult = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.currentPage = 1;
    state.search.results = data.data.recipes.map(recipe => {
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    })
  } catch (error) {
    throw(error);
  }
};

export const getSearchResultsPage = function(page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  // remember slice is not inclusive
  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
  if (isFinite(newServings) && (newServings < 1)) return;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  })
  state.recipe.servings = newServings;
}

export const addBookmarks = function(recipe) {
  state.bookmarks.push(recipe);
}