#!/usr/bin/env bash
# assets/images/store/ 配下のPNGから、配信用のWebPを生成する。
#   scripts/optimize-images.sh          # PNGより古い(または存在しない)WebPだけ再生成
#   scripts/optimize-images.sh --force  # 全て再生成
#
# ページが参照しているのはWebPのみ。PNGはストア入稿用の原本として残してある。
# スクリーンショットを差し替えたら、必ずこのスクリプトを実行すること。
# (実行し忘れると、サイトには古い画像が出続ける)
#
# 出力幅は「サイト上での最大表示幅 × 約2.4倍」で決めてある(高解像度ディスプレイ用)。
# 原本より大きくは引き伸ばさない。表示幅を変えるCSSを触ったら、下の target_width() も見直すこと。
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

# 出力するWebPの幅(px)。0 は原寸のまま。
target_width() {
  case "$1" in
    # 404ページのカードで最大220px表示
    */app-icon/*)                  echo 512 ;;
    # トップのヒーローで最大640px表示。原本が1024pxしかないので原寸のまま
    */feature-graphic/*)           echo 0 ;;
    # できることページ末尾のテーマ紹介のみ。最大220px表示
    */screenshots/premium-themes.png) echo 540 ;;
    # 端末スクショ全般。最大334px表示(トップの家族共有・最安値MAP)
    */screenshots/*)               echo 810 ;;
    *)                             echo 0 ;;
  esac
}

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

  width=$(target_width "$png")
  src_width=$(sips -g pixelWidth "$png" | awk '/pixelWidth/{print $2}')
  if [[ "$width" -gt 0 && "$width" -lt "$src_width" ]]; then
    cwebp -q "$QUALITY" -resize "$width" 0 -quiet "$png" -o "$webp"
  else
    cwebp -q "$QUALITY" -quiet "$png" -o "$webp"
  fi

  before=$(($(wc -c <"$png") / 1024))
  after=$(($(wc -c <"$webp") / 1024))
  out_width=$(sips -g pixelWidth "$webp" | awk '/pixelWidth/{print $2}')
  printf '%-42s %5dpx %6dKB -> %5dpx %5dKB\n' "$(basename "$png")" "$src_width" "$before" "$out_width" "$after"
  generated=$((generated + 1))
done < <(find assets/images/store -name '*.png' | sort)

echo "optimize-images.sh: 生成 ${generated}件 / 最新のためスキップ ${skipped}件"
