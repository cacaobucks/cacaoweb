# Cacao — 自己紹介 WEBサイト

自己紹介を目的とした洗練されたシングルページ LP です。
外部フレームワーク不使用の純粋な HTML / CSS / JavaScript で実装されています。

---

## 目次

- [ページ構成](#ページ構成)
- [ディレクトリ構成](#ディレクトリ構成)
- [ローカル起動方法](#ローカル起動方法)
- [各セクションの仕様](#各セクションの仕様)
- [使用技術](#使用技術)
- [画像ファイルの差し替え方法](#画像ファイルの差し替え方法)

---

## ページ構成

| # | セクション | 概要 |
|---|-----------|------|
| 1 | **Top** | ファーストビュー。テキスト上→下・画像下→上スライドイン |
| 2 | **Introduction** | 自己紹介文（英語 / 日本語 切替対応） |
| 3 | **My Hobby** | 趣味紹介（3×2 ベントグリッドレイアウト） |
| 4 | **Portfolio** | 制作物一覧（スタックカードホバーエフェクト） |
| 5 | **Achievement** | 経歴・実績タイムライン |
| 6 | **My SNS** | X（Twitter）・Zenn リンクカード |

---

## ディレクトリ構成

```
_myweb_/
├── index.html                  # メインページ（全セクション）
├── css/
│   └── style.css               # 全スタイル定義
├── js/
│   └── script.js               # 言語切替・スクロールアニメーション
├── sample_images/
│   ├── dish_cacao.png          # トップページ右側の画像
│   ├── IMG_9048.jpg            # My Hobby: Golf 画像
│   ├── IMG_5807.jpg            # My Hobby: Sauna 画像
│   └── IMG_7958.jpg            # My Hobby: Overseas travel 画像
├── documents/
│   └── 設計書.md               # WEBサイト設計仕様書
├── package.json                # npm スクリプト定義
├── start.sh                    # ローカルサーバー起動シェルスクリプト
└── README.md                   # このファイル
```

---

## ローカル起動方法

### 方法 1：シェルスクリプト（推奨）

最もシンプルな起動方法です。Python3 が標準搭載の macOS / Linux で動作します。

```bash
./start.sh
```

起動後、ブラウザで以下の URL にアクセスしてください。

```
http://localhost:3000
```

### 方法 2：Python3 コマンド直接実行

```bash
python3 -m http.server 3000
```

### 方法 3：npm スクリプト（Node.js が必要）

```bash
npm start
```

> **注意：** `npm start` は内部で `npx serve` を使用します。初回実行時に `serve` パッケージのインストール確認が表示される場合があります。`y` を入力してインストールを許可してください。

### サーバーの停止

ターミナルで `Ctrl + C` を押すとサーバーが停止します。

---

## 各セクションの仕様

### Top（ヒーロー）

- 左カラムに小さなテキスト `I'm Cacao` を表示
- 右カラムに `dish_cacao.png` を表示
- **テキスト**：ページ読み込み時に上から下へスライドイン（`translateY(-60px)` → `0`）
- **画像**：下から上へスライドイン（`translateY(60px)` → `0`）

### Introduction

- デフォルトで英語テキストを表示
- カード右下の **「Translate into Japanese」ボタン** をクリックすると日本語に切り替わる
- 再クリックで英語に戻る（フェードトランジション付き）

### My Hobby

- `sample_design_1.png` を参考にした **3 列 × 2 行のベントグリッド**
- 画像セルにマウスオーバーで `scale(1.06)` の拡大エフェクト
- Sauna テキストセルはダーク背景（`#2d2419`）

```
[Golf 画像  ] [Golf テキスト ] [Sauna 画像 ]
[Sauna テキスト] [Overseas travel 画像] [Overseas travel テキスト]
```

### Portfolio

- 2 列 × 2 行のグリッド（計 4 アイテム）
- 各アイテムは **3 枚のカードをスタック表示**
- マウスオーバーでカードが **扇状に広がる**ホバーエフェクト
- 各カードの中央に `Coming Soon` を表示

### Achievement

- 左側に年表ラベル、右側に内容を配置するタイムライン形式
- 「Currently（現在）」のアイテムはアクセントカラー（カカオブラウン `#6B4226`）でハイライト

### My SNS

| プラットフォーム | URL |
|----------------|-----|
| X（Twitter） | https://x.com/cacaobucks |
| Zenn | https://zenn.dev/cacao_devlog |

---

## 使用技術

| 種別 | 内容 |
|------|------|
| **HTML** | HTML5 セマンティックマークアップ |
| **CSS** | CSS3 / CSS Custom Properties / CSS Grid / Flexbox / Keyframe Animation |
| **JavaScript** | Vanilla JS（ES2020）/ `IntersectionObserver` API |
| **フォント** | `-apple-system`（iOS / macOS の San Francisco フォント） |
| **アイコン** | SVG インライン |
| **外部依存** | なし（ローカルサーバーに `serve` または Python3 を使用） |

---

## 画像ファイルの差し替え方法

### トップページ画像の変更

`sample_images/dish_cacao.png` を同名の別の画像ファイルに差し替えるか、
`index.html` 内の以下の箇所のファイルパスを変更してください。

```html
<img class="hero__image" src="sample_images/dish_cacao.png" alt="...">
```

### My Hobby セクションの画像変更

| セクション | 現在のファイル | 変更先のファイルパスを記述する箇所 |
|-----------|--------------|----------------------------------|
| Golf | `IMG_9048.jpg` | `index.html` 内 `alt="Golf course"` の `src` 属性 |
| Sauna | `IMG_5807.jpg` | `index.html` 内 `alt="Sauna facility"` の `src` 属性 |
| Overseas travel | `IMG_7958.jpg` | `index.html` 内 `alt="Overseas travel"` の `src` 属性 |

---

## Portfolio の作品追加方法

現在 `Coming Soon` と表示されているカードに作品を追加する場合、
`index.html` の各 `.card-stack` 内の `.card--1` にタイトルや画像を追加し、
`css/style.css` の `.card__label` を拡張してください。
