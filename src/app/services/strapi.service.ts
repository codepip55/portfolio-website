import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, firstValueFrom } from 'rxjs';
import { EventsService } from './events.service';
import { EventServiceTriggers } from '../models/EventServiceTriggers';

@Injectable({
	providedIn: 'root',
})
export class StrapiService {
	constructor(
		private http: HttpClient,
		private eventsService: EventsService,
	) {}

	private cmsUrl: string = 'http://localhost/wp-json/wp/v2';

	private handleError<T>(err: any, res: T, action: string): Observable<T> {
		console.error(err);
		this.eventsService.broadcast(
			EventServiceTriggers.NEW_ALERT,
			'danger',
			`Failed to ${action}`,
		);
		return of(res);
	}

	getBlog(id: string) {
		return this.http
			.get(`${this.cmsUrl}/blog-posts/${id}`)
			.pipe(
				catchError((err) => this.handleError(err, { blog: null }, 'get blog')),
			);
	}
	getBlogs() {
		return this.http
			.get(`${this.cmsUrl}/blog-posts`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { blogs: null }, 'get blogs'),
				),
			);
	}
	getProject(id: string) {
		return this.http
			.get(`${this.cmsUrl}/projects/${id}`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { project: null }, 'get project'),
				),
			);
	}
	getProjects() {
		return this.http
			.get(`${this.cmsUrl}/projects`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { projects: null }, 'get projects'),
				),
			);
	}
	getDownloads() {
		return this.http
			.get(`${this.cmsUrl}/tools`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { downloads: null }, 'get downloads'),
				),
			);
	}
	getImage(id: string) {
		return this.http
			.get(`${this.cmsUrl}/media/${id}`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { image: null }, 'get image'),
				),
			);
	}
	getUser(id: string) {
		return this.http
			.get(`${this.cmsUrl}/users/${id}`)
			.pipe(
				catchError((err) => this.handleError(err, { user: null }, 'get user')),
			);
	}
}
