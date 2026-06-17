#!/bin/bash
# ローカル開発サーバー起動スクリプト

PORT=3000

echo "🌐 http://localhost:${PORT} でサーバーを起動します..."

# Python3 が利用可能な場合
if command -v python3 &>/dev/null; then
  python3 -m http.server $PORT
# Python2 フォールバック
elif command -v python &>/dev/null; then
  python -m SimpleHTTPServer $PORT
else
  echo "Python が見つかりません。Node.js を試みます..."
  npx serve . -p $PORT --no-clipboard
fi
