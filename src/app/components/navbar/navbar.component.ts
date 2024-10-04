import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, RouterLinkActive, RouterLink],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
	constructor(private router: Router) {}

	ngOnInit() {
		if (typeof window !== 'undefined') {
			window.addEventListener('DOMContentLoaded', () => {
				const hamburger = window.document.querySelector('.hamburger');
				const nav = window.document.querySelector('nav');

				// @ts-ignore
				hamburger.addEventListener('click', () => {
					// @ts-ignore
					nav.classList.toggle('active');
				});
			});
		}
	}
	ngOnDestroy() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('DOMContentLoaded', () => {});
		}
	}

	public navigateTo(path: string) {
		this.router.navigate([path]);
	}
}
