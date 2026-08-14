---
layout: page
title: アカウントとデータの削除
eyebrow: Account & data
lead: アプリ内またはこのページから、アカウントと関連データの削除を開始できます。
description: トクミルのアカウントとデータを削除する方法
permalink: /data-deletion.html
---

## アプリから削除する

1. トクミルを開く
2. 画面下部の「マイページ」を開く
3. 設定を開く
4. 「アカウントを削除する」を選ぶ
5. 表示される削除対象を確認する
6. 確認操作を完了する

削除処理では、Firebase上のユーザーデータ、Firebase Authenticationのアカウント、端末内のトクミルデータ、行動分析用の匿名識別子の削除またはリセットを試みます。

## アプリを利用できない場合

端末の故障などでアプリを操作できない場合は、次のフォームを使用してください。入力内容はHTTPSでFirebase Authenticationと削除処理へ送信され、パスワードは保存しません。

<div class="status-note">
  <strong>削除方法を選択</strong>
  <p>「アカウントと関連データ」はFirebase Authenticationのアカウントも削除します。「データのみ」はアカウントを残し、Firebase上の関連データを削除します。Webフォームからは端末内の閲覧履歴・マイリスト・節約記録を削除できないため、アプリ内設定または端末のアプリデータ削除を利用してください。</p>
</div>

<form class="data-deletion-form" action="https://asia-northeast1-tokumiru-efa03.cloudfunctions.net/webDeleteAccount" method="post">
  <fieldset>
    <legend>削除方法</legend>
    <label><input type="radio" name="mode" value="account" checked> アカウントと関連データを削除する</label>
    <label><input type="radio" name="mode" value="data"> アカウントを残してデータを削除する</label>
  </fieldset>

  <label for="deletion-email">アカウントに登録したメールアドレス</label>
  <input id="deletion-email" name="email" type="email" autocomplete="username" maxlength="320" required>

  <label for="deletion-password">パスワード</label>
  <input id="deletion-password" name="password" type="password" autocomplete="current-password" minlength="6" maxlength="4096" required>

  <label class="data-deletion-form__confirm"><input name="confirm" type="checkbox" value="yes" required> 入力したアカウントの削除を実行することを確認しました</label>

  <button class="button" type="submit">削除を実行する</button>
</form>

フォームを利用できない場合は、アカウントに登録したメールアドレスからお問い合わせください。

<p><a class="button" href="mailto:ringedseal1234+support@gmail.com?subject=%E3%83%88%E3%82%AF%E3%83%9F%E3%83%AB%20%E3%83%87%E3%83%BC%E3%82%BF%E5%89%8A%E9%A0%BC">削除を問い合わせる</a></p>

フォームでは登録メールアドレスとパスワードをFirebase Authenticationの本人確認に使用しますが、当方はパスワードを保存しません。問い合わせメールにはパスワードを記載しないでください。匿名アカウントで、アカウントを保存していない場合は、問い合わせから対象アカウントを特定できないことがあります。

## 削除後もすぐには消えない場合がある情報

- 障害調査やセキュリティのため、外部サービスが一定期間保持するログ
- 法令上の保存義務がある記録
- ユーザーIDを含めず公開価格情報として保存された、店舗・商品・価格・粗い地域単位の観測データ
- 既に集計済みで個人を識別しない統計情報

公開価格情報にはユーザーIDを含めず、現在の設計では90日で削除される有効期限を設定しています。

詳細は[プライバシーポリシー]({{ "/privacy.html" | relative_url }})を確認してください。
