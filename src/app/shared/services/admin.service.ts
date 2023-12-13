import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableEntity } from 'src/app/modules/admin/entities/table-entity';
import { ProfileEntity } from 'src/app/modules/dashboard/entities/profile-entity';
import { TableBookingEntity } from 'src/app/modules/dashboard/entities/table-booking-entity';
import { BASE_URL, END_POINT } from 'src/assets/global_urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  //#Tables region
  public getTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLES);
  }

  public addEditTable(data: TableEntity): any {
    if (data.id) {
      const endpoint = `${BASE_URL + END_POINT.UPDATE_TABLE}`;
      return this.httpClient.post(endpoint, data);
    } else {
      let payload = {name: data.name, number: data.number, description: data.description};
      const endpoint = `${BASE_URL + END_POINT.SAVE_TABLE}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

  public deleteTable(tableId: number): any {
    let payload: any = { id: tableId };
    return this.httpClient.post(BASE_URL + END_POINT.DELETE_TABLE, payload);
  }

  //#region TABLE BOOKING
  public getbookingTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLE_BOOKING);
  }

  public addEditBookingTable(data: TableBookingEntity): any {
    debugger;
    if (data.id) {
      let updatePayload = {
        "id": data.id,
        "tableId": data.tableId,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "status": data.status,
        "userId": localStorage.getItem('userId')
      }
      console.log("Data",updatePayload);
      const endpoint = `${BASE_URL + END_POINT.UPDATE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, updatePayload);
    } else {
      let payload = {
        "tableId": data.tableId,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "status": data.status,
        "userId": localStorage.getItem('userId')
      }
      const endpoint = `${BASE_URL + END_POINT.SAVE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

  public deleteBookingTable(tableId: number): any {    
    let payload: any = { id: tableId };
    return this.httpClient.post(BASE_URL + END_POINT.DELETE_BOOKING_TABLE, payload);
  }


  //#region User Profile
  public getUser(): any {
    const loggedInUserId :string|null = localStorage.getItem('userId');

    let payload = {
      id: loggedInUserId,
    };

    const endpoint = `${BASE_URL + END_POINT.GET_USER_BY_ID}`;
    return this.httpClient.post(endpoint, payload);
  }

  public addEditUser(data: ProfileEntity): any {
    if (data.id) {
      const endpoint = `${BASE_URL + END_POINT.UPDATE_PROFILE}`;
      return this.httpClient.post(endpoint, data);
    } else {
      let payload = {
        "firstName": data.firstName,
        "lasName": data.lastName,
        "email": data.email,
        "gender": data.gender,
        "password": data.password,
      }
      const endpoint = `${BASE_URL + END_POINT. REGISTER_USER}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

  //#Manager
  //Edit Booking Status of table
  public editBookingStatus(data: TableBookingEntity): any {
    if (data.id) {
      const endpoint = `${BASE_URL + END_POINT.UPDATE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, data);
    } else {
      let payload = {
        "tableId": data.tableId,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "status": data.status,
        "userId": localStorage.getItem('userId')
      }
      const endpoint = `${BASE_URL + END_POINT.SAVE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, payload);
    }
  }

}
