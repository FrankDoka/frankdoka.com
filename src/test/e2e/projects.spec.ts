import { expect, test } from '@playwright/test'

test.describe('Projects', () => {
  test('projects listing page renders', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByText('Projects').first()).toBeVisible()
  })

  test('at least one project title is visible', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
  })

  test('each project has a "View project" link', async ({ page }) => {
    await page.goto('/projects')
    const links = page.getByRole('link', { name: 'View project' })
    await expect(links.first()).toBeVisible()
  })

  test('clicking "View project" navigates to project detail', async ({ page }) => {
    await page.goto('/projects')
    await page.getByRole('link', { name: 'View project' }).first().click()
    await expect(page).toHaveURL(/\/projects\/.+/)
  })

  test('Cloud Resume Challenge project page renders', async ({ page }) => {
    await page.goto('/projects/cloud-resume-challenge')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('project detail page renders status', async ({ page }) => {
    await page.goto('/projects/cloud-resume-challenge')
    await expect(page.getByText(/Ongoing|Completed|Active/i).first()).toBeVisible()
  })

  test('text-to-speech project page renders', async ({ page }) => {
    await page.goto('/projects/text-to-speech')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
