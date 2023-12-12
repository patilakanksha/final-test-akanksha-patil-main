import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableEntity } from 'src/app/modules/admin/entities/table-entity';
import { TableBookingEntity } from 'src/app/modules/dashboard/entities/table-booking-entity';
import { BASE_URL, END_POINT } from 'src/assets/global_urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  public getTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLES);
  }

  public addEditTable(data: TableEntity): any {
    if (data.id) {
      // const endpoint = `${BASE_URL + END_POINT.UPDATE_TABLE + data.id}`;
      // return this.httpClient.put(endpoint, data);
      const endpoint = `${BASE_URL + END_POINT.UPDATE_TABLE}`;
      return this.httpClient.post(endpoint, data);
    } else {
      let payload = {name: data.name, number: data.number, description: data.description};
      const endpoint = `${BASE_URL + END_POINT.SAVE_TABLE}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

  public deleteTable(tableId: number): any {
    // return this.httpClient.delete(
    //   `${BASE_URL + END_POINT.DELETE_TABLE + tableId}`
    // );
    let payload: any = { id: tableId };
    return this.httpClient.post(BASE_URL + END_POINT.DELETE_TABLE, payload);
  }

  //#region TABLE BOOKING
  public getbookingTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLE_BOOKING);
  }

  public addEditBookingTable(data: TableBookingEntity): any {
    if (data.id) {
      // const endpoint = `${BASE_URL + END_POINT.UPDATE_BOOKING_TABLE + data.id}`;
      // return this.httpClient.put(endpoint, data);
      const endpoint = `${BASE_URL + END_POINT.UPDATE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, data);
    } else {
      // let payload = {name: data., number: data.number, description: data.description};
      let payload = {
        "tableId": data.tableId,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "status": data.status,
        "userId": localStorage.getItem('role')
      }
      const endpoint = `${BASE_URL + END_POINT.SAVE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

  public deleteBookingTable(tableId: number): any {
    let payload: any = { id: tableId };
    return this.httpClient.post(BASE_URL + END_POINT.DELETE_BOOKING_TABLE, payload);
    // return this.httpClient.delete(
    //   `${BASE_URL + END_POINT.DELETE_BOOKING_TABLE + tableId}`
    // );
  }
  //#endregion
}
