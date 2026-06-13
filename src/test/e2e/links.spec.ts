import { expect, test } from '@playwright/test'

test.describe('External and internal links', () => {
  test('GitHub social link has correct href', async ({ page }) => {
    await page.goto('/')
    const ghLink = page.getByRole('link', { name: 'GitHub' }).first()
    await expect(ghLink).toHaveAttribute('href', 'https://github.com/FrankDoka')
  })

  test('LinkedIn social link has correct href', async ({ page }) => {
    await page.goto('/')
    const liLink = page.getByRole('link', { name: 'LinkedIn' }).first()
    await expect(liLink).toHaveAttribute('href', 'https://www.linkedin.com/in/frank-doka-64951828b/')
  })

  test('Projects page has anchor quick-links to each project', async ({ page }) => {
    await page.goto('/projects')
    const anchorChips = page.locator('a[href^="#"]')
    const count = await anchorChips.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const chip = anchorChips.nth(i)
      await expect(chip).toBeVisible()
      const href = await chip.getAttribute('href')
      expect(href).toMatch(/^#[a-z0-9-]+$/)
      const targetId = href!.slice(1)
      await expect(page.locator(`#${targetId}`)).toHaveCount(1)
    }
  })

  test('404 page home link points to /', async ({ page }) => {
    await page.goto('/this-does-not-exist')
    await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/')
  })

  test('footer logo link points to /', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer a[aria-label="Home"]')).toHaveAttribute('href', '/')
  })

  test('footer Blog link points to /blog', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer').getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
  })

  test('footer About link points to /about', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('footer').getByRole('link', { name: 'About' })
    await expect(link).toHaveAttribute('href', '/about')
  })
})
