import { window, commands, TextDocument, ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  function deleteOtherSameTabs() {
    let currentActiveTab = window.activeTextEditor?.document.fileName;
    let tabGroups = window.tabGroups.all.map((tabGroup) =>
      tabGroup.tabs.map((tab) => tab.label)
    );
    window.showInformationMessage(
      currentActiveTab + "--------------------------" + tabGroups
    );

    window.tabGroups.close(window.tabGroups.all[0]);
  }

  let listener = window.onDidChangeActiveTextEditor((e) =>
    deleteOtherSameTabs()
  );

  let disposable = commands.registerCommand(
    "auto-close-duplicate-file.helloWorld",
    () => {
      window.showInformationMessage(
        "This is the current active editor" +
          window.activeTextEditor?.document.fileName +
          "/// All opened tabs\n" +
          window.tabGroups.all.map(
            (tabGroup, index) =>
              index.toString() + tabGroup.tabs.map((tab) => tab.label)
          )
      );
    }
  );

  context.subscriptions.push(listener);
  context.subscriptions.push(disposable);
}
