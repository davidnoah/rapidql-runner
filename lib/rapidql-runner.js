'use babel';

import RapidqlRunnerView from './rapidql-runner-view';
import { CompositeDisposable } from 'atom';

export default {

  rapidqlRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rapidqlRunnerView = new RapidqlRunnerView(state.rapidqlRunnerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rapidqlRunnerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rapidql-runner:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rapidqlRunnerView.destroy();
  },

  serialize() {
    return {
      rapidqlRunnerViewState: this.rapidqlRunnerView.serialize()
    };
  },

  toggle() {
    console.log('RapidqlRunner was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
