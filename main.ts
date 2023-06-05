import { App, MarkdownView, Plugin } from 'obsidian';

export default class VimCtrlDPlugin extends Plugin {
  handlerMap: Map<HTMLElement, boolean>;

  registerCtrlDHandlers() {
    const eventHandler = (event: Event) => {
      handleKeydown(event, this.app);
    };

    document.querySelectorAll('.cm-content').forEach((element: HTMLElement) => {
      if (!this.handlerMap.has(element)) {
        console.log('Registering event handler for', element.getText());
        this.registerDomEvent(element, 'keydown', eventHandler);
        this.handlerMap.set(element, true);
      }
    });
  }

  async onload() {
    console.log('Loading VimCtrlDPlugin ');
    this.handlerMap = new Map();

    this.app.workspace.onLayoutReady(() => {
      // Registering interval clears it on unLoad()
      this.registerInterval(window.setInterval(() => this.registerCtrlDHandlers(), 2 * 1000));
    });
  }

  onunload() {
    console.log('Unloading VimCtrlDPlugin ');
    this.handlerMap.clear();
  }
}

const handleKeydown = (event: Event, app: App) => {
  if (!(event instanceof KeyboardEvent)) {
    return;
  }

  if (event.ctrlKey && event.code == 'KeyD') {
    const view = app.workspace.getActiveViewOfType(MarkdownView);
    const editor = view?.editor;

    if (!editor) {
      return;
    }

    // @ts-expect-error - getConfig not part of public api
    const vimMode = app.vault.getConfig('vimMode');

    // @ts-expect-error - found insertMode through experimentation
    const insertMode = editor?.cm?.cm?.state?.vim?.insertMode;

    if (!vimMode || !insertMode) {
      return;
    }

    const lastLine = editor.lastLine();
    const lastCh = editor.getLine(lastLine).length;

    const curPos = editor.getCursor();
    const nextPos = {
      line: curPos.line,
      ch: curPos.ch + 1,
    };

    if (curPos.line == lastLine && nextPos.ch > lastCh) {
      return;
    }

    // delete next char
    editor.replaceRange('', curPos, nextPos);
  }
};
