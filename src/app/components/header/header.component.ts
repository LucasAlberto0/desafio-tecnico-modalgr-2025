import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuAtivo = false;


  toggleMenu() {
    this.menuAtivo = !this.menuAtivo;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const header = document.querySelector('#header') as HTMLElement;
    if (header) {
      header.classList.toggle('rolagem', window.scrollY > 600);
    }
  }
}
