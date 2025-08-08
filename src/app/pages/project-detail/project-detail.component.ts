import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService, Project } from '../../core/services/portfolio/portfolio.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [], 
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);
  
  project = signal<Project | undefined>(undefined);

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      const foundProject = this.portfolioService.getProjectById(projectId);
      this.project.set(foundProject);
    }
  }
}