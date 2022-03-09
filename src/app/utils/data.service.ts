import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService<T> {
    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
    ) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        })
    };

    // Obtiene todos los objetos
    public getAll$(): Observable<any> {
        return this.httpClient.get<any>(this.endPoint, this.httpOptions);
    }



    public getFile$(vc_file: any): Observable<Blob> {

        const headers = new HttpHeaders().set('authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
        return this.httpClient.get<Blob>(this.endPoint + vc_file, { responseType: 'blob' as 'json' });
    }

    public postImagen$(vc_imagen: any): Observable<Blob> {
        return this.httpClient.post<Blob>(this.endPoint + vc_imagen, { responseType: 'blob' as 'json' });
    }

    // Obtiene un objeto por filtros
    public getWithQuery$(params: any): Observable<any> {
        return this.httpClient.get<T>(this.endPoint, { params: params, headers: this.httpOptions.headers });
    }

    // Obtiene un objeto por id
    public getById$(id: string): Observable<any> {
        return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
    }

    public getWithPost$(params: any): Observable<any> {

        return this.httpClient.post<T>(this.endPoint, params);
    }

    public setFileWithPost$(formData: FormData): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            })
        };
        return this.httpClient.post<T>(this.endPoint, formData);
    }

    // Agrega un nuevo objeto
    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    // Actualiza el objeto parcialmente
    public patch$(id: string, partialEntity: T): Observable<T> {
        return this.httpClient.patch<T>(`${this.endPoint}/${id}/`, partialEntity);
    }

    // Actualiza toda el objeto
    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity);
    }

    // Elimina un objeto
    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
    }
}
