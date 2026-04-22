# LAKOTA HOUSE Mock Site

宿泊施設・ブランドサイト風の**静的モックサイト**です。  
外部サーバー不要で、HTMLファイルをダブルクリックするだけでブラウザで開けます。

---

## ローカルでの開き方

**ダブルクリックするだけでOKです！**

1. このリポジトリを ZIP でダウンロード（GitHub の「Code」→「Download ZIP」）
2. ZIP を解凍する
3. `index.html` を**ダブルクリック** → ブラウザが開きます ✅

> **注意:** Google Fonts・Font Awesome はオンライン時のみ読み込まれます。  
> オフライン環境ではフォントがシステムフォントにフォールバックします。

---

## ファイル構成

```
test_20260422/
├── index.html          # TOPページ
├── about.html          # コンセプト/Aboutページ
├── gallery.html        # ギャラリーページ（フィルタ＋モーダル）
├── news.html           # お知らせ一覧ページ
├── access.html         # アクセスページ（地図埋め込み）
├── contact.html        # お問い合わせフォームページ
├── css/
│   └── style.css       # 全ページ共通スタイル
├── js/
│   └── main.js         # 共通JavaScript
├── docs/
│   ├── design.md       # 設計書
│   └── spec.md         # 仕様書
└── README.md           # このファイル
```

---

## ページ一覧

| ページ | ファイル | 概要 |
|--------|---------|------|
| TOP | [index.html](index.html) | ヒーロー・コンセプト・特徴・ギャラリープレビュー・ニュース |
| About | [about.html](about.html) | コンセプト・ストーリー・施設数字 |
| Gallery | [gallery.html](gallery.html) | カテゴリフィルタ付きギャラリー・モーダル拡大 |
| News | [news.html](news.html) | お知らせ・イベント・プレスリリース |
| Access | [access.html](access.html) | 地図・施設情報・交通案内 |
| Contact | [contact.html](contact.html) | お問い合わせフォーム（バリデーション付き） |

---

## 使用技術

| 技術 | バージョン/詳細 |
|------|--------------|
| HTML | HTML5（セマンティックタグ使用） |
| CSS | 純粋な CSS（CSS変数・Flexbox・Grid使用） |
| JavaScript | Vanilla JS（ES6+、jQuery不使用） |
| Google Fonts | Playfair Display / Noto Sans JP（CDN） |
| Font Awesome | 6.4.0（CDN、アイコン用） |
| 画像 | placehold.co（プレースホルダー） |

---

## JS 機能一覧

| 機能 | 概要 |
|------|------|
| ハンバーガーメニュー | SP時のナビ開閉 |
| ヘッダースクロール変化 | スクロールでヘッダー背景を透明→白に変化 |
| スクロールフェードイン | `IntersectionObserver` で要素をフェードイン |
| ギャラリーフィルタ | カテゴリボタンで画像を表示/非表示 |
| ギャラリーモーダル | 画像クリックで拡大・前後ナビ・ESCで閉じる |
| フォームバリデーション | 必須チェック・メール形式チェック・リアルタイム表示 |
| サンクス表示 | 送信後にフォームを非表示にしてサンクスメッセージを表示 |

---

## カスタマイズ方法

### カラーの変更

`css/style.css` の `:root` セクションにある CSS 変数を変更するだけで、サイト全体の色が変わります。

```css
:root {
  --color-main: #2C2C2C;     /* メインカラー（ダークグレー） */
  --color-accent: #A0845C;   /* アクセントカラー（ウォームブラウン） */
  --color-bg: #FAFAF8;       /* 背景色（オフホワイト） */
  --color-text: #333333;     /* テキストカラー */
  --color-subtext: #888888;  /* サブテキストカラー */
}
```

### 画像の差し替え方法

各 HTML ファイル内の `https://placehold.co/...` を実際の画像パスに置き換えてください。

```html
<!-- 変更前 -->
<img src="https://placehold.co/800x500/c9b89a/ffffff?text=Concept" alt="...">

<!-- 変更後（例：ローカル画像） -->
<img src="images/concept.jpg" alt="...">
```

ヒーロー・ページヘッダーの背景画像は `style` 属性で指定されています。

```html
<!-- 変更前 -->
<div class="hero__bg" style="background-image: url('https://placehold.co/1920x1080/1a1a1a/ffffff?text=...');"></div>

<!-- 変更後 -->
<div class="hero__bg" style="background-image: url('images/hero.jpg');"></div>
```

---

## ドキュメント

- [設計書（design.md）](docs/design.md) - ファイル構成・画面遷移図・データ設計・コンポーネント設計
- [仕様書（spec.md）](docs/spec.md) - 機能要件・バリデーション仕様・ブラウザ対応・拡張案

---

## ライセンス

このプロジェクトはモック・デモ目的で作成されています。商用利用の際は各 CDN サービスの利用規約をご確認ください。

&copy; 2026 LAKOTA HOUSE Mock Site