import { test, expect } from '@playwright/test';

test.describe('Music App Authentication and Features', () => {
  const testUser = {
    name: `TestUser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'StrongPassword123!'
  };

  const testSong = {
    title: `Test Song ${Date.now()}`,
    artist: `Test Artist ${Date.now()}`,
    genre: 'Test Genre'
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('User registration flow', async ({ page }) => {
    await page.click('text=Compose Account');

    await page.fill('input[placeholder="Enter your name"]', testUser.name);
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);
    await page.fill('input[placeholder="Confirm your password"]', testUser.password);

    await page.click('button[type="submit"]');
    await expect(page.getByText('Tune In')).toBeVisible({ timeout: 10000 });
  });

  test('User login flow', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);

    await page.click('button[type="submit"]');

    await expect(page.getByText('Your Music Haven')).toBeVisible({ timeout: 10000 });
  });

  test('Add new song functionality', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);
    await page.click('button[type="submit"]');

    await expect(page.getByText('Your Music Haven')).toBeVisible({ timeout: 10000 });

    await page.click('button:text("New Melody")');

    await page.fill('input[placeholder="Enter song title"]', testSong.title);
    await page.fill('input[placeholder="Enter artist name"]', testSong.artist);
    await page.fill('input[placeholder="Enter genre (optional)"]', testSong.genre);

    await page.click('button:text("Create song")');

    await expect(page.getByText(testSong.title)).toBeVisible({ timeout: 10000 });
  });

  test('Search song functionality', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);
    await page.click('button[type="submit"]');

    await expect(page.getByText('Your Music Haven')).toBeVisible({ timeout: 10000 });

    await page.fill('input[placeholder="Search your melodies..."]', testSong.title);

    await page.waitForSelector('.song-card');
    const searchResults = await page.$$('.song-card');
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('Favorite song toggle', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);
    await page.click('button[type="submit"]');

    await expect(page.getByText('Your Music Haven')).toBeVisible({ timeout: 10000 });

    const firstSongCard = await page.$$('.song-card');
    
    if (firstSongCard.length > 0) {
      const favoriteButton = await firstSongCard[0].$('button:has(svg[data-lucide="heart"])');
      
      if (favoriteButton) {
        await favoriteButton.click();
        
        await page.waitForFunction(() => {
          const heartIcon = document.querySelector('button:has(svg[data-lucide="heart"]) svg');
          return heartIcon?.classList.contains('fill-red-500') || 
                 heartIcon?.getAttribute('class')?.includes('fill-red-500');
        }, { timeout: 5000 });
      }
    }
  });

  test('Logout functionality', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', testUser.email);
    await page.fill('input[placeholder="Enter your password"]', testUser.password);
    await page.click('button[type="submit"]');

    await expect(page.getByText('Your Music Haven')).toBeVisible({ timeout: 10000 });

    await page.click('button:text("Logout")');

    await expect(page.getByText('Tune In')).toBeVisible({ timeout: 10000 });
  });
});