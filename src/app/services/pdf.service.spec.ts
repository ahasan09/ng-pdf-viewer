import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty pdf source', (done) => {
    service.pdfSource$.subscribe((source) => {
      expect(source).toBe('');
      done();
    });
  });

  it('should load PDF from URL', (done) => {
    const testUrl = 'https://example.com/test.pdf';
    service.loadPdfFromUrl(testUrl);

    service.pdfSource$.subscribe((source) => {
      expect(source).toBe(testUrl);
      done();
    });
  });

  it('should handle file loading', (done) => {
    const blob = new Blob(['test'], { type: 'application/pdf' });
    const file = new File([blob], 'test.pdf', { type: 'application/pdf' });

    service.loadPdfFromFile(file);

    service.loading$.subscribe((loading) => {
      if (!loading) {
        service.pdfSource$.subscribe((source) => {
          expect(source).toBeTruthy();
          done();
        });
      }
    });
  });

  it('should navigate to next page', () => {
    service.setPageCount(10);
    service.setCurrentPage(1);

    service.nextPage();

    service.currentPage$.subscribe((page) => {
      expect(page).toBe(2);
    });
  });

  it('should navigate to previous page', () => {
    service.setPageCount(10);
    service.setCurrentPage(5);

    service.previousPage();

    service.currentPage$.subscribe((page) => {
      expect(page).toBe(4);
    });
  });

  it('should not go past last page', () => {
    service.setPageCount(10);
    service.setCurrentPage(10);

    service.nextPage();

    service.currentPage$.subscribe((page) => {
      expect(page).toBe(10);
    });
  });

  it('should not go before first page', () => {
    service.setCurrentPage(1);

    service.previousPage();

    service.currentPage$.subscribe((page) => {
      expect(page).toBe(1);
    });
  });

  it('should reset state', () => {
    service.loadPdfFromUrl('https://example.com/test.pdf');
    service.setPageCount(10);
    service.setCurrentPage(5);

    service.reset();

    service.pdfSource$.subscribe((source) => {
      expect(source).toBe('');
    });
    service.pageCount$.subscribe((count) => {
      expect(count).toBe(0);
    });
    service.currentPage$.subscribe((page) => {
      expect(page).toBe(1);
    });
  });
});
