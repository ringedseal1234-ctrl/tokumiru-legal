# AGENTS.md

トクミル公開サイト(紹介・サポート・法務ページ)。GitHub Pages + Jekyll。アプリ本体(Flutter/Firebase)は別リポジトリ、マーケティングコンテンツの作成・管理も別のプライベートリポジトリで行う(本リポジトリは公開サイトの発行のみを担う) — [0001](docs/adr/0001-app-source-lives-in-a-separate-repository.md) / [0003](docs/adr/0003-marketing-content-lives-in-a-separate-private-repository.md)。

## Commands

- ローカル起動: `bundle exec jekyll serve` → http://127.0.0.1:4000/tokumiru-legal/
- 画像の最適化: `scripts/optimize-images.sh`(スクリーンショット差し替え後に必須)
- 初回セットアップ・詳細は [README.md](README.md) を参照

## Verification

このリポジトリはテストコードを持たない静的サイト。検証は `scripts/verify.sh` に一本化してある。

| プロファイル | 内容 | 使う場面 |
|---|---|---|
| `scripts/verify.sh` (fast) | `jekyll build --trace` + 必須ページ存在チェック | 通常のコンテンツ・CSS・レイアウト修正 |
| `scripts/verify.sh --full` | fast の内容 + 禁止URL/プレースホルダーのgrep(CI相当) | 公開URL・料金・法務文言を変更したとき、リリース前 |

ドキュメントのみ(README等)の変更は `git diff --check` のみでよい。CIは `--full` 相当を必ず実行する(`.github/workflows/verify.yml`)。

## Architecture

- Jekyll標準構成。`_layouts/`(default / page / legal)、`_includes/`(head / header / footer)、`assets/`。
- CSSは `assets/css/main.css` 1ファイルに集約。セクションバナーコメント(TOKENS / RESET / MOTION SYSTEM / HEADER / HERO / …)で整理済み。
- JSは `assets/js/main.js` のみ。外部ライブラリ・CDN依存なし(スクロールリビール・ヘッダーのスクロール演出) — [0002](docs/adr/0002-no-cookies-no-analytics-no-external-resources.md)。
- キャッシュバスティングは `?v={{ site.time }}` で実施済み(`_includes/head.html`)。変更不要。

## Gotchas

- `assets/images/store/` のPNGはストア入稿用の原本で、**ページが参照しているのは同名の `.webp`**。スクリーンショットを差し替えたら `scripts/optimize-images.sh` を実行してWebPを作り直す。実行し忘れるとサイトに古い画像が出続ける。PNGのままページに貼ると1枚1〜2MBになり、低速回線で読み込みに失敗する。
- OGP画像(`index.md` の front matter `image:`)だけはPNGのまま。WebPのOGP画像を読めないSNSがあるため。
- 外部リソース(Google Fonts、解析タグ、CDN等)を追加しない — [0002](docs/adr/0002-no-cookies-no-analytics-no-external-resources.md)。デザイン強化はシステムフォント・自己完結アセットのみで行う。
- Flutterアプリのソースコード・Firebase設定・APIキー・`.env`・個人情報を含む画像は絶対にこのリポジトリに置かない — [0001](docs/adr/0001-app-source-lives-in-a-separate-repository.md)。
- `.github/workflows/verify.yml` は過去に混入した「誤字のGitHub Pagesドメイン」「仮の料金文言」「全角括弧」を機械的に禁止している(具体的な禁止パターンはワークフローファイル本体を参照)。同種の文言を新たに書かない。禁止パターンの文字列そのものをドキュメントに引用すると、そのドキュメント自身がgrepに引っかかるので注意する。
- マーケティングコンテンツ(下書き・関連する内部メモ)はこのリポジトリに置かない。別のプライベートリポジトリ(想定: `tokumiru-marketing`)で管理する — [0003](docs/adr/0003-marketing-content-lives-in-a-separate-private-repository.md)。`content/`のようなディレクトリをこのリポジトリに新設しない。
- サイト内容(機能説明・料金)とアプリの実装は乖離しやすい。機能・料金に触れる変更をしたら以下も確認する:
  - `_config.yml` の `url` / `baseurl`
  - `terms.html` / `privacy.html` / `tokushoho.html` のURL互換性
  - 法務文書の最終更新日
  - アプリの実装済み機能・料金・アフィリエイト運用との一致
  - メールアドレス・事業者情報

## 実装ルール

- コミット前に `scripts/verify.sh`(該当する変更なら `--full`)を通す。
- 法務文書(`privacy.md` / `terms.md` / `tokushoho.md`)の内容を変更したら、同じ変更で「最終更新日」も更新する。
- コンセプトレベルの決定(データ方針、外部連携の可否など)を変えるときは ADR を追加・更新する([docs/adr/README.md](docs/adr/README.md) 参照)。

## 出力ルール

- コミット件名: `type(scope): 要約`(日本語 Conventional Commits)+ 末尾に担当タグ(`[Claude]` 等)。
- 意図・残タスクはコミット本文に書く。共有メモファイルは作らない。
