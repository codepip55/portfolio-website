import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from 'src/app/components/window/window.component';
import { SeoService } from '../../services/seo.service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, WindowComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	constructor(private seoService: SeoService) {}

	public projects: any[] = [];
	public loading: boolean = false;

	ngOnInit() {
		this.seoService.generateTags(
			'Pepijn Colenbrander',
			'Pepijn Colenbrander is a full-stack developer from the Netherlands.',
			'https://cms.pepijncolenbrander.com/uploads/working_at_peek_22c9d9b659.jpeg',
		);

		window.addEventListener('scroll', () => {
			const scroll = window.scrollY;
			const image = document.querySelector('.image');
			// @ts-ignore
			image!.style.transform = `scale(${
				1 + scroll * 0.0005 < 1.3 ? 1 + scroll * 0.0005 : 1.3
			})`;
		});
	}
}
