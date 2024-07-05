import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, RouterLinkActive, RouterLink],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	constructor(private router: Router) {}

	public navigateTo(path: string) {
		this.router.navigate([path]);
	}
}
