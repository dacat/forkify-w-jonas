import View from './view';
import icons from 'url:../../img/icons.svg'

export default class PreviewView extends View {

  _generateMarkup() {
    return this._data.map(res => this._generateSearchResultMarkup(res) ).join('\n')
  }

  _generateSearchResultMarkup(result) {
    const currentRecipeId = window.location.hash.slice(1);
    return `<li class="preview">
        <a class="preview__link ${currentRecipeId === result.id ? 'preview__link--active' : '' }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title.length > 15 ?  result.title.slice(0,15) + '...' : result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
             <div class="preview__user-generated ">
        <svg class = "${result.key ? '' : 'hidden'}">
          <use href="${icons}#icon-user"></use>
        </svg>
      </div> 
      </div>
      </a>
      </li> `
  }
}
