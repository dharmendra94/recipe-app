import { Component, OnInit } from '@angular/core';
import { webPagePosition } from './animations/recipe-animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { mainPagePositionBreakpoints } from './enums/main-page-position-breakpoints';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  animations: [webPagePosition],
})
export class RecipeComponent implements OnInit {
  webPagePosition;
  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.onViewPortChange();
  }

  private onViewPortChange(): void {
    this.breakPointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.Large]) {
          this.webPagePosition = mainPagePositionBreakpoints.large;
        }

        if (result.breakpoints[Breakpoints.Medium]) {
          this.webPagePosition = mainPagePositionBreakpoints.medium;
        }

        if (result.breakpoints[Breakpoints.Small]) {
          this.webPagePosition = mainPagePositionBreakpoints.small;
        }
      });
  }
}
