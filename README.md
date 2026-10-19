# KUTO87

> **移転しました。** このサイトは [くとはな（kutohana.com）](https://kutohana.com/) に移りました。
> GitHub Pages（https://kuto87.github.io/）には `redirect/` の転送ページだけを公開しています。
> `/` と `/en/` は kutohana.com へ転送し（`#works` `#about` は同じ場所へ、`#contact` は `#about` へ）、ほかのパスは移転を知らせる 404 ページを出します。
> 下の React 版のソースはそのまま残しています。戻すときは、この移転のコミットを `git revert` してください（`deploy.yml`・README・`redirect/` がまとめて元に戻ります）。

[kuto87公式サイト](https://kuto87.github.io/) のソースコードです。

個人で作ったゲームやCLIと、現在制作中のものを日英2言語でまとめる1ページ構成のサイトです。暖かな紙色、コンデンス体のロックアップ、`87`の輪郭から生成した濃い点群背景で構成しています。

## 主な内容

- 開発中・公開中のプロジェクト4件を、名前・公開状況・使用技術に絞って掲載
- 日本語 / English 切り替え
- GitHub / Xへのリンク
- 墨色を基調に一部へ赤・青・緑・黄土を混ぜたWebGL point spritesによる87の微動、スクロール速度に連動する慣性付き散開、散開後の自由な個別遊泳（透過PNGフォールバック付き）
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
- OGP画像: `public/og-particles-v2.png`
- サイトマップ: `public/sitemap.xml`

プロジェクトを追加・削除した場合は、`src/data/site.ts`と`index.html`内のJSON-LD（プロジェクト情報・件数）を合わせて更新してください。

## 公開

`main` ブランチへのpushで、GitHub Actionsが `redirect/` をGitHub Pagesへデプロイします（移転後）。
React 版の Lint と本番ビルドは、Quality ワークフローで pull request と `main` へのpushごとに確認しています。

公開URL: https://kuto87.github.io/（https://kutohana.com/ へ転送）

## 権利

サイトの文章、デザイン、画像、ロゴ、およびソースコードの権利はkuto87に帰属します。明示的なライセンスは付与していません。
