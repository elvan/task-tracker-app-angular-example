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
  listTasksSub?: Subscription;
  toggleReminderSub?: Subscription;
  deleteTaskSub?: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.listTasksSub = this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.listTasksSub?.unsubscribe();
    this.deleteTaskSub?.unsubscribe();
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
