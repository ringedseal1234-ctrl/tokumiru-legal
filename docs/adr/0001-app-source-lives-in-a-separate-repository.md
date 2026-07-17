# 0001. アプリ本体は別リポジトリで管理し、本リポジトリは公開サイト専用とする

- Status: Accepted
- Date: 2026-07-17

## Context

トクミルはFlutterアプリ(+Firebase/Cloud Functions)と、紹介・サポート・法務文書を公開するWebサイトで構成される。単一リポジトリで両方を管理すると、公開リポジトリにアプリのソースコード・APIキー・Firebase設定などが混入するリスクがある。

## Decision

本リポジトリ(`tokumiru-legal`)はGitHub Pages上で公開するJekyllサイトに限定する。以下は本リポジトリに置かない。

- Flutterアプリのソースコード(`*.dart`, `android/`, `ios/`, `lib/`)
- Cloud Functionsのソースコード(`functions/`)
- Firebase設定ファイル、APIキー、サービスアカウント、`.env`
- 個人情報を含むスクリーンショット

アプリ本体は別リポジトリで管理する。

## Consequences

- 本リポジトリに置いてよいのは公開用Markdown・HTML・CSS・公開画像・Jekyll設定・GitHub Actions設定のみ。
- サイト上の機能説明・料金表示はアプリ側の実装と乖離しやすいため、変更のたびにアプリの実装済み機能・料金体系との整合性確認が必要(README「更新時の確認」参照)。
- 将来サイトからアプリのAPIを直接呼び出す機能(会員ログイン連携等)を追加する場合は、本ADRの前提が変わるため見直しが必要。
