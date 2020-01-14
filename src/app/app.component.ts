import { Component } from '@angular/core';
import { ApiService, prepareDBUrl } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isPrepareDbSuccess: boolean = false

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get(prepareDBUrl).subscribe(res => {
      this.isPrepareDbSuccess = res.success
    })
  }

}
