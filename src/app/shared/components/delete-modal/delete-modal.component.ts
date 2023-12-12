import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent {
  @Output() close = new EventEmitter();
  @Output() confirmedDelete = new EventEmitter();

  /**
   * The function "onClose" emits a "close" event.
   */
  public onClose(): void {
    this.close.emit();
  }

  /**
   * The delete function emits a confirmedDelete event.
   */
  public delete(): void {
    this.confirmedDelete.emit();
  }
}
