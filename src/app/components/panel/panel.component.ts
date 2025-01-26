import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ImageObj } from '../../models/image.model';
import { PicsumService } from '../../services/picsum.service';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [NgClass],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent implements OnInit {

  images: ImageObj[] = [];
  page: number = 1;
  skeletons: any[] = new Array(30);
  isLoading: boolean = true;
  loadedImages: number = 0;
  showGrid: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private picsumService: PicsumService
  ) { }

  @HostListener("window:scroll", []) onWindowScroll() {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      console.log('CARGA IMG');
      this.page++
      this.getImageList();
    }
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if ((url[0]?.path).toLowerCase() != 'columns') {
        this.showGrid = true;
      }
    });

    this.getImageList();

    console.log(this.images);
  }

  getImageList() {
    this.picsumService.getImages(this.page).subscribe(
      (data) => {
        this.images.push(...(data.map((image: ImageObj) => ({
          ...image,
          isLoaded: false,
        }))));
        console.log({ data });
        return data
      }
    )
  }

  onImageLoad(event: Event) {
    let imgElement = event.target as HTMLImageElement;
    imgElement.style.opacity = '1';
    this.loadedImages++;

    if (this.loadedImages === this.images.length) {
      this.isLoading = false;
    }
  }

  removeImg(index: number) {
    this.images.splice(index, 1);
  }

}
