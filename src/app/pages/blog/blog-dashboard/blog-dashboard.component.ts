import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';
import { StripHtmlPipe } from 'src/app/pipes/strip-html.pipe';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SeoService } from '../../../services/seo.service';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-blog-dashboard',
	standalone: true,
	imports: [CommonModule, StripHtmlPipe, LoaderComponent],
	templateUrl: './blog-dashboard.component.html',
	styleUrl: './blog-dashboard.component.scss',
})
export class BlogDashboardComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private router: Router,
		private seoService: SeoService,
	) {}

	public blogPosts: any[] = [];
	public loading: boolean = false;

	async ngOnInit() {
		this.loading = true;

		await this.getBlogs();

		this.loading = false;

		this.seoService.generateTags(
			'Blog',
			'Read my blog posts.',
			'https://clickfirstmarketing.com/wp-content/uploads/Purpose-of-Blogging.jpeg',
		);
	}
	private async getBlogs() {
		let blogsResponse$ = this.strapiService.getBlogs();
		let blogsResponse = (await firstValueFrom(blogsResponse$)) as any[];
		for (const blog of blogsResponse) {
			let blogPost = {
				id: blog.id,
				publishedDate: blog.date_gmt,
				title: blog.title.rendered,
				content: blog.acf.content,
				featured_image_id: blog.featured_media,
				image: null,
			};
			let image$ = await this.getImage(blogPost.featured_image_id);
			let image: any = await firstValueFrom(image$);
			blogPost.image = image.source_url;
			this.blogPosts.push(blogPost);
		}
	}
	public navigateToBlog(id: string) {
		this.router.navigate(['/blog/' + id]);
	}
	public getImage(id: string) {
		return this.strapiService.getMedia(id);
	}
}
