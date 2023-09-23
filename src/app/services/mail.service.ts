import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private serverUrl = 'http://localhost:3002/send-email'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any) {
    return this.http.post<{msg :any}>(this.serverUrl, emailData);
  }
}

