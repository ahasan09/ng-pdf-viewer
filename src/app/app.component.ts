import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from './services/pdf.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxExtendedPdfViewerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private pdfService = inject(PdfService);

  title = 'PDF Viewer';
  pdfUrl = '';
  pdfSource$ = this.pdfService.pdfSource$;
  loading$ = this.pdfService.loading$;
  error$ = this.pdfService.error$;
  currentPage$ = this.pdfService.currentPage$;
  pageCount$ = this.pdfService.pageCount$;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.pdfService.loadPdfFromFile(file);
      } else {
        alert('Please select a valid PDF file');
      }
    }
  }

  loadFromUrl(): void {
    if (this.pdfUrl.trim()) {
      this.pdfService.loadPdfFromUrl(this.pdfUrl);
    }
  }

  nextPage(): void {
    this.pdfService.nextPage();
  }

  previousPage(): void {
    this.pdfService.previousPage();
  }

  goToPage(page: number): void {
    this.pdfService.goToPage(page);
  }
}

