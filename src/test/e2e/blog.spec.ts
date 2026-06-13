import { expect, test } from '@playwright/test'

test.describe('Blog', () => {
  test('blog listing page renders', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('blog listing shows at least one article', async ({ page }) => {
    await page.goto('/blog')
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()
  })

  test('each article has a "Read more" link', async ({ page }) => {
    await page.goto('/blog')
    const readMoreLinks = page.getByRole('link', { name: /Read more/i })
    await expect(readMoreLinks.first()).toBeVisible()
  })

  test('clicking "Read more" navigates to blog post', async ({ page }) => {
    await page.goto('/blog')
    await page.getByRole('link', { name: /Read more/i }).first().click()
    await expect(page).toHaveURL(/\/blog\/.+/)
  })

  test('blog post page renders author name', async ({ page }) => {
    await page.goto('/blog')
    await page.getByRole('link', { name: /Read more/i }).first().click()
    await expect(page.getByText('Frank Doka').first()).toBeVisible()
  })

  test('blog post page renders a formatted date', async ({ page }) => {
    await page.goto('/blog')
    await page.getByRole('link', { name: /Read more/i }).first().click()
    const time = page.locator('time').first()
    await expect(time).toBeVisible()
  })

  test('blog listing page has correct title', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle(/Blog/)
  })
})
