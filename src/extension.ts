import { window, ExtensionContext, TabInputCustom, TabInputText } from "vscode";

export function activate(context: ExtensionContext) {
  function deleteOtherSameTabs() {
    let activeFile = window.activeTextEditor?.document.fileName;
    let activeTabGroup = window.tabGroups.activeTabGroup;

    if (!activeFile || !activeTabGroup) {
      return;
    }

    window.tabGroups.all.forEach((tabGroup) =>
      tabGroup.tabs.forEach((tab) => {
        let tabInfos = tab.input as TabInputText;

        if (tabInfos.uri.path === activeFile && tabGroup !== activeTabGroup) {
          window.tabGroups.close(tab);
        }
      })
    );
  }

  let listener = window.onDidChangeVisibleTextEditors(() =>
    deleteOtherSameTabs()
  );

  context.subscriptions.push(listener);
}
