import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [SidebarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'InsectEmpire';

  ngOnInit(): void {
    initFlowbite();
  }
}
