import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { FileBody } from '../module/employee-module/domain/FileBody';

const httpOptions = {
  headers: new HttpHeaders({
    'Allow-Cross-Origin-Origina0': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  FILE_URL = 'http://localhost:8081';
  fileDomain: FileBody;
  constructor(private http: HttpClient, private messenger: MessageService) {}

  upload(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.FILE_URL}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.FILE_URL}/download?fileName=${filename}`, {
      observe: 'events',
      responseType: 'blob',
      withCredentials: true,
    });
  }

  uploadVisa(dt: string, fn: string): Observable<any> {
    return this.http.post<any>(
      `${this.FILE_URL}/uploadVisa/${dt}/${fn}`,
      {},
      httpOptions
    );
  }

  uploadAvt(newAvt: string): Observable<any> {
    return this.http.post<any>(`${this.FILE_URL}/employee/editAvatar/${newAvt}`,{}, {
      observe: 'events',
      withCredentials: true,
    });
  }

  // upload(file: File, url: string) {
  //   if (!file) {
  //     return of<string>();
  //   }

  //   //upload url
  //   const req = new HttpRequest('POST', url, file, {
  //     reportProgress: true,
  //   });

  //   return this.http.request(req).pipe(
  //     map((event) => this.getEventMessage(event, file)),
  //     tap((message) => this.showProgress(message)),
  //     last(),
  //     catchError(this.handleError(file))
  //   );
  // }

  // private getEventMessage(event: HttpEvent<any>, file: File) {
  //   switch (event.type) {
  //     case HttpEventType.Sent:
  //       return `Uploading file "${file.name}" of size ${file.size}.`;

  //     case HttpEventType.UploadProgress:
  //       const percentDone = Math.round(
  //         (100 * event.loaded) / (event.total ?? 0)
  //       );
  //       return `File "${file.name}" is ${percentDone}% uploaded.`;

  //     case HttpEventType.Response:
  //       return `File "${file.name}" was completely uploaded!`;

  //     default:
  //       return `File "${file.name}" surprising upload event: ${event.type}.`;
  //   }
  // }

  // private handleError(file: File) {
  //   const userMessage = `${file.name} upload failed.`;

  //   return (error: HttpErrorResponse) => {
  //     console.error(error);

  //     const message =
  //       error.error instanceof Error
  //         ? error.error.message
  //         : `server returned code ${error.status} with body "${error.error}"`;

  //     this.messenger.add(`${userMessage} ${message}`);
  //     return of(userMessage);
  //   };
  // }

  // private showProgress(message: string) {
  //   this.messenger.add(message);
  // }
}
