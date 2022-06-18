import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {

    constructor() { }

    _vcCorreo: string='';
    _objConfiguracion : any;
    _expire : number;


  get objConfiguracion(): any {
      return this._objConfiguracion;
  }

  set objConfiguracion(_objConfiguracion: any) {
      this._objConfiguracion = _objConfiguracion;
  }

    get vcCorreo(): string {
        return this._vcCorreo;
    }

    set vcCorreo(_vcCorreo: string) {
        this._vcCorreo = _vcCorreo;
    }

    get expire(): number {
      return this._expire;
  }

  set expire(_expire: number) {
      this._expire = _expire;
  }


}
