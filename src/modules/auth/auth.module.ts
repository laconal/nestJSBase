import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RoleController } from './api/role.api';
import { RoleService } from './application/services/role.service';
import { RoleRepository } from './infrastructure/persistence/postgres/role-repository/role.repository';
import { UserRoleController } from './api/user-role.api';
import { UserRoleService } from './application/services/user-role.service';
import { UserRepository } from './infrastructure/persistence/postgres/user-repository/user.repository';
import { USER_ROLE_REPOSITORY } from './domain/interfaces/user-role.repository.interface';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './application/services/token.service';
import { UserController } from './api/user.api';
import { UserService } from './application/services/user.service';
import { AuthController } from './api/auth.api';
import { AuthService } from './application/services/auth.service';
import { jwtConfig } from './infrastructure/config/jwt.config';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { PermissionController } from './api/permission.api';
import { PermissionService } from './application/services/permission.service';
import { UserRoleRepository } from './infrastructure/persistence/postgres/user-role-repository/user-role.repository';

@Module({
  imports: [JwtModule.register({
    privateKey: jwtConfig.access.privateKey,
    publicKey: jwtConfig.access.publicKey,
    signOptions: {
      algorithm: "RS256",
      expiresIn: jwtConfig.access.expiresIn
    }
  }), DatabaseModule],

  controllers: [UserController, RoleController, UserRoleController, AuthController, PermissionController],

  providers: [TokenService, AuthGuard, UserService, RoleService, RoleRepository, AuthService,
    UserRoleService, UserRepository, PermissionService,
    { provide: USER_ROLE_REPOSITORY, useClass: UserRoleRepository },
  ],

  exports: [TokenService, AuthGuard]
})

export class AuthModule {}

export const authDatabaseSchemaPaths = [
  "./src/modules/auth/infrastructure/persistence/postgres/user-repository/user.model.ts",
  "./src/modules/auth/infrastructure/persistence/postgres/role-repository/role.model.ts",
  "./src/modules/auth/infrastructure/persistence/postgres/user-role-repository/user-role.model.ts"
]
