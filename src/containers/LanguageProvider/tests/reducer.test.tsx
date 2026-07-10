import { describe, expect, it } from 'vitest';

import ActionTypes from '../constants';
import languageProviderReducer from '../reducer';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as any)).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: ActionTypes.CHANGE_LOCALE,
        payload: 'de',
      })
    ).toEqual({
      locale: 'de',
    });
  });
});
