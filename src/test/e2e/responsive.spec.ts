import { expect, test } from '@playwright/test'

test.describe('Responsive layout', () => {
  test('mobile: hamburger button is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /Toggle navigation/i })
    await expect(toggle).toBeVisible()
  })

  test('mobile: home hero heading is visible without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    // Verify no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2) // 2px tolerance
  })

  test('mobile: blog listing articles are visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/blog')
    await expect(page.locator('article').first()).toBeVisible()
  })

  test('mobile: footer is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
  })

  test('desktop: hero heading is visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('desktop: footer renders all nav sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer.getByText('Site Map')).toBeVisible()
    await expect(footer.getByText('Follow me')).toBeVisible()
  })

  test('mobile: 404 page renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/nonexistent-route')
    await expect(page.getByText('404')).toBeVisible()
  })

  test('desktop: blog articles display on the page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/blog')
    await expect(page.locator('article').first()).toBeVisible()
  })
})
