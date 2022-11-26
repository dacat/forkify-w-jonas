import PreviewView from './previewView';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)'
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev=>window.addEventListener(ev, handler));
  }
}

export default new BookmarksView();