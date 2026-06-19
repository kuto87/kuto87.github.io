# Kuto Lab

kuto87 の個人サイトです。

Webアプリ、ゲーム、自動化ツール、CLIなどの制作物をまとめるための場所です。

## 公開URL

https://kuto87.github.io/

## 内容

- トップページ
- プロジェクト一覧
- プロジェクトの公開状態、時期、学び、技術タグ
- About
- Contact
- 3種類のデザインテーマ
- 日本語/英語表示
- GitHub Pages による公開

## 使用技術

- React
- Vite
- TypeScript
- CSS
- GitHub Pages

## 開発

```bash
npm install
npm run dev
```

## 確認

```bash
npm run build
npm run lint
```

## 更新方法

プロジェクト一覧やサイト文言は `src/data/site.ts` にまとめています。

デザインは `src/App.css` の次の3テーマです。

- `soft`: 既存の柔らかい個人サイト風
- `studio`: 紙、グリッド、印刷物のような雰囲気
- `console`: 暗い計器盤、ターミナル、モニター風

公開用のメタ情報、OG画像、サイトマップ、robots は `index.html` と `public/` にあります。
