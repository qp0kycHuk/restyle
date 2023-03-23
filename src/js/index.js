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
import ymaps from 'ymaps';
import { WOW } from 'wowjs'

import '../scss/index.scss';

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectCreative, EffectCube]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())


function loadHandler() {
	new WOW({
		animateClass: 'animate__animated'
	}).init()

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



	window.addEventListener('scroll', scrollHandler)
	scrollHandler()

	window.addEventListener('scroll', mapsInit, { once: true })
	document.addEventListener('click', mapsInit, { once: true })


	// examples sliders
	const examples = document.querySelectorAll('.examples-items-slider');
	examples.forEach((block) => {
		const $swiper = block.querySelector('.examples-items-slider-swiper')
		const $prev = block.querySelector('.slider-prev')
		const $next = block.querySelector('.slider-next')
		const $pagination = block.querySelector('.examples-items-pagination')

		new Swiper($swiper, {
			speed: 500,
			spaceBetween: 60,
			slidesPerView: 1,
			noSwipingClass: 'top-no-swiping',
			pagination: {
				el: $pagination,
				clickable: true
			},
			navigation: {
				prevEl: $prev,
				nextEl: $next,
			}
		})
	})




	const items = document.querySelectorAll('.examples-item')
	Array.from(items).forEach((item) => {
		const thumbs = new Swiper(item.querySelector('.examples-item-thumbs'), {
			speed: 500,
			slidesPerView: 4,
			spaceBetween: 24,

		})
		new Swiper(item.querySelector('.examples-item-slider'), {
			speed: 500,
			effect: 'slide',
			spaceBetween: 16,
			slidesPerView: 1.25,

			thumbs: {
				swiper: thumbs
			},
			breakpoints: {
				[MEDIA_SM]: {
					slidesPerView: 1,
				},
				[MEDIA_LG]: {
					effect: "creative",
					slidesPerView: 1,
					creativeEffect: {
						spaceBetween: 0,
						prev: {
							shadow: true,
							translate: [0, 0, -400],
						},
						next: {
							translate: ["120%", 0, 0],
						},
					},
				}
			}

		})
	})

	// reviews sliders
	new Swiper('.reviews-slider', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		// centeredSlides: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false
		},
		speed: 3000,
		loop: true,

	})

	// qwiz
	new Swiper('.qwiz-img', {
		effect: "creative",
		speed: 500,
		touchRatio: 0,
		slidesPerView: 1,
		creativeEffect: {
			prev: {
				shadow: true,
				translate: [0, 0, -400],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		navigation: {
			prevEl: '.qwiz-prev',
			nextEl: '.qwiz-next'
		}
	});

	const qwizSlider = new Swiper('.qwiz-slider', {
		watchSlidesProgress: true,
		speed: 500,
		touchRatio: 0,
		slidesPerView: 1,

		navigation: {
			prevEl: '.qwiz-prev',
			nextEl: '.qwiz-next'
		}
	})

	const $qwiz = document.querySelector('.qwiz');
	new Qwiz($qwiz, qwizSlider).init()

}


function scrollHandler() {
	document.querySelector('.header').classList.toggle('scrolled', window.pageYOffset > 0)
}

let mapInited = false;

function mapsInit() {
	if (mapInited) return;
	mapInited = true

	ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
		const map = new maps.Map('contact-map', {
			center: [45.040661, 38.988896],
			zoom: 16

		})

		const placemark = new maps.Placemark([45.040661, 38.988896], {}, {

			iconLayout: 'default#image',
			iconImageHref: '../img/geo.png',
			iconImageSize: [52, 60],
			iconImageOffset: [-26, -60]

		})
		map.controls.remove('geolocationControl')
		map.controls.remove('searchControl')
		map.controls.remove('trafficControl')
		map.controls.remove('typeSelector')
		map.controls.remove('fullscreenControl')
		map.controls.remove('zoomControl')
		map.controls.remove('rulerControl')
		map.behaviors.disable(['scrollZoom'])
		map.geoObjects.add(placemark)
	});
}