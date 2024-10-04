import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private seoService: SeoService) {}

	public projects: any[] = [];
	public loading: boolean = false;

	ngOnInit() {
		this.seoService.generateTags(
			'Pepijn Colenbrander',
			'Pepijn Colenbrander is a full-stack developer from the Netherlands.',
			'https://cms.pepijncolenbrander.com/uploads/working_at_peek_22c9d9b659.jpeg',
		);

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				const scroll = window.scrollY;
				const image = document.querySelector('.image');
				// Get 70% of the screen width
				const startWidth =
					window.innerWidth < 1200
						? window.innerWidth * 0.8
						: window.innerWidth * 0.7;
				// Get 80% of the screen width
				const maxWidth = window.innerWidth * 0.9;
				let endWidth: number;
				// @ts-ignore;
				const scaledImageWidth = startWidth * (1 + scroll * 0.0005);
				// If scaledImageWidth is more than 80vw, set it to 80vw
				if (scaledImageWidth > maxWidth) {
					// @ts-ignore
					endWidth = maxWidth;
				} else {
					// @ts-ignore
					endWidth = scaledImageWidth;
				}
				// Calculate scale factor
				const scaleFactor = endWidth / startWidth;
				// Scale image
				// @ts-ignore
				image.style.transform = `scale(${scaleFactor})`;
			});
		}
	}
	ngOnDestroy() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', () => {});
		}
	}
}
