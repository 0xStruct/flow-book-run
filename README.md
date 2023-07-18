# flow-book-run
_VSCode ext for 👍 FLOW DEVEX_

Run, learn, test, document, or play with Cadence, FCL and Flow CLI right inside the most loved VS Code.
Imagine Jupyter Notebook, JS Fiddle, etc, but for Flow development.

Work on this project is inspired by the web-based Flow Playground's ease-of-use but is itched by its quirks and limitations.
Now with _FLOW BOOK 📓 RUN 🏃_ **DEVEX** of the Playground is more stable, portable and seamless within day-to-day developer workflows.

_FLOW BOOK 📓 RUN 🏃_ is currently made of 2 VS Code extensions

- _FLOW RUN 🏃_

https://github.com/0xStruct/flow-book-run/tree/main/vscode-flow-run
This extension is to run and document Cadence (.cdc) scripts and transactions right within editor with just a click.
This is inspired by how the Playground enable testing of scripts and transactions. 
In _FLOW RUN 🏃_ these .cdc scripts and transactions can be triggered with a single-click and these triggers' parameters can be documented right with the respective .cdc files.
_FLOW RUN 🏃_ leverages `flow.json` configs well as it is tapping into `Flow CLI`.

- _FLOW BOOK 📓_ 

https://github.com/0xStruct/flow-book-run/tree/main/vscode-flow-notebook
This extension is to document and run code interactively for Flow CLI commands, Javascripts using FCL.js, and Cadence scripts.
This is inspired by Jupyter notebooks; now with `.flowbook` code can be documented step-by-step interactively to onboard more new developers and to collaborate better among teams.
`.flowbook` are great for documentations and tutorials as `.markdown` blocks can be included among code blocks.
More enhancement macros for `FCL javascripts` and `Cadence scripts` can be implemented for convenience.

# How to get extensions

Install as `.vsix`. Read how to do it here: https://community.particle.io/t/how-to-install-a-vscode-extension-from-a-vsix-file/51014

Get `.vsix` of FLOW BOOK 📓 RUN 🏃
- https://github.com/0xStruct/flow-book-run/blob/main/vscode-flow-run/flow-run-1.0.0.vsix
- https://github.com/0xStruct/flow-book-run/blob/main/vscode-flow-notebook/flow-run-1.0.0.vsix

Or clone this repo

`code vscode-flow-run` 
then in VSCode press `F5` to open up editor window with the extension in debug mode.

`code vscode-flow-notebook` 
then in VSCode press `F5` to open up editor window with the extension in debug mode.




