import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  schemas: []
})
export class ToastComponent implements OnInit {

  message: string = '';
  showToast: boolean = false;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe(message => {
      this.message = message;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 10000);
    });
  }
}
