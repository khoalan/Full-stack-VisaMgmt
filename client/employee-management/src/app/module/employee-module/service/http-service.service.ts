import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../domain/Contact';
import { Address } from '../domain/Address';
import { Person } from '../domain/Person';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  endPoint = 'http://localhost:8081/';
  logOutUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  getLogOut() {
    return this.http.get(this.logOutUrl + 'logout', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getPerson(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee/person', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getEmployee(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getAddress(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee/addresses', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getContacts(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee/contacts', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getContact(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee/contact', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  getDocName(): Observable<any> {
    console.log(this.http);
    return this.http.get(this.endPoint + 'employee/documents', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      withCredentials: true,
      responseType: 'text',
    });
  }

  putPerson(person: Person) {
    return this.http.put<Person>(
      this.endPoint + 'employee/editPerson',
      person,
      {
        headers: {
          'Allow-Cross-Origin-Origin0': '*',
        },
        withCredentials: true,
        responseType: 'json',
      }
    );
  }

  putContact(contact: Contact): Observable<any> {
    return this.http.put<Contact>(
      this.endPoint + 'employee/editContact',
      contact,
      {
        headers: {
          'Allow-Cross-Origin-Origin0': '*',
        },
        withCredentials: true,
        responseType: 'json',
      }
    );
  }

  putAddress(address: Address): Observable<any> {
    return this.http.put<Address>(
      this.endPoint + 'employee/editAddress',
      address,
      {
        headers: {
          'Allow-Cross-Origin-Origin0': '*',
        },
        withCredentials: true,
        responseType: 'json',
      }
    );
  }

  getError(): Observable<any> {
    return this.http.get(this.endPoint + 'error', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*',
      },
      responseType: 'text',
    });
  }
}
