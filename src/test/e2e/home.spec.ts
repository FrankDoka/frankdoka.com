import { expect, test } from '@playwright/test'

test.describe('Home page', () => {
  test('renders hero banner with heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Frank Doka')
  })

  test('renders About Me section', async ({ page }) => {
    await page.goto('/')
    await page.getByText('About Me').first().scrollIntoViewIfNeeded()
    await expect(page.getByText('About Me').first()).toBeVisible()
  })

  test('renders Build Logs section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Build Logs & Deep Dives')).toBeVisible()
  })

  test('renders Skills & Technology section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Skills & Technology').first()).toBeVisible()
  })

  test('renders Projects section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Projects').first()).toBeVisible()
  })

  test('page has correct document title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Frank Doka/)
  })
})
