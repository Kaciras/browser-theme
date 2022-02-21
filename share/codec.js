const escapes = {
	'"': "'",
	"%": "%25",
	"#": "%23",
	"{": "%7B",
	"}": "%7D",
	"<": "%3C",
	">": "%3E",
};

/**
 * SVG 可以使用比 Base64 更高效的 DataURL 编码。
 *
 * @see https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/
 */
export function encodeSVG(code) {
	return code.replaceAll(/["%#{}<>]/g, v => escapes[v]);
}

/**
 * 将 Blob 对象转为 base64 编码的 Data-URL 字符串。
 *
 * 【其他方案】
 * 如果可能，使用 URL.createObjectURL + URL.revokeObjectURL 性能更好。
 *
 * @param blob Blob对象
 * @return Data-URL 字符串
 */
export function blobToBase64URL(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

/**
 * 方便的 Hash 函数，接受字节类数据，输出 base64url 字符串。
 *
 * @param data {BufferSource} 数据
 * @return {Promise<string>} Hash 字符串
 */
export async function sha256(data) {
	const digest = await crypto.subtle.digest("SHA-256", data);
	const bytes = new Uint8Array(digest);
	const base64 = btoa(String.fromCharCode(...bytes));
	return base64.replaceAll("/", "_").replaceAll("+", "-");
}
