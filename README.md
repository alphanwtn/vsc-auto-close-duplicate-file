# Auto-Close Duplicate File for VS Code

This is the README for the Visual Studio Code extension "auto-close-duplicate-file". This extension automatically closes duplicate tabs when you open a file that is already open in another tab. This prevents you from having multiple copies of the same file open in different sub-screens.

## Features

- Automatically closes duplicate tabs when you open a file that is already open in another tab.

## Requirements

- Visual Studio Code version 1.83.0 or later

## Known Issues

When you try to open a file in a tab, and that file is already open in a single-tab screen, the already opened tab will blink and freeze for one second before the focus is moved to it. This is because the `window.showTextDocument()` API is very slow.

## How to Use

To use the extension, simply install it from the Visual Studio Code Marketplace. Once installed, you can enable or disable it in the **Extensions** view.

To close a duplicate tab, simply open the file that is already open in another tab. The extension will automatically close the duplicate tab.

## Feedback

I appreciate any feedback you have on this extension. Please feel free to create an issue on GitHub or send me an email ❤️.
