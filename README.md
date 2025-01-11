# ワークアウト記録アプリ

シンプルで使いやすいワークアウト記録アプリケーションです。筋トレの記録を簡単に管理できます。

## 主な機能

### 1. ワークアウトの記録
- 複数の種目（エクササイズ）を一度に登録可能
- 各種目に対して複数のセットを記録
- セットごとの重量(kg)と回数を記録
- 直感的なUIで簡単に入力可能

### 2. 履歴の管理
- 記録したワークアウトを時系列で表示
- 日付、種目名、セット数、重量、回数などの詳細を確認可能
- 見やすい履歴一覧でトレーニングの進捗を確認

## プロジェクト構造

```
src/
├── app/
│   ├── components/
│   │   ├── workout-form/
│   │   │   ├── workout-form.component.ts
│   │   │   ├── workout-form.component.html
│   │   │   └── workout-form.component.css
│   │   └── workout-list/
│   │       ├── workout-list.component.ts
│   │       ├── workout-list.component.html
│   │       └── workout-list.component.css
│   ├── models/
│   │   └── workout.model.ts
│   ├── services/
│   │   └── workout.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.routes.ts
├── global_styles.css
├── index.html
└── main.ts
```

## 技術スタック
- Angular 18
- TailwindCSS
- TypeScript

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

開発サーバーは `http://localhost:4200/` で起動します。