import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent {
  @Output() modalEvent = new EventEmitter<boolean>();

  setMessageModal(message: boolean) {
    this.modalEvent.emit(message);
  }
}
