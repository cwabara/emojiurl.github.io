function byteToVariationSelector(byte) {
    if (byte < 16) {
        return String.fromCodePoint(0xFE00 + byte);
    }
    else {
        return String.fromCodePoint(0xE0100 + (byte - 16));
    }
}
function variationSelectorToByte(variationSelector) {
    const codePoint = variationSelector.codePointAt(0);
    if (codePoint === undefined) {
        return undefined;
    }
    if (codePoint >= 0xFE00 && codePoint <= 0xFE0F) {
        return (codePoint - 0xFE00);
    }
    else if (codePoint >= 0xE0100 && codePoint <= 0xE01EF) {
        return (codePoint - 0xE0100 + 16);
    }
    return undefined;
}
export function encodeUrlInEmoji(baseEmoji, url) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(url);
    let result = baseEmoji;
    for (const byte of bytes) {
        result += byteToVariationSelector(byte);
    }
    return result;
}
export function decodeUrlFromEmoji(encodedEmoji) {
    const decoder = new TextDecoder();
    const bytes = [];
    let foundFirstVariationSelector = false;
    let i = 0;
    while (i < encodedEmoji.length) {
        const codePoint = encodedEmoji.codePointAt(i);
        if (codePoint === undefined) {
            break;
        }
        const char = String.fromCodePoint(codePoint);
        const byte = variationSelectorToByte(char);
        if (byte !== undefined) {
            bytes.push(byte);
            foundFirstVariationSelector = true;
        }
        else {
            if (foundFirstVariationSelector) {
                break;
            }
        }
        i += char.length;
    }
    if (bytes.length === 0) {
        return undefined;
    }
    try {
        return decoder.decode(new Uint8Array(bytes));
    }
    catch (e) {
        console.error("Failed to decode bytes to URL:", e);
        return undefined;
    }
}
