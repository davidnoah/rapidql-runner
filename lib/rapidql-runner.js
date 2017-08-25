'use babel';

import RapidqlRunnerView from './rapidql-runner-view';
import { CompositeDisposable } from 'atom';
import RapidQL from '../rapidql';
let fs = require('fs');

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
    let directories = atom.project.getDirectories();
    console.log(directories);
    let options = JSON.parse(fs.readFileSync('./options.rql', "utf8"));
    let query = fs.readFileSync('./query.rql', "utf8");
    let context = JSON.parse(fs.readFileSync('./context.rql', "utf8"));
    let rql = new RapidQL(options);
    console.log(options);
    console.log(query);
    console.log(context);
    rql.query(query, context)
      .then((response) => {
        console.log(response);
        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
      })
      .catch((error) => {
        console.log(error);
        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
      });
  }

};
