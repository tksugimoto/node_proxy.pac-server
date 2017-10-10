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
