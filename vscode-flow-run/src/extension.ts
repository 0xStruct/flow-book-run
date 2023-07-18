import * as vscode from 'vscode';
import { CodelensProvider } from './CodelensProvider';

let disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {

	const codelensProvider = new CodelensProvider();
	vscode.languages.registerCodeLensProvider("*", codelensProvider);

	vscode.commands.registerCommand("flow-run.LensAction", (args: any) => {
		vscode.window.showInformationMessage(`Flow Run action clicked with code: ${args}`);

		runCurrentLine(args);
	});

	let command = vscode.commands.registerCommand('flow-run.RunCdc', () => {

		runCurrentLine("");
	});

	context.subscriptions.push(command);
}

function runCurrentLine(currentLine: string) {
	//Save file 
	vscode.window.activeTextEditor?.document.save();

	//Check if workspace is trusted
	if (vscode.workspace.isTrusted) {
		//get the file
		var path: String = vscode.window.activeTextEditor?.document.fileName + "";
		var fileName: String = path.substring(path.lastIndexOf("\\") + 1, path.length);
		console.log("fileName: ", fileName);

		var cwd = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor?.document.uri!)?.uri.fsPath;
		var relativeFileName = fileName.replace(cwd + "", '');
		console.log("relativeFileName: ", relativeFileName);

		// seach for the terminal which runs code and dispose them
		vscode.window.terminals.forEach(element => {
			if (element !== null && element.name.includes("Run " + relativeFileName)) {
				element.dispose();
			}
		});

		//create terminal called "Run {filename}"
		var term = vscode.window.createTerminal("Run " + relativeFileName);

		//get the command for the file ending
		//var command: String = getCommand(path) + " ";
		//console.log("command: ", command);

		//get the code line
		var code = "";
		if(currentLine === "") {
			code = getCurrentLine(vscode.window.activeTextEditor!)?.trim() + "";
		} else {
			code = currentLine;
		}
		console.log("code: ", code);

		// here parse text and prepare for flow cli
		if (code.startsWith('//RUN TX') || code.startsWith('//RUN SX')) {

			if(code.startsWith('//RUN TX')) {
				code = code.replace('//RUN TX', `flow transactions send .${relativeFileName}`);
			}

			if(code.startsWith('//RUN SX')) {
				code = code.replace('//RUN SX', `flow scripts execute .${relativeFileName}`);
			}

			term.sendText(code);

			//show the terminal
			term.show();

			//Show the it is running
			vscode.window.showInformationMessage("Running " + fileName);
		} else {
			vscode.window.showErrorMessage("Code needs to start with //RUN TX or //RUN SX");
		}

	} else {
		vscode.window.showErrorMessage("Workspace isn't trusted.");
	}
}

/*function getCommand(path: String) {
	console.log("path", path);
	var config = vscode.workspace.getConfiguration("flow-run");
	var command = "";
	var exe = path.substring(0, path.lastIndexOf(".")) + ".exe";

	console.log("languageId", vscode.window.activeTextEditor?.document.languageId);
	command = config.get(vscode.window.activeTextEditor?.document.languageId + "") + "";

	while (command.includes("%File%")) {
		command = command.replace("%File%", path + "");
	}

	while (command.includes("%Dir%")) {
		command = command.replace("%Dir%", path.substring(0, path.lastIndexOf("\\")));
	}

	while (command.includes("%Exe%")) {
		command = command.replace("%Exe%", exe);
	}

	return command;
}*/

/*function getCode(textEditor: vscode.TextEditor) {
	if (!textEditor.selection) {
		console.log('no selection');
		return;
	} else if (
		textEditor.selection.start.line === textEditor.selection.end.line &&
		textEditor.selection.start.character === textEditor.selection.end.character
	) {
		return textEditor.document.lineAt(textEditor.selection.start.line).text;
	} else {
		return textEditor.document.getText(textEditor.selection);
	}
};*/

function getCurrentLine(textEditor: vscode.TextEditor) {
	if (!textEditor.selection) {
		console.log('no selection');
		return;
	} else {
		return textEditor.document.lineAt(textEditor.selection.active.line).text;
	}
};

/*
function delFile(params:String) {
	var h = vscode.window.createTerminal("delete")
	h.sendText("taskkill -IM "+ params.substring(params.lastIndexOf("\\") + 1, params.length) + " /F && del " + params);
	h.dispose();
}*/

// This method is called when your extension is deactivated
export function deactivate() {
	if (disposables) {
		disposables.forEach(item => item.dispose());
	}
	disposables = [];
}
