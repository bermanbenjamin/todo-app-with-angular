import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
})
export class ReadAllComponent implements OnInit {
  closed = 0;

  list: Todo[] = [];

  listFinishedTodos: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      response.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinishedTodos.push(todo);
        } else {
          this.list.push(todo);
        }
      });
      this.closed = this.listFinishedTodos.length;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((response) => {
      if (response === null) {
        this.service.message('Todo removido com sucesso');
        this.list = this.list.filter((todo) => todo.id != id);
      }
    });
  }

  finish(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe((response) => {
      this.service.message('Todo finalizado com sucesso !');
      this.list = this.list.filter((todo) => todo.id != item.id);
      this.closed++;
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados']);
  }
}
