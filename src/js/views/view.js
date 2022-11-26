import icons from 'url:../../img/icons.svg';

export default class View {
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._render(markup);
  }

  renderSpinner() {
    const markup = this._generateSpinner();
    this._render(markup);
  };

  renderError(message = this._errorMessage) {
    const markup = this._generateMessage(message, true);
    this._render(markup);
  }

  renderMessage(message) {
    const markup = this._generateMessage(message, false);
    this._render(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      //updates changed text
      if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
        currentElement.textContent = newElement.textContent;
      }
      //updates changed attributes
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attr => currentElement.setAttribute(attr.name, attr.value))
      }
    });
  }


  // Private Methods
  _render(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMessage(message, error = true) {
    return `
    <div class='${error ? 'error' : 'message'}'>
        <div>
          <svg>
            <use href='${icons}${error ? '#icon-alert-triangle' : '#icon-smile'}'></use>
          </svg>
        </div>
        <p>${message}</p>
      </div 
    `;
  }

  _generateSpinner() {
    return `
      <div class='spinner'>
        <svg>
        <use href='${icons}#icon-loader'></use>
      </svg>
    </div>
`;
  }
}