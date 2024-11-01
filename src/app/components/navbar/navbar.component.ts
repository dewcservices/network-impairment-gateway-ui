import { Component } from '@angular/core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  faGithub = faGithub
}
