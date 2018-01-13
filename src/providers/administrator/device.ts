import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Device } from '../../entities/device';
import { DeviceForm } from '../../forms/deviceform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorDeviceProvider {

  private readonly allDevicesPath: string = "cryptowallet/administrator/TOKEN/device";
  private readonly getDevicePath: string = "cryptowallet/administrator/TOKEN/device/ID";
  private readonly insertDevicePath: string = "cryptowallet/administrator/TOKEN/device";
  private readonly updateDevicePath: string = "cryptowallet/administrator/TOKEN/device/ID";
  private readonly deleteDevicePath: string = "cryptowallet/administrator/TOKEN/device/ID";

  constructor(private http: HttpClient) {}

  public allDevices(token: string): Observable<Response<Array<Device>>> {
    return this.http.get<Response<Array<Device>>>(this.allDevicesPath.replace("TOKEN", token));
  }

  public getDevice(token: string, deviceId: number): Observable<Response<Device>> {
    return this.http.get<Response<Device>>(this.getDevicePath.replace("TOKEN", token).replace("ID", deviceId.toString()));
  }

  public insertDevice(token: string, deviceForm: DeviceForm): Observable<Response<Device>> {
    return this.http.post<Response<Device>>(this.insertDevicePath.replace("TOKEN", token), deviceForm);
  }

  public updateDevice(token: string, deviceForm: DeviceForm): Observable<Response<Device>> {
    return this.http.put<Response<Device>>(this.updateDevicePath.replace("TOKEN", token).replace("ID", deviceForm.id.toString()), deviceForm);
  }

  public deleteDevice(token: string, device: Device): Observable<Response<Device>> {
    return this.http.delete<Response<Device>>(this.deleteDevicePath.replace("TOKEN", token).replace("ID", device.id.toString()));
  }
}