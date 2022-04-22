const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-button');

const trapFocus = (element, prevFocusableElement = document.activeElement) => {
  const focusableElements =
    '[href], button, textarea, input, select, [tabindex]';
  const priorityElements = '.dialog-priority';

  const priorityContent = element.querySelectorAll(priorityElements);
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
  const closeBtn = element.querySelector('.close-button');

  const handleKeyDown = (e) => {
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  };

  const handleClose = () => {
    console.log(element.returnValue);
    document.removeEventListener('keydown', handleKeyDown, true);
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeBtnHandler, true);
    }
    prevFocusableElement.focus();
  };

  element.addEventListener('close', handleClose, { once: true, capture: true });
  document.addEventListener('keydown', handleKeyDown, true);

  const closeBtnHandler = () => {
    element.close('closed');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeBtnHandler, true);
  }

  if (priorityContent[0]) {
    priorityContent[0].focus();
  }
};

openModal.addEventListener('click', () => {
  modal.showModal();
  trapFocus(modal);
});

// https://css-tricks.com/replace-javascript-dialogs-html-dialog-element/
