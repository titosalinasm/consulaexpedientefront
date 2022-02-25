import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {

    constructor() { }

    objData: any = {};
    objListaGeneral: any = {};
    objListaClases: any = {};
    nuProceso: number;
    vcCodArancel: string;
    vcCodUsuarioSel: string;
    vcAccessToken: string;
    _nuIdUsuarioSel: number;
    _nuIdTipoOrigen: number;
    _nuIdTipoDocumento: number;
    _vcCorreo: string;
    _nuIdTipoObra: number;
    _objTerminos: any;
    _vcMontoArancel: string;
    _nuFlagAlta: number;

    objUsuarioSel: any = {};

    /**/
    _nuOrigen: number = 0;
    _nuDestino: number = 0;
    /**/

    // nuevas variables
    _lstConfiguracion: any = {};

    _lstConfig = new Subject();

    _nuIdTipoSolicitud: number;
    _nuIdProcesoSolicitud: number;

    _nuFlagGuardado: number=0;




    obtenerData() {
        return this.objData;
    }

    get dataUsuarioSel(): any {
        return this.objUsuarioSel;
    }

    set dataUsuarioSel(obj: any) {
        this.objUsuarioSel = obj;
    }

    agregarDataGenerica(vcUsuario: any): void {
        this.objData.vcUsuario = vcUsuario;
        this.objData.vcHostName = '10.10.0.112';
    }
    agregarDataAnterior(dataanterior: any): void {
      this.objData =dataanterior;
  }

    agregarAsesoria(obj: any): void {
        this.objData['objAsesoria'] = obj;
    }

    agregarDatosSigno(obj: any): void {
        this.objData['objDatosSigno'] = obj;
    }

    agregarClasificacionSigno(obj: any): void {
        this.objData['lstClases'] = obj;
    }

    agregarPrioridadExtranjera(obj: any): void {
        this.objData['objPrioridadExtr'] = obj;
    }

    agregarDatosPersonales(obj: any): void {
        this.objData['lstPersona'] = obj;
    }

    agregarPago(obj: any): void {
        this.objData['lstPago'] = obj;
    }

    agregarObjPago(obj: any): void {
        this.objData['objPago'] = obj;
    }

    /*agregarPersona(obj: any): void {
        this.objData['lstPersona'] = obj;
    }

    agregarObra(obj: any): void {
        this.objData['objObra'] = obj;
    }

    agregarArchivo(obj: any): void {
        this.objData['lstArchivo'] = obj;
    }

    agregarPago(obj: any): void {
        this.objData['objPago'] = obj;
    }*/

    // setLstConfiguracion(obj: any): void {
    //     this._lstConfiguracion = obj;
    // }

    // getLstConfiguracion() {
    //     return this._lstConfiguracion.asObservable();
    // }

    /*Otros*/
    get listaGeneral(): any {
        return this.objListaGeneral;
    }

    set listaGeneral(obj: any) {
        this.objListaGeneral = obj;
    }

    get listaClases(): any {
      return this.objListaClases;
  }

  set listaClases(obj: any) {
      this.objListaClases = obj;
  }

    get nroProceso(): number {
        return this.nuProceso;
    }

    set nroProceso(nuProceso: number) {
        this.nuProceso = nuProceso;
    }

    get codArancel(): string {
        return this.vcCodArancel;
    }

    set codArancel(vcCodArancel: string) {
        this.vcCodArancel = vcCodArancel;
    }

    get codUsuarioSel(): string {
        return this.vcCodUsuarioSel;
    }

    set codUsuarioSel(vcCodUsuarioSel: string) {
        this.vcCodUsuarioSel = vcCodUsuarioSel;
    }

    get nuIdUsuarioSel(): number {
        return this._nuIdUsuarioSel;
    }

    set nuIdUsuarioSel(_nuIdUsuarioSel: number) {
        this._nuIdUsuarioSel = _nuIdUsuarioSel;
    }

    get codAccessToken(): string {
        return this.vcAccessToken;
    }

    set codAccessToken(vcAccessToken: string) {
        this.vcAccessToken = vcAccessToken;
    }

    get nuIdTipoOrigen(): number {
        return this._nuIdTipoOrigen;
    }

    set nuIdTipoOrigen(_nuIdTipoOrigen: number) {
        this._nuIdTipoOrigen = _nuIdTipoOrigen;
    }

    get nuIdTipoDocumento(): number {
        return this._nuIdTipoDocumento;
    }

    set nuIdTipoDocumento(_nuIdTipoDocumento: number) {
        this._nuIdTipoDocumento = _nuIdTipoDocumento;
    }

    get vcCorreo(): string {
        return this._vcCorreo;
    }

    set vcCorreo(_vcCorreo: string) {
        this._vcCorreo = _vcCorreo;
    }

    get nuIdTipoObra(): number {
        return this._nuIdTipoObra;
    }

    set nuIdTipoObra(_nuIdTipoObra: number) {
        this._nuIdTipoObra = _nuIdTipoObra;
    }

    get nuOrigen(): number {
        return this._nuOrigen;
    }

    set nuOrigen(_nuOrigen: number) {
        this._nuOrigen = _nuOrigen;
    }

    get nuDestino(): number {
        return this._nuDestino;
    }

    set nuDestino(_nuDestino: number) {
        this._nuDestino = _nuDestino;
    }

    get objTerminos(): any {
        return this._objTerminos;
    }

    set objTerminos(_objTerminos: any) {
        this._objTerminos = _objTerminos;
    }

    get montoArancel(): string {
        return this._vcMontoArancel;
    }

    set montoArancel(_vcMontoArancel: string) {
        this._vcMontoArancel = _vcMontoArancel;
    }

    get nuFlagAlta(): number {
        return this._nuFlagAlta;
    }

    set nuFlagAlta(_nuFlagAlta: number) {
        this._nuFlagAlta = _nuFlagAlta;
    }
    /*Otros*/

    /*Nuevas variables*/
    get lstConfiguracion(): any {
        return this._lstConfiguracion;
    }

    set lstConfiguracion(obj: any) {
        this._lstConfiguracion = obj;
    }

    get nuIdTipoSolicitud(): number {
      return this._nuIdTipoSolicitud;
    }

    set nuIdTipoSolicitud(_nuIdTipoSolicitud: number) {
      this._nuIdTipoSolicitud = _nuIdTipoSolicitud;
    }

    get nuIdProcesoSolicitud(): number {
      return this._nuIdProcesoSolicitud;
    }

    set nuIdProcesoSolicitud(_nuIdProcesoSolicitud: number) {
      this._nuIdProcesoSolicitud = _nuIdProcesoSolicitud;
    }

      get nuFlagGuardado(): number {
        return this._nuFlagGuardado;
      }

      set nuFlagGuardado(_nuFlagGuardado: number) {
        this._nuFlagGuardado = _nuFlagGuardado;
    }


    /*Nuevas variables*/
}
