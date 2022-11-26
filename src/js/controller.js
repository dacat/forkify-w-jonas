import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import 'core-js/stage';
import 'regenerator-runtime/runtime';

// // hot module reloading
// if (module.hot) {
//   module.hot.accept() ;
// }
// // from parcel

/**
 * Main controller for the Forkify App.
 *
 * API documentation is at https://forkify-api.herokuapp.com/
 * Bridges the view (recipeView) and the model (model).
 * @returns {Promise<void>}
 */
const controlRecipes = async function() {
  try {
    const recipeHash = window.location.hash.slice(1)
    if(!recipeHash) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark the current selected
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1) Loading Recipe
    await model.loadRecipe(recipeHash);

    // 2) rendering Recipe
    const {recipe} = model.state
    recipeView.render(recipe);
  } catch (error) {
    console.log(error)
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getSearchQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResult(query)
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search)
  } catch (error) {
    resultsView.renderError();
  }
}
const controlServings = function(newServings =8) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlPagination = function(page) {
  resultsView.render(model.getSearchResultsPage(page))
  paginationView.render(model.state.search)
}

const controlAddBookMark = function() {
  // Add/Remove bookmarks
  if(!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks)

}
/**
 * other half of the pub-sub paradigm
 */
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();