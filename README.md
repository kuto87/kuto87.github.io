# KUTO

[kuto87公式サイト](https://kuto87.github.io/) のソースコードです。

京都で制作しているWebアプリ、ゲーム、CLI、自動化ツールを、日英2言語で紹介する1ページ構成のポートフォリオです。「小さく作り、ちゃんと公開する」という制作姿勢を、温かい紙面、大胆なタイポグラフィ、`87`の積層モチーフで表現しています。

## 主な内容

- 制作物5件の紹介と公開状態フィルター
- 日本語 / English 切り替え
- GitHub / Xへのリンク
- キーボード操作、スキップリンク、reduced motion対応
- OGP、Twitter Card、JSON-LD、canonical、sitemap、robots
- GitHub Pages用のブランド404ページ
- レスポンシブ対応（320px以上）

## 技術構成

- React 19
- TypeScript 6
- Vite 8
- CSS
- GitHub Actions / GitHub Pages

## ローカル開発

Node.js 22を使用します。

```bash
npm ci
npm run dev
```

## 品質確認

```bash
npm run lint
npm run build
npm audit
npm run preview
```

## 更新箇所

- 文言・作品情報: `src/data/site.ts`
- 画面構成: `src/App.tsx`
- デザイン: `src/App.css`
- SEO / OGP: `index.html`
- 英語版メタデータ: `en/index.html`
- OGP画像: `public/og.png`
- サイトマップ: `public/sitemap.xml`

作品を追加・削除した場合は、`src/data/site.ts`、`index.html`内のJSON-LD、作品件数の表示を合わせて更新してください。

## 公開

`main` ブランチへのpushで、GitHub Actionsが次を実行します。

1. 依存関係をクリーンインストール
2. Lint
3. 本番ビルド
4. GitHub Pagesへデプロイ

公開URL: https://kuto87.github.io/

## 権利

サイトの文章、デザイン、画像、ロゴ、およびソースコードの権利はkuto87に帰属します。明示的なライセンスは付与していません。
