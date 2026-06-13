import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('header logo link navigates to home from blog', async ({ page }) => {
    await page.goto('/blog')
    await page.locator('header a[aria-label="Home"]').first().click()
    await expect(page).toHaveURL('/')
  })

  test('hamburger toggle button is accessible', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /Toggle navigation/i })
    await expect(toggle).toBeVisible()
  })

  test('Blog link in expanded menu navigates to /blog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Toggle navigation/i }).click()
    await page.getByRole('link', { name: 'Blog' }).first().click()
    await expect(page).toHaveURL('/blog')
  })

  test('Projects link in expanded menu navigates to /projects', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Toggle navigation/i }).click()
    await page.getByRole('link', { name: 'Projects' }).first().click()
    await expect(page).toHaveURL('/projects')
  })

  test('footer Blog link navigates to /blog', async ({ page }) => {
    await page.goto('/')
    const footerBlogLink = page.locator('footer').getByRole('link', { name: 'Blog' })
    await footerBlogLink.click()
    await expect(page).toHaveURL('/blog')
  })

  test('footer Projects link navigates to /projects', async ({ page }) => {
    await page.goto('/')
    const footerProjectsLink = page.locator('footer').getByRole('link', { name: 'Projects' }).first()
    await footerProjectsLink.click()
    await expect(page).toHaveURL('/projects')
  })

  test('footer logo link navigates to /', async ({ page }) => {
    await page.goto('/blog')
    await page.locator('footer a[aria-label="Home"]').click()
    await expect(page).toHaveURL('/')
  })

  test('404 back-link navigates to home', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await page.getByRole('link', { name: 'Go to the home page' }).click()
    await expect(page).toHaveURL('/')
  })
})
