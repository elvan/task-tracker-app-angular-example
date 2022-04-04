import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task?: Task;

  @Output() onDeleteTask = new EventEmitter<number>();
  @Output() onToggleReminder = new EventEmitter<boolean>();

  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  onToggle(id?: number): void {
    if (this.task) {
      this.onToggleReminder.emit(!this.task.reminder);
    }
  }

  onDelete(id?: number): void {
    this.onDeleteTask.emit(id);
  }
}
