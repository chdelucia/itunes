import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItem {
  caption: string;
  link: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  menuItems = signal<MenuItem[]>([
    { caption: 'Itunes', link: ['/expenses'] }
  ]);
  visible = signal<boolean>(false);
}
