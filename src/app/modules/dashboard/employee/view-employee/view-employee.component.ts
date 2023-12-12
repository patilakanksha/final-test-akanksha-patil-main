import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html'
})
export class ViewEmployeeComponent {
  @Input() employee: any;
  @Output() close = new EventEmitter();

  /**
   * The function "onClose" emits a "close" event.
   */
  public onClose(): void {
    this.close.emit()
  }
}
