// @author - KaushikChanabhaiDhola
import { Component, OnInit } from '@angular/core';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alter-system',
  standalone: true,
  imports: [HeaderBarComponent,
    FooterComponent,
    CategoryBarComponent,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './alter-system.component.html',
  styleUrl: './alter-system.component.css'
})
export class AlterSystemComponent implements OnInit {
  selectedValue: number | string = '10';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  
  notifications: any[] = [
    {
      title: 'Product 1',
      description: 'Description of Product 1',
      link: '/trending/item/1'
    },
    {
      title: 'Product 2',
      description: 'Description of Product 2',
      link: '/trending/item/2'
    },
    {
      title: 'Product 3',
      description: 'Description of Product 3',
      link: '/trending/item/2'
    },
    {
      title: 'Product 4',
      description: 'Description of Product 4',
      link: '/trending/item/2'
    },
    {
      title: 'Product 5',
      description: 'Description of Product 5',
      link: '/trending/item/2'
    },
    {
      title: 'Product 6',
      description: 'Description of Product 6',
      link: '/trending/item/2'
    },
    {
      title: 'Product 7',
      description: 'Description of Product 7',
      link: '/trending/item/2'
    },
    {
      title: 'Product 8',
      description: 'Description of Product 8',
      link: '/trending/item/2'
    },
    
    {
      title: 'Product 9',
      description: 'Description of Product 9',
      link: '/trending/item/2'
    },
    {
      title: 'Product 10',
      description: 'Description of Product 10',
      link: '/trending/item/2'
    },
    {
      title: 'Product 11',
      description: 'Description of Product 11',
      link: '/trending/item/2'
    },

  ];
  

  ngOnInit() {
    this.calculatePages();
  }

  calculatePages() {
    const totalItems = this.notifications.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  onChangeNotifications() {
    if (this.selectedValue === 'all') {
      this.itemsPerPage = this.notifications.length;
    } else {
      this.itemsPerPage = +this.selectedValue; 
    }
    this.currentPage = 1;
    this.calculatePages();
  }
}
