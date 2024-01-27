import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
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

	private cmsUrl: string = 'https://cms-staging.pepijncolenbrander.com/api';

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
			.get(`${this.cmsUrl}/blogs/${id}?populate=*`)
			.pipe(
				catchError((err) => this.handleError(err, { blog: null }, 'get blog')),
			);
	}
	getBlogs() {
		return this.http
			.get(`${this.cmsUrl}/blogs?populate=*`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { blogs: null }, 'get blogs'),
				),
			);
	}
	getProject(id: string) {
		return this.http
			.get(`${this.cmsUrl}/projects/${id}?populate=*`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { project: null }, 'get project'),
				),
			);
	}
	getProjects() {
		return this.http
			.get(`${this.cmsUrl}/projects?populate=*`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { projects: null }, 'get projects'),
				),
			);
	}
	getDownloads() {
		return this.http
			.get(`${this.cmsUrl}/downloads?populate=*`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { downloads: null }, 'get downloads'),
				),
			);
	}
}
