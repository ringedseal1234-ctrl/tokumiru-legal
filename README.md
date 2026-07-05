# トクミル 公開サイト

価格比較アプリ「トクミル」の公式紹介・サポート・法的文書を公開するGitHub Pagesサイト。

公開URL:

- https://ringedseal1234-ctrl.github.io/tokumiru-legal/
- https://ringedseal1234-ctrl.github.io/tokumiru-legal/terms.html
- https://ringedseal1234-ctrl.github.io/tokumiru-legal/privacy.html
- https://ringedseal1234-ctrl.github.io/tokumiru-legal/tokushoho.html

## 構成

- GitHub Pages
- Jekyll
- Markdown
- 独自HTML/CSS
- JavaScriptなし
- Cookie・ウェブ分析なし

## ローカル確認

### 初回セットアップ

このプロジェクトはRuby 3.3.11とBundler 2.5.22を使用する。
rbenvを利用する場合、リポジトリへ移動すると `.ruby-version` によりRuby 3.3.11が選択される。

```bash
ruby -v
gem install bundler -v 2.5.22
bundle install
```

`ruby -v` が `ruby 3.3.11` であることを確認する。

### サイトの起動

```bash
bundle exec jekyll serve
```

ブラウザで `http://127.0.0.1:4000/tokumiru-legal/` を開く。

### ビルド確認

```bash
bundle exec jekyll build --trace
```

## 更新時の確認

1. `_config.yml` の `url` と `baseurl`
2. `terms.html`、`privacy.html`、`tokushoho.html` のURL互換性
3. 法務文書の最終更新日
4. アプリの実装済み機能との一致
5. 料金・課金・アフィリエイトの実運用との一致
6. メールアドレス、事業者情報
7. モバイル・タブレット・デスクトップ表示
8. GitHub Actionsのビルド成功

## セキュリティ境界

このリポジトリは公開リポジトリ。

置いてよいもの:

- 公開用Markdown・HTML・CSS
- 公開画像
- Jekyll設定
- GitHub Actions設定

置いてはいけないもの:

- Flutterアプリのソースコード
- Cloud Functionsのソースコード
- Firebase設定ファイル
- APIキー、サービスアカウント、秘密鍵
- `.env`
- 個人情報を含むスクリーンショット

アプリ本体は別リポジトリで管理する。
