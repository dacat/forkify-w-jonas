class SearchView {
  #parentEl = document.querySelector('.search');
  #searchQuery = ''
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', evt => {
      evt.preventDefault();
      handler();
    });
  }

  getSearchQuery(){
    this.#searchQuery = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return this.#searchQuery;
  }

  #clearInput(){
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();