import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { RecipeInfo, Ingredient } from '../models/recipe-info';
import { Observable } from 'rxjs';
import { slideUpAnimation } from '../animations/recipe-animations';

@Component({
  selector: 'r-info',
  templateUrl: './r-info.component.html',
  styleUrls: ['./r-info.component.scss'],
  animations: [slideUpAnimation],
})
export class RInfoComponent implements OnInit {
  recipe$: Observable<RecipeInfo> = this.store.recipeInfoObs;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  showIngredients(ingredients: Ingredient[]): string {
    return ingredients.reduce(
      (prev, curr) => `${prev ? prev + ', ' : ''}${curr.name}`,
      ''
    );
  }
}
