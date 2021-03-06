import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { WidgetService } from 'src/app/services/widget.service';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnDestroy, OnInit {
  tasks: Task[] = [];

  listTasksSub?: Subscription;
  addTaskSub?: Subscription;
  toggleReminderSub?: Subscription;
  deleteTaskSub?: Subscription;

  showAddTask?: boolean;
  widgetSub?: Subscription;

  constructor(
    private taskService: TaskService,
    private widget: WidgetService
  ) {}

  ngOnInit(): void {
    this.listTasksSub = this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.widgetSub = this.widget.onToggle().subscribe((showAddTask) => {
      this.showAddTask = showAddTask;
    });
  }

  ngOnDestroy(): void {
    this.listTasksSub?.unsubscribe();
    this.addTaskSub?.unsubscribe();
    this.toggleReminderSub?.unsubscribe();
    this.deleteTaskSub?.unsubscribe();
    this.widgetSub?.unsubscribe();
  }

  addTask(task: any) {
    this.addTaskSub = this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  toggleReminder(task?: Task): void {
    if (task) {
      task.reminder = !task.reminder;

      this.toggleReminderSub = this.taskService
        .updateTaskReminder(task)
        .subscribe((task) => {
          this.tasks = this.tasks.map((t) => {
            if (t.id === task.id) {
              t.reminder = task.reminder;
            }
            return t;
          });
        });
    }
  }

  deleteTask(id?: number): void {
    if (id) {
      this.deleteTaskSub = this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      });
    }
  }
}
