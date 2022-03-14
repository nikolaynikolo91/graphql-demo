import { Injectable } from '@angular/core';
import { HttpBatchLink } from 'apollo-angular-link-http-batch/http-batch-link';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

@Injectable({
  providedIn: 'root',
})
export class ApolloBachingService {
  public link = new BatchHttpLink({
    uri: 'http://localhost:4000/graphql',
    batchMax: 5, // No more than 5 operations per batch
    batchInterval: 20, // Wait no more than 20ms after first batched operation
  });

  constructor(private batching: BatchHttpLink) {}
}
