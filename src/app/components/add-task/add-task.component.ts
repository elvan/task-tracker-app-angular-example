import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text = '';
  day = '';
  reminder = false;

  @Output() addTask = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text) {
      alert('Please enter a task');
      return;
    }

    if (!this.day) {
      alert('Please enter a day');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.addTask.emit(newTask);

    // reset form
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
