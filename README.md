# Repository Template

新しいプロジェクト用リポジトリを作成するためのGitHub Template Repositoryです。

リポジトリ内の `docs/` を設計資料の原本とし、次の2つの方法で同じ資料を閲覧します。

- ローカル: [game-chiyan/projects-template](https://github.com/game-chiyan/projects-template) をクローンして用意した `~\Projects\01_Docs_Portal\` から複数プロジェクトを横断表示
- GitHub: リポジトリ内のDocusaurusをGitHub Pagesへ自動デプロイ

## 構成

```text
.
├─ .github/
│  └─ workflows/
│     └─ deploy-docs.yml       # main更新時にGitHub Pagesへ公開
├─ docs/
│  └─ index.md                 # 必須。プロジェクト資料のトップ
├─ website/
│  ├─ docusaurus.config.js     # リポジトリ名からPages URLを自動設定
│  ├─ package.json
│  ├─ package-lock.json        # GitHub Actionsのnpm ciで使用
│  ├─ sidebars.js
│  ├─ .gitignore
│  └─ static/
│     └─ .nojekyll
└─ README.md
```

`website/node_modules/`、`website/.docusaurus/`、`website/build/` は生成物のためコミットしません。

## テンプレートの準備

テンプレート提供側では、GitHubの `repository-template` リポジトリで一度だけ次を設定します。

1. `Settings > General` を開く
2. `Template repository` を有効にする
3. デフォルトブランチを `main` にする

## 新しいリポジトリの作成

Forkではなく、GitHubのTemplate Repository機能を使用します。

1. GitHubで `repository-template` を開く
2. `Use this template > Create a new repository` を選択する
3. Owner、リポジトリ名、公開範囲を設定する
4. `Include all branches` は選択しない
5. `Create repository` を実行する
6. 作成されたリポジトリを `~\Projects\<プロジェクト>\<リポジトリ>\` へcloneする

`01_Docs_Portal` は上記配置の `docs\` だけを検出するため、リポジトリをプロジェクトフォルダ直下に配置します。

新しいリポジトリは `main` から開始し、その後 `develop` を派生させます。

```bat
git switch -c develop
git push -u origin develop
```

## 作成後の初期設定

新しいリポジトリで次を更新します。

1. `README.md` をプロジェクト用の説明へ書き換える
2. `docs/index.md` のタイトル、概要、主要資料へのリンクを書き換える
3. 必要に応じて `docs/architecture/`、`docs/design/`、`docs/adr/`、`docs/operations/`、`docs/assets/` を追加する
4. GitHubの `Settings > Pages > Build and deployment > Source` を `GitHub Actions` に設定する
5. `Actions > Deploy docs to GitHub Pages > Run workflow` から `main` を指定して初回デプロイする

DocusaurusはGitHub Actions上でOwnerとリポジトリ名を自動取得するため、通常は `website/docusaurus.config.js` の `url` や `baseUrl` を変更する必要はありません。

公開URLは次の形式になります。

```text
https://<Owner>.github.io/<Repository>/
```

## ブランチ運用

```text
feature/*
  ↓
develop
  ↓
main
  ↓
GitHub Pagesへ自動反映
```

- `develop` へのpushではGitHub Pagesを更新しない
- `main` へ `docs/**`、`website/**`、またはPages workflowの変更がpushされた場合だけ自動デプロイする
- リリース前の資料は `develop`、公開する資料は `main` で管理する

## ローカルでの確認

Node.js 20以上を使用します。コマンドプロンプトで次を実行します。

```bat
cd /d <リポジトリのパス>\website
npm ci
npm start
```

起動後、ブラウザで次を開きます。

```text
http://localhost:3000/
```

終了する場合は `Ctrl+C` を押します。

## ビルド確認

```bat
cd /d <リポジトリのパス>\website
npm run build
```

生成される `website/build/` はGitHub ActionsがPagesへデプロイします。ローカルで生成したファイルは `.gitignore` によりコミット対象外です。

## 公式ドキュメント

- [GitHub: Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [GitHub Pages: Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Docusaurus: Deploying to GitHub Pages](https://docusaurus.io/docs/deployment/github-pages)
