import {
  window,
  ExtensionContext,
  TabInputText,
  workspace,
  ConfigurationTarget,
} from "vscode";

export function activate(context: ExtensionContext) {
  function deleteIdenticalTabs() {
    const tempListener = context.subscriptions.pop();
    let activeFile = window.activeTextEditor?.document;
    let activeTabGroup = window.tabGroups.activeTabGroup;

    function handleSingleLastTab() {
      workspace
        .getConfiguration("workbench.editor")
        .update("revealIfOpen", true, ConfigurationTarget.Global);

      if (!activeTabGroup.activeTab || !activeFile) {
        return;
      }

      window.tabGroups.close(activeTabGroup.activeTab);

      window.showTextDocument(activeFile);

      workspace
        .getConfiguration("workbench.editor")
        .update("revealIfOpen", false, ConfigurationTarget.Global);
    }

    window.tabGroups.all.forEach((tabGroup) =>
      tabGroup.tabs.forEach((tab) => {
        let tabInput = tab.input as TabInputText;

        if (!activeFile || !activeTabGroup) {
          return;
        }

        if (
          tabInput.uri.path === activeFile.fileName &&
          tabGroup !== activeTabGroup
        ) {
          if (tabGroup.tabs.length > 1) {
            return window.tabGroups.close(tab);
          } else {
            return handleSingleLastTab();
          }
        }
      })
    );
    context.subscriptions.push(tempListener!);
  }

  workspace
    .getConfiguration("workbench.editor")
    .update("revealIfOpen", false, ConfigurationTarget.Global);

  let listener = window.onDidChangeVisibleTextEditors((e) => {
    window.showErrorMessage("Cycle");
    deleteIdenticalTabs();
  });

  context.subscriptions.push(listener);
}
