// ツールバーのアイコンクリックで設定ページを開く
chrome.action.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});
