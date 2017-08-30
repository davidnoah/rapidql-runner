'use babel';

import RapidqlRunnerView from './rapidql-runner-view';
import { CompositeDisposable } from 'atom';
import RapidQL from '../rapidql';
const util = require('util');
let fs = require('fs');

export default {

  rapidqlRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rapidqlRunnerView = new RapidqlRunnerView(state.rapidqlRunnerViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
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
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      let path = atom.project.getDirectories()[0].path;
      let options = JSON.parse(fs.readFileSync(path + '/options.rql', "utf8"));
      let query = fs.readFileSync(path + '/query.rql', "utf8");
      let context = JSON.parse(fs.readFileSync(path + '/context.rql', "utf8"));
      let rql = new RapidQL(options);

      rql.query(query, context)
      .then((response) => {
        this.modalPanel.item = this.rapidqlRunnerView.getElement(JSON.stringify(response, null, 4));
        return this.modalPanel.show();
      })
      .catch((error) => {
        console.log(error);
        return this.modalPanel.show();
      });
    }
  }

};
