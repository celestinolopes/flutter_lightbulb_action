# 🔧 Flutter Lightbulb Action

An interactive VS Code extension that makes Flutter widget refactoring easier with a clickable hover menu.

##  Features

- **🎯 Interactive Hover**: Hover over Flutter widgets to see a menu with refactoring options
- **🔗 Clickable Links**: Execute actions directly by clicking menu links
- **⚡ No Keys Required**: No need to use Ctrl+Shift+R - everything works with the mouse
- **🚀 Multiple Actions**: 10+ refactoring options available
- **📱 Smart Detection**: Automatically identifies Flutter widgets

##  How to Install

### Method 1: Via VS Code (Recommended)

1. **Download the file** `flutter-lightbulb-1.0.0.vsix`
2. **Open VS Code**
3. **Press** `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. **Type**: `Extensions: Install from VSIX...`
5. **Select** the file `flutter-lightbulb-1.0.0.vsix`
6. **Click** "Open"

### Method 2: Via Terminal

```bash
code --install-extension flutter-lightbulb-1.0.0.vsix
```

##  How to Use

1. **Open a Dart file** with Flutter code
2. **Hover over** any Flutter widget (e.g., `Container(`, `Text(`, `Column(`)
3. **See the interactive menu** appear automatically
4. **Click any link** to execute the action

### Code Example:

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(  // ← Hover here
      child: Text('Hello'),  // ← Or here
    );
  }
}
```

## 🔧 Available Actions

### 💡 **Quick Actions:**
- **Quick Fix** - Open Flutter refactor menu
- **Refactor Menu** - Complete refactoring menu

## ⌨️ Keyboard Shortcuts

- **Cmd+Shift+R** (Mac) / **Ctrl+Shift+R** (Windows/Linux) - Open Quick Fix

## 🎨 Screenshots

When you hover over a Flutter widget, you'll see an interactive menu like this:

```
🔧 Flutter Quick Fix

Widget: Container

💡 Available Action:
- 💡 Quick Fix - Open Flutter refactor menu
```

## 🔧 Requirements

- **VS Code**: Version 1.60.0 or higher
- **Flutter**: Any version
- **Dart**: Any version

## 📝 Changelog

### v1.0.0
- ✨ Interactive hover menu implemented
- 🔗 Clickable links for all actions
- ⚡ Direct execution without keys
- 🎯 Smart widget detection
- 📦 10+ refactoring actions available

## 🐛 Known Issues

- Hover may not appear on very small widgets
- Some actions may depend on specific code context

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Report bugs
2. Suggest new features
3. Submit pull requests

## 📄 License

This project is under the MIT license. See the LICENSE file for more details.

## 👨‍💻 Author

**Celestino** - Flutter Developer
My linkedin - https://www.linkedin.com/in/celestino-lopes-0817001a0/


