import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  title = 'TaskTracker';

  showAddTask?: boolean;
  widgetSub?: Subscription;

  constructor(private widget: WidgetService) {}

  ngOnInit(): void {
    this.widgetSub = this.widget.onToggle().subscribe((showAddTask) => {
      this.showAddTask = showAddTask;
    });
  }

  ngOnDestroy(): void {
    this.widgetSub?.unsubscribe();
  }

  toggleAddTask() {
    this.widget.toggleAddTask();
  }
}
