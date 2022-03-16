import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface QueryNative {
  query: string;
  variables?: { [key: string]: any };
}
interface MutationNative {
  mutation: string;
  variables?: { [key: string]: any };
}

@Injectable({ providedIn: 'root' })
export class NativeGraphqlService {
  constructor(private http: HttpClient) {}

  public query<T>(options: QueryNative): Observable<T> {
    return this.http
      .post<{ data: T }>(`http://localhost:4000/graphql`, {
        query: options.query,
        variables: options.variables,
      })
      .pipe(map((d) => d.data));
  }

  public mutate<T>(options: MutationNative): Observable<any> {
    return this.http
      .post<{ data: T }>(`http://localhost:4000/graphql`, {
        query: options.mutation,
        variables: options.variables,
      })
      .pipe(map((d) => d.data));
  }
}
