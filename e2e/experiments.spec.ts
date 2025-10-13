import { expect, test } from '@playwright/test'

test.describe('Experiments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experiments')
  })

  test('displays experiments page with correct title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /^Experiments$/i })
    ).toBeVisible()
    await expect(
      page.getByText(/ongoing research and experimental projects/i)
    ).toBeVisible()
  })

  test('shows stats grid', async ({ page }) => {
    // Use more specific selectors to avoid strict mode violations
    await expect(page.locator('text=Active').first()).toBeVisible()
    await expect(page.locator('text=Completed').first()).toBeVisible()
    await expect(page.locator('text=Technologies').first()).toBeVisible()
    await expect(page.locator('text=Media Files').first()).toBeVisible()
  })

  test('displays filter tabs for experiments', async ({ page }) => {
    await expect(page.getByRole('button', { name: /^All/i })).toBeVisible()
    // Use more specific selector to avoid conflict with experiment cards
    await expect(
      page.getByRole('button', { name: /Active \(\d+\)/i })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: /Completed \(\d+\)/i })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: /AI \(\d+\)/i })
    ).toBeVisible()
  })

  test('displays experiment cards', async ({ page }) => {
    // Check for experiment titles from our data
    await expect(
      page.getByText('Real-time Neural Style Transfer')
    ).toBeVisible()
    await expect(page.getByText('Hand Gesture 3D Interface')).toBeVisible()
  })

  test('shows experiment status indicators', async ({ page }) => {
    // Look for status indicators in experiment cards (case-insensitive)
    const statusElements = page.locator('text=/active|completed|paused/i')
    await expect(statusElements.first()).toBeVisible()
  })

  test('filters experiments by status', async ({ page }) => {
    // Click on Active filter (use more specific selector)
    await page.getByRole('button', { name: /Active \(\d+\)/i }).click()

    // Should show only active experiments
    await expect(page.getByText('Hand Gesture 3D Interface')).toBeVisible()
  })

  test('filters experiments by type', async ({ page }) => {
    // Click on AI filter (use more specific selector)
    await page.getByRole('button', { name: /AI \(\d+\)/i }).click()

    // Should show only AI experiments
    await expect(
      page.getByText('Real-time Neural Style Transfer')
    ).toBeVisible()
  })

  test('displays experiment technologies', async ({ page }) => {
    // Check that technology tags are visible (use first() to avoid strict mode violations)
    await expect(page.getByText('TensorFlow.js').first()).toBeVisible()
    await expect(page.getByText('MediaPipe').first()).toBeVisible()
  })

  test('shows call-to-action for collaboration', async ({ page }) => {
    await expect(
      page.getByText('Have an idea for collaboration?')
    ).toBeVisible()
    // Use first() to avoid strict mode violations (multiple "Get in Touch" links)
    await expect(
      page.getByRole('link', { name: /get in touch/i }).first()
    ).toBeVisible()
  })
})
