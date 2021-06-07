import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private router: Router, private service: TodoService) {}

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['']);
  }

  create(): void {
    this.formatDate(this.todo.dataParaFinalizar);

    this.service.create(this.todo).subscribe((response) => {
      this.service.message(`To-do criado com sucesso !`);
      this.router.navigate(['']);
    });
  }
  
  formatDate(dataParaFinalizar: any): void {
    let data = new Date(dataParaFinalizar);

    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }
}
