/**
 * @file Styles cache test suite
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import Cache from './cache';

describe('cache', () => {
  it('should create a new cache', () => {
    expect(new Cache());
    expect(new Cache({}));
    expect(new Cache({ plugins: [] }));
  });

  it('should register, render, and clear sheets', () => {
    interface Props {
      background?: string;
    }

    const cache = new Cache<Props>();

    // Static sheet (w/ dynamic styles)
    expect(cache.register({
      button: ({ background }) => ({
        background: background || 'transparent',
      }),
      root: {
        background: '#000',
        color: '#fff',
      },
    })).toBe(cache);
    expect(cache.register({})).toBe(cache);

    // Dynamic sheet
    expect(cache.register(({ background }) => ({
      text: {
        background,
      },
    }))).toBe(cache);
    expect(cache.register(() => ({}))).toBe(cache);

    const styles = cache.render({});
    expect(styles).toEqual({
      button: {
        background: 'transparent',
      },
      root: {
        background: '#000',
        color: '#fff',
      },
      text: {},
    });

    const styles2 = cache.render({ background: '#000' });
    expect(styles2).toEqual({
      button: {
        background: '#000',
      },
      root: {
        background: '#000',
        color: '#fff',
      },
      text: {
        background: '#000',
      },
    });

    expect(cache.clear()).toBe(cache);
    expect(cache.render({ background: '#fff' })).toEqual({});
  });
});
