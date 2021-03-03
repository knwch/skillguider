import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  imports: [CommonModule],
  exports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    OrderListModule,
    DataViewModule,
  ],
})
export class PrimeNgModule {}
