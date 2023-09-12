## アプリケーションをローカルで起動する手順

### 手順1. パッケージをインストール

```
npm i
```

### 手順2. envに各種の値を設定

`env`のファイル名を`.env`に変更して、各種の値を設定してください。

### 手順3. ローカルサーバーを起動

```
npm run dev
```

## 記事に対するコメントの読み書き機能をローカルで有効にする手順

### 手順1. .envの`PUBLIC_IS_USE_COMMENT`をtrueに変更

下記の変更により、`src/routes/[category]/[article]/+page.svelte`にある、`comments.svelte`が表示されます。
`comments.svelte`はコメントの投稿フォームや一覧を表示するコンポーネントです。

```env
# .env

- PUBLIC_IS_USE_COMMENT="false"
+ PUBLIC_IS_USE_COMMENT="true"
```

### 手順2. wranglerをローカルマシンにインストール

```
npm i -g wrangler
```

### 手順3. データベースを作成

下記の`<DATABASE_NAME>`は任意の名前に置き換えてください。

```
wrangler d1 create <DATABASE_NAME>
```

上記を実行すると、ターミナルに以下のようなテキストが表示されるので、コピーしてください。

```
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "ランダムな文字列"
```

### 手順4. wrangler.tomlにコピペ

`_wrangler.toml`のファイル名を`wrangler.toml`に変更して、手順3.でコピーしたテキストをペーストしてください。

### 手順5. テーブルを作成

下記の`<DATABASE_NAME>`は手順3.で設定した値と同様の値に置き換えてください。

```
wrangler d1 execute <DATABASE_NAME> --local --file=./schema.sql
```

### 手順6. ビルドを実行

```
npm run build
```

### 手順7. d1に読み書き可能なアプリケーションをローカルにデプロイ

```
npm run d1
```

ターミナルに下記が表示された後にキーボードの`b`を押すことで、ローカルにデプロイされたアプリケーションをブラウザに表示できます。

```
[b] open a browser, [d] open Devtools, [c] clear console, [x] to exit
```

上記で開いたアプリケーションで、各記事に対するコメントの読み書きが確認できます。

### 留意事項

手順7.でローカルにデプロイされたアプリケーションはホットリロードが効きません。
コードの変更を画面に反映させたい場合は、手順6.と手順7.の実行が必要です。

ターミナルで下記のコマンドを入力すると、ファイルの変更を監視できます。

```
npx vite build -w
```

ファイルの変更を監視した状態でファイルを変更して保存をすると、自動でビルドが実行されます。

## 本番環境（Cloudflare Pages）でコメント機能を有効にする手順

Cloudflare Pagesでアプリケーションの作成を行なってから、下記の手順を実行してください。

### 手順1. 本番環境にデータベースとテーブルを作成

```
wrangler d1 execute <DATABASE_NAME> --file=./schema.sql
```

### 手順2. Pages Functionsとデータベースをバインド

Cloudflare Pagesのアプリケーションごとの`設定`→`Functions`のページに、`D1 データベース バインディング`という項目があります。
![binding](https://github.com/ciscoheat/sveltekit-superforms/assets/48976713/d0f982f5-f7b5-4910-85bc-4c227671931c)
この部分で、`プロダクション`タブで変数名を`DB`、D1データベースの項を手順1.で作成したデータベースに選択してください。

### 手順3. 再デプロイ

再デプロイが完了すると、本番環境でコメントの読み書きが可能になります。

## 下書き状態の記事のプレビューができるURL

以下のパスにパラメータを渡すと、下書き状態の記事のプレビューができます。

```
/preview?id={CONTENT_ID}&key={DRAFT_KEY}
```
