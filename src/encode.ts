import { encodeUrlInEmoji } from './encoderDecoder';

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const emojiInput = document.getElementById('emojiInput');
    const encodeButton = document.getElementById('encodeButton');
    const encodedEmojiOutput = document.getElementById('encodedEmojiOutput');
    const fullUrlOutput = document.getElementById('fullUrlOutput');

    if (!urlInput || !emojiInput || !encodeButton || !encodedEmojiOutput || !fullUrlOutput) {
        console.error('必要なDOM要素が見つかりません。');
        return;
    }

    encodeButton.addEventListener('click', () => {
        const originalUrl = (urlInput as HTMLInputElement).value;
        const baseEmoji = (emojiInput as HTMLInputElement).value;

        if (!originalUrl || !baseEmoji) {
            alert('URLとベース絵文字の両方を入力してください。');
            return;
        }

        const encodedEmoji = encodeUrlInEmoji(baseEmoji, originalUrl);
        encodedEmojiOutput.textContent = encodedEmoji;

        const currentOrigin = window.location.origin;
        const currentPath = window.location.pathname.replace('encode.html', '');
        const githubPagesBaseUrl = `${currentOrigin}${currentPath}`;
        const fullRedirectUrl = `${githubPagesBaseUrl}?q=${encodedEmoji}`;
        fullUrlOutput.textContent = fullRedirectUrl;

        navigator.clipboard.writeText(fullRedirectUrl).then(() => {
            console.log('GitHub Pages URL copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});