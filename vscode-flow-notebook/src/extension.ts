import * as vscode from 'vscode';

import { MarkdownProvider, providerOptions } from './MarkdownProvider';
import { makeNotebookController, codeExecutor } from './CodeExecutor';

export function activate(context: vscode.ExtensionContext) {
	const provider = new MarkdownProvider();

	context.subscriptions.push(
		vscode.commands.registerCommand('flow-notebook.newNotebook', async () => {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor) {
				for (const selection of activeEditor.selections ?? []) {
					const selectedCode = activeEditor.document.getText(new vscode.Range(selection.start, selection.end));
					const selectedLang = activeEditor.document.languageId;
					provider.setLastSelection({ code: selectedCode, lang: selectedLang });
				}
			}
			await vscode.commands.executeCommand('workbench.action.files.newUntitledFile', { "viewType": "flow-notebook" });
		}),

		vscode.workspace.registerNotebookSerializer('flow-notebook', provider, providerOptions),
		vscode.workspace.registerNotebookSerializer('flow-notebook-md', provider, providerOptions),

		makeNotebookController('flow-kernel', 'flow-notebook', 'Flow Kernel', codeExecutor(context)),
		makeNotebookController('flow-kernel-md', 'flow-notebook-md', 'Flow Kernel (Markdown)', codeExecutor(context)),
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
