'use babel';

export default class RapidqlRunnerView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('rapidql-runner');

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement(result) {
    // console.log(this.element.lastChild.className);
    // if (this.element.lastChild.className === 'pre') {
    //   this.element.lastChild.remove();
    // }
    const message = document.createElement('pre');

    message.textContent = result;
    message.classList.add('message');
    this.element.appendChild(message);
    return this.element;
  }

}
