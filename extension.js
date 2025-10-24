const vscode = require('vscode');

// Função auxiliar para detectar widgets Flutter
function detectFlutterWidget(document, position) {
    const widgetPatterns = [
        // Widgets básicos: Widget(
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com parâmetros nomeados: Widget(key: value,
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/,
        // Widgets em múltiplas linhas: Widget(
        //   child: ...
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*$/,
        // Widgets com const: const Widget(
        /^\s*const\s+([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com new: new Widget(
        /^\s*new\s+([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets customizados: MyCustomWidget(
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com espaços: Widget (
        /^\s*([A-Z][A-Za-z0-9_]*)\s+\s*\(/,
        // Widgets com tabs: Widget	(
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\t*\s*\(/,
        // Widgets com return: return Widget(
        /^\s*return\s+([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com return const: return const Widget(
        /^\s*return\s+const\s+([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com child: child: Widget(
        /^\s*child:\s*([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com children: children: [Widget(
        /^\s*children:\s*\[\s*([A-Z][A-Za-z0-9_]*)\s*\(/,
        // Widgets com SizedBox: SizedBox(
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*$/,
        // Widgets com MaterialApp, Scaffold, etc.
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*$/,
        // Widgets com Padding, Margin, etc.
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*$/,
        // Widgets com GestureDetector, InkWell, etc.
        /^\s*([A-Z][A-Za-z0-9_]*)\s*\(\s*$/
    ];

    // Lista de widgets Flutter conhecidos para validação adicional
    const knownWidgets = [
        'Container', 'Text', 'Column', 'Row', 'Stack', 'Positioned', 'Align',
        'Center', 'Padding', 'Margin', 'SizedBox', 'Expanded', 'Flexible',
        'Wrap', 'Flow', 'CustomScrollView', 'ListView', 'GridView', 'SingleChildScrollView',
        'AppBar', 'Scaffold', 'MaterialApp', 'CupertinoApp', 'Material', 'Card',
        'ElevatedButton', 'TextButton', 'OutlinedButton', 'IconButton', 'FloatingActionButton',
        'TextField', 'TextFormField', 'Checkbox', 'Radio', 'Switch', 'Slider',
        'Image', 'Icon', 'CircleAvatar', 'ClipRRect', 'ClipOval', 'ClipPath',
        'Transform', 'RotatedBox', 'ScaleTransition', 'FadeTransition',
        'AnimatedContainer', 'AnimatedOpacity', 'Hero', 'PageView', 'TabBarView',
        'BottomNavigationBar', 'Drawer', 'AppBar', 'SliverAppBar', 'SliverList',
        'SliverGrid', 'RefreshIndicator', 'FutureBuilder', 'StreamBuilder',
        'ValueListenableBuilder', 'Consumer', 'Selector', 'BlocBuilder', 'BlocListener',
        'GestureDetector', 'InkWell', 'InkResponse', 'AbsorbPointer', 'IgnorePointer',
        'Opacity', 'Visibility', 'Offstage', 'IndexedStack', 'AnimatedSwitcher',
        'AnimatedCrossFade', 'TweenAnimationBuilder', 'LayoutBuilder', 'Builder',
        'StatefulBuilder', 'ValueBuilder', 'AnimatedBuilder', 'ListenableBuilder',
        'ChangeNotifierProvider', 'Provider', 'Consumer', 'Selector', 'MultiProvider',
        'BlocProvider', 'BlocConsumer', 'BlocListener', 'BlocBuilder', 'BlocSelector',
        'Cubit', 'Bloc', 'Equatable', 'Freezed', 'JsonSerializable', 'JsonAnnotation'
    ];

    let widgetName = null;
    let match = null;

    // Testa linha atual
    const lineText = document.lineAt(position.line).text;
    for (const pattern of widgetPatterns) {
        match = lineText.match(pattern);
        if (match) {
            widgetName = match[1];
            // Valida se é um widget conhecido ou começa com maiúscula (convenção Flutter)
            if (knownWidgets.includes(widgetName) || /^[A-Z]/.test(widgetName)) {
                return widgetName;
            }
        }
    }

    // Se não encontrou na linha atual, verifica linhas próximas
    for (let offset = 1; offset <= 3; offset++) {
        // Linha anterior
        if (position.line - offset >= 0) {
            const prevLine = document.lineAt(position.line - offset).text;
            for (const pattern of widgetPatterns) {
                match = prevLine.match(pattern);
                if (match) {
                    widgetName = match[1];
                    if (knownWidgets.includes(widgetName) || /^[A-Z]/.test(widgetName)) {
                        return widgetName;
                    }
                }
            }
        }

        // Linha seguinte
        if (position.line + offset < document.lineCount) {
            const nextLine = document.lineAt(position.line + offset).text;
            for (const pattern of widgetPatterns) {
                match = nextLine.match(pattern);
                if (match) {
                    widgetName = match[1];
                    if (knownWidgets.includes(widgetName) || /^[A-Z]/.test(widgetName)) {
                        return widgetName;
                    }
                }
            }
        }
    }

    return null;
}

function activate(context) {
    // Provider para mostrar o lightbulb
    const codeActionProvider = {
        provideCodeActions(document, range, context) {
            const widgetName = detectFlutterWidget(document, range.start);

            if (!widgetName) return [];

            const action = new vscode.CodeAction(
                "🔄 Flutter Refactor",
                vscode.CodeActionKind.QuickFix
            );

            action.command = {
                command: "flutter-lightbulb.quick-fix",
                title: "Open Flutter Quick Fix",
                arguments: [document, range]
            };

            action.isPreferred = true;
            return [action];
        }
    };

    // Provider para hover com menu de refatoração interativo
    const hoverProvider = {
        provideHover(document, position, token) {
            const widgetName = detectFlutterWidget(document, position);

            if (!widgetName) return null;

            // Cria o conteúdo do hover com MarkdownString para melhor formatação
            const markdown = new vscode.MarkdownString();
            markdown.isTrusted = true;

            markdown.appendMarkdown(`# 🔧 Flutter Quick Fix\n\n`);
            markdown.appendMarkdown(`**Widget:** \`${widgetName}\`\n\n`);
            markdown.appendMarkdown(`## 💡 **Available Action:**\n\n`);
            markdown.appendMarkdown(`- [💡 Quick Fix](command:flutter-lightbulb.quick-fix) - Open Flutter refactor menu\n\n`);

            markdown.appendMarkdown(`---\n`);
            markdown.appendMarkdown(`*Click the link above to open the refactor menu!*\n`);

            return new vscode.Hover(markdown);
        }
    };

    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider("dart", codeActionProvider),
        vscode.languages.registerHoverProvider("dart", hoverProvider)
    );

    // Comando simplificado - apenas Quick Fix
    const quickFixCommand = vscode.commands.registerCommand(
        "flutter-lightbulb.quick-fix",
        async () => {
            try {
                await vscode.commands.executeCommand("editor.action.quickFix");
                vscode.window.showInformationMessage("💡 Quick Fix executed!");
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(quickFixCommand);
}

function deactivate() { }

module.exports = { activate, deactivate };
