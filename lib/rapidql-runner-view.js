'use babel';

export default class RapidqlRunnerView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('rapidql-runner');
    this.element.appendChild(this.createCloseButton());
  }

  createCloseButton() {
    let closeButtonContainer = document.createElement('div');
    closeButtonContainer.classList.add('close-container');

    let closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.id = 'close';
    closeButtonContainer.appendChild(closeButton);

    return closeButtonContainer;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  removeOldMessage() {
    const oldMessages = document.getElementsByTagName('pre');
    if (oldMessages.length === 1) {
      oldMessages[0].remove();
    }
  }

  addMessage(result) {
    if (result) {
      const message = document.createElement('pre');

      message.textContent = result;
      message.classList.add('message');
      this.element.appendChild(message);
    }
  }

  getElement(result) {
    // remove old message from a previous query
    this.removeOldMessage();

    // add new error or response to element
    this.addMessage(result);

    return this.element;
  }

}
