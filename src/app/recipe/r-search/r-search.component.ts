import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipeAutocomplete } from '../models/recipe-autocomplete';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeService } from '../services/recipe.service';
import { LoaderService } from '../../services/loader.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
} from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import {
  searchBarAnimation,
  searchBarItemsAlignment,
} from '../animations/recipe-animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { searchBarAlignmentPosition } from '../enums/search-bar-alignment';
import { webPagePosition } from '../animations/recipe-animations';
import { mainPagePositionBreakpoints } from '../enums/main-page-position-breakpoints';

@Component({
  selector: 'r-search',
  templateUrl: './r-search.component.html',
  styleUrls: ['./r-search.component.scss'],
  animations: [searchBarAnimation, searchBarItemsAlignment, webPagePosition],
})
export class RSearchComponent implements OnInit {
  recipeAutoComplete: FormControl = new FormControl();
  recipeAutoComplete$: Observable<RecipeAutocomplete[]>;
  loading = false;
  spinnerColor: ThemePalette = 'primary';
  isInitial = true;
  searchBarItemsAlignment = searchBarAlignmentPosition.row;

  constructor(
    private recipeService: RecipeService,
    private loaderService: LoaderService,
    private store: StoreService,
    private breakPointObserver: BreakpointObserver
  ) {
    this.onViewPortChange();
  }

  ngOnInit(): void {
    this.onRecipeAutoCompleteValueChange();
  }

  recipeDisplayValue(recipe: RecipeAutocomplete): string {
    return recipe && recipe.title;
  }

  onRecipeSelect(selectedEvent: MatAutocompleteSelectedEvent): void {
    const selectedRecipe: RecipeAutocomplete = selectedEvent.option.value;
    this.isInitial = false;
    this.getRecipeInfo(selectedRecipe.id);
  }

  private onRecipeAutoCompleteValueChange(): void {
    this.recipeAutoComplete$ = this.recipeAutoComplete.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((val) =>
        this.searchRecipes(val).pipe(finalize(() => (this.loading = false)))
      )
    );
  }

  private searchRecipes(query: string): Observable<RecipeAutocomplete[]> {
    return this.recipeService.getRecipeAutoComplete(query);
  }

  private getRecipeInfo(recipeId: number): void {
    this.loaderService.showProgressBar();
    this.recipeService
      .getRecipeInfo(recipeId)
      .pipe(finalize(() => this.loaderService.hideProgressBar()))
      .subscribe((recipeInfo) => this.store.updateRecipeInfo(recipeInfo));
  }

  private onViewPortChange(): void {
    this.breakPointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.Large]) {
          this.searchBarItemsAlignment = searchBarAlignmentPosition.row;
        }

        if (result.breakpoints[Breakpoints.Medium]) {
          this.searchBarItemsAlignment = searchBarAlignmentPosition.column;
        }

        if (result.breakpoints[Breakpoints.Small]) {
          this.searchBarItemsAlignment = searchBarAlignmentPosition.column;
        }
      });
  }
}
