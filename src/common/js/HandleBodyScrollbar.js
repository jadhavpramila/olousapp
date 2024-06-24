
export function disableScrollbar(currentScrollbarPosition) {
    document.body.classList.add('body-disable-scrollbar')
    document.body.style.top =`-${currentScrollbarPosition}px`;
}

export function enableScrollbar(setScrollbarPosition) {
    document.body.classList.remove('body-disable-scrollbar')
    document.body.style.top = '';
    window.scrollTo(0, parseInt(setScrollbarPosition || '0'));
}
  