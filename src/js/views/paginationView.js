import icons from 'url:../../img/icons.svg'
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }
  /**
   * Data incoming should be the search from the model.state object
   * @private
   */
  _generateMarkup(){
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages);
    const currentPage = this._data.currentPage;
    // Page 1 and no other pages
    if (numPages <= 1) return '';
    // Page 1 and there are other pages
    if (currentPage === 1) return this._generateNextArrow(2)
    // Last page
    if (currentPage === numPages) return this._generatePrevArrow(numPages - 1)
    // Other page
    return `${this._generatePrevArrow(currentPage - 1)} ${this._generateNextArrow(currentPage + 1)}`
  }

  _generatePrevArrow(page){
   return `<button data-goto=${page} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>`
  }
  _generateNextArrow(page){
   return `
      <button data-goto=${page} class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> `
  }
}

export default new PaginationView();