import {
  Component,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PostData } from '../classes/post-data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass'],
})
export class PostListComponent {
  @Input() dataPost!: PostData;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges();
    console.log(this.dataPost);
  }
}
