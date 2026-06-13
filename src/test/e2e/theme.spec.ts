import { expect, test } from '@playwright/test'

test.describe('Theme toggle', () => {
  test('theme toggle button is visible', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /switch to (light|dark) mode/i })
    await expect(toggle).toBeVisible()
  })

  test('clicking toggle switches data-theme attribute', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')

    await page.getByRole('button', { name: /switch to (light|dark) mode/i }).click()

    const newTheme = await html.getAttribute('data-theme')
    expect(newTheme).not.toBe(initialTheme)
  })

  test('theme persists across page navigation', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')

    await page.getByRole('button', { name: /switch to (light|dark) mode/i }).click()
    const toggledTheme = await html.getAttribute('data-theme')
    expect(toggledTheme).not.toBe(initialTheme)

    await page.goto('/blog')
    const afterNavTheme = await html.getAttribute('data-theme')
    expect(afterNavTheme).toBe(toggledTheme)
  })

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')

    await page.getByRole('button', { name: /switch to (light|dark) mode/i }).click()
    const toggledTheme = await html.getAttribute('data-theme')

    await page.reload()
    const afterReloadTheme = await html.getAttribute('data-theme')
    expect(afterReloadTheme).toBe(toggledTheme)
  })

  test('toggle button label updates after click', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')
    const expectedLabel = initialTheme === 'dark' ? 'Switch to dark mode' : 'Switch to light mode'

    await page.getByRole('button', { name: /switch to (light|dark) mode/i }).click()
    await expect(page.getByRole('button', { name: expectedLabel })).toBeVisible({ timeout: 3000 })
  })
})
