#!/usr/bin/env bash
# 検証の単一入口。
#   scripts/verify.sh          # fast: ビルド + 必須ページ存在チェック
#   scripts/verify.sh --full   # fast の内容 + 禁止URL/プレースホルダーのgrep(CI相当)
set -euo pipefail
cd "$(dirname "$0")/.."

FULL=false
if [[ "${1:-}" == "--full" ]]; then
  FULL=true
fi

echo "==> jekyll build"
bundle exec jekyll build --trace

echo "==> required pages"
required_files=(
  index.html
  features.html
  support.html
  data-deletion.html
  legal.html
  terms.html
  privacy.html
  tokushoho.html
  404.html
  robots.txt
  sitemap.xml
)
for f in "${required_files[@]}"; do
  test -f "_site/$f" || { echo "missing: _site/$f" >&2; exit 1; }
done

if $FULL; then
  echo "==> reject stale URLs and placeholders"
  ! grep -R "ringedsealstudio.github.io" --exclude-dir=.git --exclude-dir=.github --exclude-dir=scripts .
  ! grep -R "Premium ¥290" --exclude-dir=.git --exclude-dir=.github --exclude-dir=scripts .
  ! grep -R "【" --include="*.md" --exclude-dir=.github .
fi

if $FULL; then
  echo "verify.sh: OK (full)"
else
  echo "verify.sh: OK (fast)"
fi
