import {
  window,
  ExtensionContext,
  TabInputText,
  workspace,
  ConfigurationTarget,
} from "vscode";

export function activate(context: ExtensionContext) {
  function setRevealIfOpen(state: boolean) {
    workspace
      .getConfiguration("workbench.editor")
      .update("revealIfOpen", state, ConfigurationTarget.Global);
  }

  function deleteIdenticalTabs() {
    let activeFile = window.activeTextEditor?.document;
    let activeTabGroup = window.tabGroups.activeTabGroup;

    if (!activeFile || !activeTabGroup) {
      return;
    }

    async function handleSingleTab() {
      if (activeTabGroup.activeTab && activeFile) {
        setRevealIfOpen(true);
        await window.tabGroups.close(activeTabGroup.activeTab);
        window.showTextDocument(activeFile);
        setRevealIfOpen(false);
      }
    }

    function searchAndCloseDuplicate() {
      window.tabGroups.all.forEach((tabGroup) =>
        tabGroup.tabs.forEach((tab) => {
          let tabInput = tab.input as TabInputText;

          if (
            tabInput.uri.path === activeFile!.uri.path &&
            tabGroup !== activeTabGroup
          ) {
            if (tabGroup.tabs.length > 1) {
              window.tabGroups.close(tab);
            } else {
              handleSingleTab();
            }
          }
        })
      );
    }

    searchAndCloseDuplicate();
  }

  let listener = window.onDidChangeVisibleTextEditors(() => {
    deleteIdenticalTabs();
  });

  setRevealIfOpen(false);
  context.subscriptions.push(listener);
}
