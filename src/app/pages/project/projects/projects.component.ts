import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private router: Router,
		private seoService: SeoService,
	) {}

	public projects: any[] = [];
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;

		// this.strapiService.getProjects().subscribe((projects: any) => {
		// 	let unsortedProjects = projects.data;
		// 	let sortedProjects = unsortedProjects.sort(
		// 		(a, b) =>
		// 			new Date(b.attributes.publishedAt).getTime() -
		// 			new Date(a.attributes.publishedAt).getTime(),
		// 	);
		// 	this.projects = sortedProjects;
		// 	console.log(sortedProjects);
		// });
		this.getProjects();

		this.loading = false;

		this.seoService.generateTags(
			'Projects',
			'View my projects.',
			'https://www.rc.virginia.edu/images/accord/project.png',
		);
	}
	private async getProjects() {
		let projects$ = this.strapiService.getProjects();
		let projects: any = await firstValueFrom(projects$);
		projects = projects.sort(
			(a, b) => new Date(b.date_gmt).getTime() - new Date(a.date_gmt).getTime(),
		);
		for (const project of projects) {
			let projectPost = {
				id: project.id,
				publishedDate: project.date_gmt,
				title: project.title.rendered,
				description: project.acf.description,
				content: project.acf.content,
				featured_image_id: project.featured_media,
				image: null,
			};
			let image$ = await this.getImage(projectPost.featured_image_id);
			let image: any = await firstValueFrom(image$);
			projectPost.image = image.source_url;
			this.projects.push(projectPost);
		}
	}
	public navigateToProject(id: string) {
		this.router.navigate(['/project/' + id]);
	}
	public getImage(id: string) {
		return this.strapiService.getImage(id);
	}
}
