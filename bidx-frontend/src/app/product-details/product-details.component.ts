import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { Product } from '../shared/models/Product';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../auth.service';

/* @author - snehitroda */

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product!: Product;
  imageUrls!: string[];
  searchTerm: string = ''; // used for navigating back
  isSeller: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDetailsService: ProductDetailsService,
    private authService: AuthService
  ) {}

  productInfo: any;
  selectedImage: string | null = null; // Added variable to store the selected image URL

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
    });

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.isSeller = this.authService.isSeller();
        this.productDetailsService.getProduct(this.productId).subscribe({
          next: (productInfo) => {
            this.productInfo = productInfo;
            console.log('productInfo: ', productInfo);
            this.createImagesUrl(productInfo.images);
          },
          error: (error) => {
            console.error('Error fetching user detail:', error);
          },
        });
      }
    });
  }

  createImagesUrl(images: any) {
    const imageUrls: string[] = Object.values(images);

    console.log('Image URLs: ', imageUrls);

    console.log('logging 1st url: ', imageUrls[1]);
    this.imageUrls = imageUrls;
  }

  createImageUrl(imagesMap: Record<string, string> | undefined): string[] {
    if (!imagesMap) return []; // Return empty array if imagesMap is undefined
    return Object.values(imagesMap);
  }

  selectImage(index: number): void {
    console.log('calling select image... ind: ', index);
    // Set the selectedImage to the corresponding image URL based on the index
    this.selectedImage = this.imageUrls[index];
  }

  backToResults(): void {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchTerm },
    });
  }

  placeBid(product: Product): void {
    this.router.navigate([`/manual-bidding/${product.id}`]);
  }
}
