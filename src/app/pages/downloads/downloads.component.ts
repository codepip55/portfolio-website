import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { SeoService } from '../../services/seo.service';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-downloads',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './downloads.component.html',
	styleUrl: './downloads.component.scss',
})
export class DownloadsComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private seoService: SeoService,
	) {}

	public downloads: any[] = [];

	ngOnInit(): void {
		this.getDownloads();

		this.seoService.generateTags(
			'Downloads',
			'Download some useful tools.',
			'https://www.flaxfields.co.uk/cms-files/5dce/5dcea80679aa2.jpg',
		);
	}
	async getDownloads() {
		let downloads$ = this.strapiService.getDownloads();
		let downloads: any = await firstValueFrom(downloads$);
		for (const tool of downloads) {
			console.log(tool);
			let toolItem = {
				title: tool.title.rendered,
				description: tool.acf.description,
				url: tool.acf.url,
				file: tool.acf.file,
				tag: tool.acf.tag,
				featuredImageId: tool.featured_media,
				image: '',
			};
			let image$ = this.getMedia(toolItem.featuredImageId);
			let image: any = await firstValueFrom(image$);
			toolItem.image = image.source_url;

			if (toolItem.file) {
				let file$ = this.getMedia(toolItem.file);
				let file: any = await firstValueFrom(file$);
				toolItem.file = file.source_url;
			}

			this.downloads.push(toolItem);
		}
	}
	public getMedia(id: string) {
		return this.strapiService.getMedia(id);
	}
}
