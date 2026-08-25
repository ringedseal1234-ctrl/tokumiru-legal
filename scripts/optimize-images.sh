#!/usr/bin/env bash
# assets/images/store/ 配下のPNGから、配信用のWebPを生成する。
#   scripts/optimize-images.sh          # PNGより古い(または存在しない)WebPだけ再生成
#   scripts/optimize-images.sh --force  # 全て再生成
#
# ページが参照しているのはWebPのみ。PNGはストア入稿用の原本として残してある。
# スクリーンショットを差し替えたら、必ずこのスクリプトを実行すること。
# (実行し忘れると、サイトには古い画像が出続ける)
set -euo pipefail
cd "$(dirname "$0")/.."

QUALITY=90
FORCE=false
if [[ "${1:-}" == "--force" ]]; then
  FORCE=true
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp が見つかりません。'brew install webp' を実行してください。" >&2
  exit 1
fi

generated=0
skipped=0

while IFS= read -r png; do
  # 原本として置いてあるだけのファイルは対象外
  case "$png" in *-raw.png) continue ;; esac

  webp="${png%.png}.webp"
  if [[ "$FORCE" == false && -f "$webp" && "$webp" -nt "$png" ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  cwebp -q "$QUALITY" -quiet "$png" -o "$webp"
  before=$(($(wc -c <"$png") / 1024))
  after=$(($(wc -c <"$webp") / 1024))
  printf '%-42s %6dKB -> %5dKB\n' "$(basename "$png")" "$before" "$after"
  generated=$((generated + 1))
done < <(find assets/images/store -name '*.png' | sort)

echo "optimize-images.sh: 生成 ${generated}件 / 最新のためスキップ ${skipped}件"
