import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<<< HEAD:src/app/localisation/localisation.module.ts
import { Localisation } from './localisation.page';
========
>>>>>>>> 9b99ec2fb9ede524632c16d0237e4a452bd6c398:src/app/login/login.module.ts

import { IonicModule } from '@ionic/angular';

<<<<<<<< HEAD:src/app/localisation/localisation.module.ts
import { LocalisationModuleRoutingModule } from './localisation-routing.module';
========
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
>>>>>>>> 9b99ec2fb9ede524632c16d0237e4a452bd6c398:src/app/login/login.module.ts

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
<<<<<<<< HEAD:src/app/localisation/localisation.module.ts
    LocalisationModuleRoutingModule
  ],
  declarations: [Localisation]
})
export class LocalisationModule {}
========
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
>>>>>>>> 9b99ec2fb9ede524632c16d0237e4a452bd6c398:src/app/login/login.module.ts
