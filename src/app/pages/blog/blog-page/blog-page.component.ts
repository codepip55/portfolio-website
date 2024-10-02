import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Subscription, firstValueFrom, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-blog-page',
	standalone: true,
	imports: [CommonModule, LoaderComponent],
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
		this.getBlog(blogId);

		this.loading = false;
	}

	private async getBlog(id: string) {
		let blog$ = this.strapiService.getBlog(id);
		let blog: any = await firstValueFrom(blog$);
		let blogPost = {
			id: blog.id,
			publishedDate: blog.date_gmt,
			title: blog.title.rendered,
			description: blog.acf.description,
			content: blog.acf.content,
			featuredImageId: blog.featured_media,
			image: '',
			authorId: blog.author,
			author: null,
		};
		let image$ = await this.getImage(blogPost.featuredImageId);
		let image: any = await firstValueFrom(image$);
		blogPost.image = image.source_url;

		let author$ = this.strapiService.getUser(blogPost.authorId);
		let author: any = await firstValueFrom(author$);
		blogPost.author = author.name;

		this.blog = blogPost;

		this.seoService.generateTags(
			blogPost.title,
			blogPost.description,
			blogPost.image,
		);
	}
	public getImage(id: string) {
		return this.strapiService.getMedia(id);
	}
}
