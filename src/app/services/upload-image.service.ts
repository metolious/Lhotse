import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api/messageservice';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
