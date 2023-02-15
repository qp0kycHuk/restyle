import showPass from "./show-pass";
import fancybox from "./fancybox";
import rangeSlider from './range-slider';
import theme from './theme';
import inputmask from "./inputmask";
import scrollTo from "./scrollTo";
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectCreative, EffectCube } from 'swiper';
import Qwiz from "./qwiz";

import '../scss/index.scss';

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectCreative, EffectCube]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
	fancybox.init()
	showPass.init()
	scrollTo.init()
	rangeSlider.init()
	tab.init()
	toggle.init()
	ripple.init()
	theme.init()
	inputmask.init(document)

	ripple.attach('.btn')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')

	const $qwiz = document.querySelector('.qwiz');
	const qwizSlider = $qwiz.querySelector('.qwiz-content .swiper').swiper;
	new Qwiz($qwiz, qwizSlider).init()

	window.addEventListener('scroll', scrollHandler)
	scrollHandler()
}


function scrollHandler() {
	document.querySelector('.header').classList.toggle('scrolled', window.pageYOffset > 0)
}