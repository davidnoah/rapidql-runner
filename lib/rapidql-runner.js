'use babel';

import RapidqlRunnerView from './rapidql-runner-view';
import { CompositeDisposable } from 'atom';
import RapidQL from '../rapidql';
import $ from 'jquery';

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

  openModal(message) {
    this.modalPanel.item = this.rapidqlRunnerView.getElement(JSON.stringify(message, null, 4));
    let closeButton = document.getElementById('close');

    closeButton.addEventListener('click', () => {
      this.modalPanel.hide();
    });

    return this.modalPanel.show();
  },

  query() {
    // Get current directory path
    let selected = $('.tree-view .selected');
    let path = atom.project.getDirectories()[0].path;
    let selectedPath;

    // check if user selected a query file
    if (selected[0]) {
      selectedPath = selected[0].getPath();
    } else {
      this.openModal('Error: you must select an RQL query file in your file tree');
      return;
    }

    // target three RQL files needed
    let query = fs.readFileSync(selectedPath, "utf8");
    let options = JSON.parse(fs.readFileSync(path + '/.rqloptions', "utf8"));
    let context = JSON.parse(fs.readFileSync(path + '/.rqlcontext', "utf8"));

    // initialize RapidQL
    let rql = new RapidQL(options);

    // preform query
    rql.query(query, context)
      .then((response) => {
        this.openModal(response);
      })
      .catch((error) => {
        this.openModal(error);
      });
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      return this.query();
    }
  }

};
