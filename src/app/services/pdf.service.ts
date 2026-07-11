import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfSourceSubject = new BehaviorSubject<string>('');
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private pageCountSubject = new BehaviorSubject<number>(0);
  private currentPageSubject = new BehaviorSubject<number>(1);

  public pdfSource$ = this.pdfSourceSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public pageCount$ = this.pageCountSubject.asObservable();
  public currentPage$ = this.currentPageSubject.asObservable();

  loadPdfFromUrl(url: string): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    try {
      this.pdfSourceSubject.next(url);
      this.loadingSubject.next(false);
    } catch {
      this.errorSubject.next('Failed to load PDF');
      this.loadingSubject.next(false);
    }
  }

  loadPdfFromFile(file: File): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const pdfData = event.target?.result as string;
        this.pdfSourceSubject.next(pdfData);
        this.loadingSubject.next(false);
      } catch {
        this.errorSubject.next('Failed to read PDF file');
        this.loadingSubject.next(false);
      }
    };
    reader.onerror = () => {
      this.errorSubject.next('Failed to read PDF file');
      this.loadingSubject.next(false);
    };
    reader.readAsDataURL(file);
  }

  setPageCount(count: number): void {
    this.pageCountSubject.next(count);
  }

  setCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }

  goToPage(page: number): void {
    const pageCount = this.pageCountSubject.value;

    if (page > 0 && page <= pageCount) {
      this.currentPageSubject.next(page);
    }
  }

  nextPage(): void {
    const currentPage = this.currentPageSubject.value;
    const pageCount = this.pageCountSubject.value;

    if (currentPage < pageCount) {
      this.currentPageSubject.next(currentPage + 1);
    }
  }

  previousPage(): void {
    const currentPage = this.currentPageSubject.value;

    if (currentPage > 1) {
      this.currentPageSubject.next(currentPage - 1);
    }
  }

  reset(): void {
    this.pdfSourceSubject.next('');
    this.pageCountSubject.next(0);
    this.currentPageSubject.next(1);
    this.errorSubject.next(null);
  }
}
