# tokumiru-legal

価格比較アプリ「トクミル」の**法的文書だけ**を公開する GitHub Pages 用リポジトリ。

> ⚠️ **このリポジトリにアプリのソースコードを置かないこと。**
> ソースコードは別リポジトリ（`tokumiru`、Private）で管理する。
> 本リポジトリは **Public** で公開されるため、混入は即「ソース流出」になる。

## 含めてよいもの
- `*.md`（利用規約・プライバシーポリシー・特商法表記）
- `_config.yml`（Jekyll 設定）
- `index.md`（入口）
- `assets/`（ロゴ画像など、公開して問題ないものだけ）

## 絶対に含めないもの
- `lib/` `functions/` `android/` `ios/` `src/` 等のソース
- `*.dart` `*.ts` `*.js` `*.kt` `*.swift`
- `firebase.json` `*.gradle` `google-services.json` `GoogleService-Info.plist`
- APIキー・シークレット・`.env` 各種

`.gitignore` と `_config.yml` の `exclude` で二重に防御しているが、最終確認は人間が行う。

## 公開（GitHub Pages）
リポジトリ Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/(root)`。
発行URL例: `https://<GitHubユーザー名>.github.io/tokumiru-legal/`

各ページ:
- 利用規約: `/terms.html`
- プライバシーポリシー: `/privacy.html`
- 特商法表記: `/tokushoho.html`

## プレースホルダ
各 `.md` 内の `【...】` を実値に置換してから公開する。置換漏れ確認:
`grep -rn "【" .` で全プレースホルダを洗い出せる。
