import { window, ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  function deleteOtherSameTabs() {
    let currentActiveFile = window.activeTextEditor?.document.fileName;
    let currentTabGroup = window.tabGroups.activeTabGroup;

    if (!currentActiveFile || !currentTabGroup) {
      return;
    }

    window.tabGroups.all.forEach((tabGroup) =>
      tabGroup.tabs.forEach((tab) => {
        let tabInfos = tab.input as any;

        if (
          tabInfos.uri.path === currentActiveFile &&
          tabGroup !== currentTabGroup
        ) {
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
