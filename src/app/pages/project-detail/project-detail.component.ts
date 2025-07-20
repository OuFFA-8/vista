import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioService, Project } from '../../core/services/portfolio/portfolio.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);
  
  // signal لتخزين بيانات المشروع
  project = signal<Project | undefined>(undefined);

  ngOnInit(): void {
    // قراءة الـ ID من الرابط
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      // جلب بيانات المشروع باستخدام الـ ID
      const foundProject = this.portfolioService.getProjectById(projectId);
      this.project.set(foundProject);
    }
  }
}