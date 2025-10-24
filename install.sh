#!/bin/bash

# Script de Instalação - Flutter Lightbulb Action
# Resolve problemas de permissão automaticamente

echo "🚀 Instalando Flutter Lightbulb Action..."

# Verifica se o VS Code está instalado
if ! command -v code &> /dev/null; then
    echo "❌ VS Code não encontrado. Instale o VS Code primeiro."
    exit 1
fi

# Verifica se o arquivo .vsix existe
if [ ! -f "flutter-lightbulb-1.0.0.vsix" ]; then
    echo "❌ Arquivo flutter-lightbulb-1.0.0.vsix não encontrado."
    exit 1
fi

# Cria diretórios necessários com permissões corretas
echo "📁 Criando diretórios necessários..."
mkdir -p ~/.cursor/extensions
mkdir -p ~/.vscode/extensions

# Define permissões corretas
echo "🔐 Configurando permissões..."
chmod 755 ~/.cursor/extensions
chmod 755 ~/.vscode/extensions

# Tenta instalar via VS Code
echo "📦 Instalando extensão..."
if code --install-extension flutter-lightbulb-1.0.0.vsix --force; then
    echo "✅ Extensão instalada com sucesso!"
    echo ""
    echo "🎯 Como usar:"
    echo "1. Abra um arquivo Dart com código Flutter"
    echo "2. Passe o mouse sobre widgets Flutter"
    echo "3. Clique nos links do menu que aparece"
    echo ""
    echo "🚀 Divirta-se refatorando!"
else
    echo "⚠️  Instalação via código falhou. Tentando método alternativo..."
    
    # Método alternativo: instalação manual
    echo "📁 Instalando manualmente..."
    
    # Cria um diretório temporário para a extensão
    TEMP_DIR=$(mktemp -d)
    cd "$TEMP_DIR"
    
    # Extrai a extensão
    unzip -q "$(pwd)/flutter-lightbulb-1.0.0.vsix" -d "flutter-lightbulb"
    
    # Move para o diretório de extensões
    mv flutter-lightbulb ~/.cursor/extensions/flutter-lightbulb-1.0.0
    
    echo "✅ Instalação manual concluída!"
    echo "🔄 Reinicie o VS Code para ativar a extensão."
fi

echo ""
echo "📚 Para mais informações, consulte o README.md"



