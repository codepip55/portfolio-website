import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Subscription, lastValueFrom, firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-project-info',
	standalone: true,
	imports: [CommonModule, LoaderComponent],
	templateUrl: './project-info.component.html',
	styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
	) {}

	public project: any;
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;
		// @ts-ignore
		this.getProject(this.activatedRoute.snapshot.paramMap.get('id'));
		this.loading = false;
	}

	private async getProject(id: string) {
		let project$ = this.strapiService.getProject(id);
		let project: any = await firstValueFrom(project$);
		console.log(project.acf.content);
		let projectPost = {
			id: project.id,
			publishedDate: project.date_gmt,
			title: project.title.rendered,
			description: project.acf.description,
			content: project.acf.content,
			featuredImageId: project.featured_media,
			image: '',
			authorId: project.author,
			author: null,
		};
		let image$ = await this.getImage(projectPost.featuredImageId);
		let image: any = await firstValueFrom(image$);
		projectPost.image = image.source_url;

		let author$ = this.strapiService.getUser(projectPost.authorId);
		let author: any = await firstValueFrom(author$);
		projectPost.author = author.name;

		this.project = projectPost;

		this.seoService.generateTags(
			projectPost.title,
			projectPost.description,
			projectPost.image,
		);
	}
	public getImage(id: string) {
		return this.strapiService.getMedia(id);
	}
}
