import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommunicationService } from './services/communication.service';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { ItemPreviewComponent } from './components/item-preview/item-preview.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductPageComponent,
    ProductListComponent,
    HamburgerMenuComponent,
    ItemPreviewComponent,
    NavBarComponent,
    FooterComponent,
    ProductFiltersComponent,
    ProductPageComponent,
    SearchBarComponent,
    SkeletonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
