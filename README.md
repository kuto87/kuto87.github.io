# KUTO

[kuto87公式サイト](https://kuto87.github.io/) のソースコードです。

京都で制作しているWebアプリ、ゲーム、CLIを、日英2言語で紹介する1ページ構成の個人サイトです。白い余白と大きなタイポグラフィ、`87`の輪郭から生成した点群背景で構成しています。

## 主な内容

- 制作物5件をシンプルな一覧で紹介（3件は公開ページ、2件はリポジトリ）
- 日本語 / English 切り替え
- GitHub / Xへのリンク
- WebGL point spritesによる87を保つ微動、緩やかなスクロール散開、散開後の自由な個別遊泳（透過PNGフォールバック付き）
- キーボード操作、スキップリンク、reduced motion対応
- OGP、Twitter Card、JSON-LD、canonical、sitemap、robots
- GitHub Pages用のブランド404ページ
- レスポンシブ対応（320 / 360 / 390 / 430 / 768 / 1024 / 1440pxで日英を確認）

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
- 点群の動き: `src/ParticleBackdrop.tsx`
- 点群座標の再生成: `npm run generate:particles`
- デザイン: `src/App.css`
- SEO / OGP: `index.html`
- 英語版メタデータ: `en/index.html`
- OGP画像: `public/og-particles.png`
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
