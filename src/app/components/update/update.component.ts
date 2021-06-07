import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  todo: Todo = {
    titulo: '',
    dataParaFinalizar: new Date(),
    finalizado: false,
  };
  constructor(
    private router: Router,
    private service: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((res) => (this.todo = res));
  }

  update(): void {
    this.formatDate(this.todo.dataParaFinalizar);
    this.service.update(this.todo).subscribe(
      (res) => {
        this.service.message('Tarefa atualizada com sucesso !');
        this.router.navigate(['']);
      },
      (error) => {
        this.service.message('Falha ao atualizar a tarefa !');
        this.router.navigate(['']);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  formatDate(dataParaFinalizar: any): void {
    let data = new Date(dataParaFinalizar);

    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }
}
