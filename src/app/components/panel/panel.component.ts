import { Component, HostListener, OnInit } from '@angular/core';
import { ImageObj } from '../../models/image.model';
import { PicsumService } from '../../services/picsum.service';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent implements OnInit {

  images: ImageObj[] = [];
  page: number = 1;
  skeletons: any[] = new Array(30);
  isLoading: boolean = true;
  loadedImages: number = 0;

  constructor(
    private picsumService: PicsumService
  ) { }

  @HostListener("window:scroll", []) onWindowScroll() {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      console.log('CARGA IMG');

    }
  }

  ngOnInit(): void {
    this.getImageList();

    console.log(this.images);
  }

  getImageList() {
    this.picsumService.getImages(this.page).subscribe(
      (data) => {
        this.images.push(...data);
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
