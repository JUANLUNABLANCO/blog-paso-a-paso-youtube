import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, map, throwError } from 'rxjs';

import { User } from '../../interfaces/user.interface';

import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

const BASE_URL = `${environment.API_URL}`;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  private subscription: Subscription;
  protected baseUrl: string = BASE_URL;

  user: User = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      // TODO  aquí podrías habilitar una lógica llamando al authService.getUserBehaviorId, para ver si ambos son iguales y si no es admin, no permitirle acceso, pero vamos eso se soluciona con el guatd UserIsUserGuard
      this.userId = parseInt(params['id']);
      this.usersService
        .getUserById(this.userId)
        .pipe(map((user: User) => (this.user = user)))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
