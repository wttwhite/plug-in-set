const ellipsis = {
	install: (Vue) => {
		Vue.directive('ellipsis', (el, binding) => {
			el.style.width = binding.value ? `${binding.value}px` : '100%';
			// if (el.className.indexOf('v-ellipsis') < 0) {
			// 		el.className += ' v-ellipsis'
			// }
			el.style.whiteSpace = 'nowrap';
			el.style.overflow = 'hidden';
			el.style.textOverflow = 'ellipsis';
			el.style.display = 'inline-block';
			el.onmouseenter = hover;
		});
	}
};
const hover = e => {
	const t = e.target;
  t.title = t.clientWidth < t.scrollWidth ? t.innerText : '';
};

export { ellipsis as default };
