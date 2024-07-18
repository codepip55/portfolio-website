import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Subscription, firstValueFrom, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-blog-page',
	standalone: true,
	imports: [CommonModule, ImageUrlPipe, LoaderComponent],
	templateUrl: './blog-page.component.html',
	styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
	) {}

	public blog;
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;

		let blogId = this.activatedRoute.snapshot.paramMap.get('id');
		// @ts-ignore
		this.getBlog(blogId).then(() => {
			this.loading = false;
		});
	}

	private async getBlog(id: string): Promise<Subscription> {
		let blog = this.strapiService.getBlog(id);
		let blogSub = blog.subscribe((b: any) => {
			this.blog = b;

			this.seoService.generateTags(
				b.data.attributes.title,
				b.data.attributes.body,
				b.data.attributes.cover_image,
			);
		});
		return blogSub;
	}
}
