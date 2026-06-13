import { expect, test } from '@playwright/test'

test.describe('Search', () => {
  test('search button is visible in header', async ({ page }) => {
    await page.goto('/')
    const searchButton = page.getByRole('button', { name: /search/i })
    await expect(searchButton).toBeVisible()
  })

  test('clicking search button opens search dialog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /search/i }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('Ctrl+K opens search dialog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /search/i }).waitFor()
    await page.keyboard.press('Control+k')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible({ timeout: 3000 })
  })

  test('Escape closes search dialog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /search/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
  })

  test('typing in search shows results', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /search/i }).click()
    const input = page.getByRole('dialog').getByRole('textbox')
    await input.fill('portfolio')
    await page.waitForTimeout(500)
    const results = page.getByRole('dialog').locator('a')
    await expect(results.first()).toBeVisible({ timeout: 5000 })
  })

  test('clicking a search result navigates to that page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /search/i }).click()
    const input = page.getByRole('dialog').getByRole('textbox')
    await input.fill('portfolio')
    await page.waitForTimeout(500)
    const firstResult = page.getByRole('dialog').locator('a').first()
    await expect(firstResult).toBeVisible({ timeout: 5000 })
    await firstResult.click()
    await expect(page).not.toHaveURL('/')
  })

  test('404 page has inline search', async ({ page }) => {
    await page.goto('/nonexistent-page-12345')
    await expect(page.getByText('404')).toBeVisible()
    const searchInput = page.getByPlaceholder(/search/i)
    await expect(searchInput).toBeVisible()
  })
})
