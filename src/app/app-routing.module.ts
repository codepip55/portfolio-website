import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/project/projects/projects.component';
import { ProjectInfoComponent } from './pages/project/project-info/project-info.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { BlogDashboardComponent } from './pages/blog/blog-dashboard/blog-dashboard.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'project/:id', component: ProjectInfoComponent },
	{ path: 'tools', component: DownloadsComponent },
	{ path: 'blog', component: BlogDashboardComponent },
	{ path: 'blog/:id', component: BlogPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
