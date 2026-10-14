const DEFAULT_PAC_URL = 'http://127.0.0.1:1024/';

const form = document.getElementById('form');
const input = document.getElementById('pac-url');
const clearButton = document.getElementById('clear');
const statusElement = document.getElementById('status');
const messageElement = document.getElementById('message');

const showMessage = (text = '') => {
	messageElement.textContent = text;
};

const renderStatus = async () => {
	const { value, levelOfControl } = await chrome.proxy.settings.get({});
	const lines = [`mode: ${value.mode}`];
	if (value.mode === 'pac_script' && value.pacScript) {
		lines.push(`url: ${value.pacScript.url || '(data)'}`);
	}
	if (levelOfControl === 'controlled_by_other_extensions') {
		lines.push('※ 他の拡張機能がプロキシ設定を管理しています');
	} else if (levelOfControl === 'not_controllable') {
		lines.push('※ ポリシー等によりプロキシ設定を変更できません');
	}
	statusElement.textContent = lines.join('\n');
};

const applyPacUrl = async url => {
	// 同じ URL を再設定しても PAC が再取得されないことがあるため、一度解除してから設定する (Chrome での実動作は未確認)
	await chrome.proxy.settings.clear({});
	await chrome.proxy.settings.set({
		value: {
			mode: 'pac_script',
			pacScript: {
				url,
				mandatory: false,
			},
		},
	});
};

form.addEventListener('submit', async event => {
	event.preventDefault();
	showMessage();
	const url = input.value.trim();
	try {
		await applyPacUrl(url);
		await chrome.storage.sync.set({ pacUrl: url });
	} catch (err) {
		showMessage(`適用に失敗しました: ${err.message}`);
	}
	await renderStatus();
});

clearButton.addEventListener('click', async () => {
	showMessage();
	try {
		await chrome.proxy.settings.clear({});
	} catch (err) {
		showMessage(`解除に失敗しました: ${err.message}`);
	}
	await renderStatus();
});

chrome.proxy.onProxyError.addListener(details => {
	showMessage(`プロキシエラー: ${details.error} ${details.details}`);
});

(async () => {
	const { pacUrl } = await chrome.storage.sync.get({ pacUrl: DEFAULT_PAC_URL });
	input.value = pacUrl;
	await renderStatus();
})();
