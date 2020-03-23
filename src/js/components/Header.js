import TweenLite from 'gsap';

export default class {
	constructor() {
		this.header = document.getElementById('header');
		this.search = document.querySelector('.header__search-box');
		this.searchButton = document.querySelector('.header__search-button');
		this.menu = document.querySelector('.header__menu-box-search');
		this.menuButton = document.querySelector('.header__open-menu');
		this.menuMainLinks = [...document.querySelectorAll('.header__menu-item')];
		this.menuLinks = [...document.querySelectorAll('.header__menu-item-link')];
		this.headerMenu = document.querySelector('.header__menu');
		this.headerClass = this.headerMenu.className;
		this.backButton = document.querySelector('.header__back-button');
		this.bindEvents();
	}

  // mobile menu control
	toggleMobileMenu(){
		this.menuButton.addEventListener('click', ()=> {
			if (!document.querySelector('.header__menu-box-search.is-open')){
				this.openMobileMenu()
			} else {
				this.closeMobileMenu();
			}
		})
	}
	openMobileMenu() {
		this.menuButton.classList.add('opened');
		this.menu.classList.add('is-open')
		document.body.style="overflow:hidden"
	}

	closeMobileMenu() {
		this.menuButton.classList.remove('opened');
		this.menu.classList.remove('is-open');
		this.clearMenu();
		document.body.style="overflow:initial";
	}

	openSearchWindow() {
		this.searchButton.addEventListener('click', ()=> {
			this.search.classList.add('is-open')
			TweenLite.to(this.search, 0.4, {maxWidth: '600px'});
		})
	}
	closeOnBodyClick() {
		document.addEventListener('click', e => {
			if (!e.target.closest('.header') && document.querySelector('.header__search-box.is-open')) {
				this.closeSearchWindow();
			}
		})
	  }
	
	closeSearchWindow() {
		TweenLite.fromTo(this.search, 0.4, {maxWidth: '600px'}, {maxWidth: '0px'});
	}

	openSubmenu(){
		if (window.innerWidth < 768){
			this.menuLinks.forEach(link =>{
				let a = link.getAttribute('href');
				link.setAttribute('data-href', a);
				link.removeAttribute('href');
			})
			this.menuMainLinks.forEach(mainLink =>{
				mainLink.addEventListener('click', (e)=>{
					let c = mainLink.className;
					let color = c.split(' ')[1];
					let sub = mainLink.querySelector('.submenu');
					if (this.headerMenu.getAttribute('data-color') != '' && this.hasColor(this.headerMenu)){
						this.headerMenu.setAttribute('data-color', '');
						this.headerMenu.className = this.headerClass;
					} 
					this.headerMenu.setAttribute('data-color', color);
					this.headerMenu.classList.add(color);
					this.headerMenu.classList.add('active');
					sub.classList.add('active');
					this.backButton.classList.add('active');
				})
			})
		}	
	}
	hasColor(item){
		if (item.className.indexOf('item') > -1){
			return true
		}
	}
	backToMenu(){
		this.backButton.addEventListener('click', ()=>{
			this.clearMenu();
		})
	}
	clearMenu(){
		this.headerMenu.setAttribute('data-color', '');
		this.headerMenu.className = this.headerClass;
		this.headerMenu.classList.remove('active');
		let subs = document.querySelectorAll('.submenu');
		subs.forEach(sub =>{
			sub.classList.remove('active');
		})
		this.backButton.classList.remove('active');
	}
	bindEvents() {
		this.openSearchWindow();
		this.toggleMobileMenu();
		this.closeOnBodyClick();
		this.closeSearchWindow(); 
		this.openSubmenu();
		this.backToMenu();
		this.clearMenu();
	}
}
