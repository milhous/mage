const root: HTMLHtmlElement = document.getElementsByTagName('html')[0];
const NATIVE_W: number = 768;
const flexible = () => {
	let w: number = document.documentElement.clientWidth;
	w = w > NATIVE_W ? NATIVE_W : w;
	let cw = w / (NATIVE_W / 100);
	root.style.fontSize = cw + 'px';
}

let timer: number = null;

flexible();

window.onresize = function () {
	if (timer !== null) {
		clearTimeout(timer);
	}

	timer = window.setTimeout(() => {
		flexible();

		timer = null;
	}, 20);
};