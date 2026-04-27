# Improvement Plan: pdf-viewer

## Overview
Minimal Angular 10 scaffold with no PDF library integrated yet. Essentially an empty starting point.

## Improvements

### Core Feature Implementation (High Priority)
- Choose and integrate a PDF rendering library:
  - `ngx-extended-pdf-viewer` — most feature-rich, wraps Mozilla PDF.js, supports annotations
  - `ng2-pdf-viewer` — lighter weight, good for simple display use cases
  - Direct PDF.js integration — most control, most complexity
- Implement basic PDF viewing: page navigation, zoom, fit-to-width

### Upgrade & Modernize
- Upgrade from Angular 10 to Angular 19+
- Adopt standalone components
- Replace TSLint with ESLint + `@angular-eslint`

### Features to Add
- File upload (drag-and-drop or file picker)
- URL-based PDF loading
- Page thumbnail sidebar
- Text search within the document
- Download and print support
- Annotation tools (highlight, notes)

### Testing
- Add unit tests for the PDF service layer
- Add Playwright e2e tests for file upload and page navigation

### Code Quality
- Enable TypeScript `strict` mode
- Add proper loading and error states

### DevOps
- Add GitHub Actions CI: lint + test + build
