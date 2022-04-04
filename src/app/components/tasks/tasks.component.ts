import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnDestroy, OnInit {
  tasks: Task[] = [];
  subscription?: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscription = this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
