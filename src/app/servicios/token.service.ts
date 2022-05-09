import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../utils/endpoints';
import { DataService } from '../utils/data.service';
import { IResponse } from '../utils/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends DataService<IResponse> {

  constructor(
    protected httpClient: HttpClient,
) {
    super(httpClient, environment.apiURL.apiUrlServiceOauth + END_POINTS.token.oauth);
}
}
