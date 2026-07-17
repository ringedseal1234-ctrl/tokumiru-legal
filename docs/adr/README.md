# ADR (Architecture Decision Record)

コンセプトの大きな変更(データモデル刷新、主要UXフローの作り直し、外部API/課金方針の変更など)のみを記録する。実装の細部は仕様書やコミット本文に書き、ADRには残さない。

## 書式

`NNNN-<kebab-title>.md` という連番ファイル名で保存する。**作成前に既存ファイルと番号が重複していないか確認する。**

```markdown
# NNNN. 表題

- Status: Proposed | Accepted | Superseded by NNNN
- Date: YYYY-MM-DD

## Context
## Decision
## Consequences
```

## 決定を覆すとき

旧ADRのStatusを `Superseded by NNNN` に変更する。旧番号を引用している `AGENTS.md`・仕様書・コードコメントがあれば同じコミットで更新する。
