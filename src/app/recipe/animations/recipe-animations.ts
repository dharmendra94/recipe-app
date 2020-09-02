import { searchBarAlignmentPosition } from '../enums/search-bar-alignment';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const searchBarAnimation = [
  trigger('searchBarPosition', [
    state(
      'initial',
      style({
        top: '20vh',
      })
    ),
    state(
      'final',
      style({
        'border-bottom': '1px solid #e0e0e0',
      })
    ),
    transition('initial => final', [animate('1s 0.2s ease-in-out')]),
  ]),
];

export const slideUpAnimation = [
  trigger('slideUp', [
    state('in', style({ transform: 'translateY(0)' })),
    transition(':enter', [
      style({ transform: 'translateY(150%)' }),
      animate('500ms 500ms'),
    ]),
  ]),
];

export const searchBarItemsAlignment = [
  trigger('searchBarItemsAlignment', [
    state(
      searchBarAlignmentPosition.row,
      style({
        'flex-direction': 'row',
        'justify-content': 'space-between',
      })
    ),
    state(
      searchBarAlignmentPosition.column,
      style({ 'flex-direction': 'column', 'justify-content': 'center' })
    ),
  ]),
];

export const webPagePosition = [
  trigger('webPagePosition', [
    state(
      'large',
      style({
        'max-width': '1032px',
        'margin-left': 'auto',
        'margin-right': 'auto',
      })
    ),
    state(
      'medium',
      style({
        'margin-left': '30px',
        'margin-right': '30px',
      })
    ),
    state(
      'small',
      style({
        'margin-left': '15px',
        'margin-right': '15px',
      })
    ),
  ]),
];
