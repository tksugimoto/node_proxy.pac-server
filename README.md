# Node.jsでproxy.pacを返すサーバー

## 準備
* `file/proxy.sample.pac`を`file/proxy.pac`にリネーム
* `file/proxy.pac`を編集
* `start-proxy.pac-server.bat`を実行

## 備考
### port番号
* デフォルトは `1024`
* 変更したい場合は以下のいずれかで起動
    * `node server.js <port番号>`
    * `npm start <port番号>`

## Chrome拡張機能 (PAC URL設定)
`chrome-extension/` にPAC URLを設定してChromeのプロキシに適用する拡張機能があります。

### インストール
1. Chromeで `chrome://extensions` を開く
1. 右上の「デベロッパー モード」を有効にする
1. 「パッケージ化されていない拡張機能を読み込む」から `chrome-extension` ディレクトリを選択

### 使い方
* ツールバーの拡張機能アイコンをクリック
* PAC URLを入力して「適用」 (デフォルト: `http://127.0.0.1:1024/`)
    * `proxy.pac` を編集した後に再度「適用」を押すとPACを読み込み直します
* 「解除」でChrome標準 (システム) のプロキシ設定に戻ります
