import { decodeUrlFromEmoji } from './encoderDecoder';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const encodedEmoji = params.get('q');
    const statusElement = document.getElementById('status');

    if (statusElement) {
        if (encodedEmoji) {
            const decodedUrl = decodeUrlFromEmoji(encodedEmoji);
            if (decodedUrl) {
                statusElement.textContent = `元のURL: ${decodedUrl} へリダイレクトします。`;
                window.location.replace(decodedUrl);
            } else {
                statusElement.textContent = 'エラー: 絵文字からURLをデコードできませんでした。';
                console.error('Failed to decode emoji to URL:', encodedEmoji);
            }
        } else {
            statusElement.textContent = 'エラー: URLに絵文字のクエリパラメータ "q" が見つかりません。';
            console.warn('No "q" parameter found in URL.');
        }
    }
});