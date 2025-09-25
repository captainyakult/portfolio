import { test, expect } from '@playwright/test'

test.describe('Experiments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experiments')
  })

  test('displays experiments page with correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^Experiments$/i })).toBeVisible()
    await expect(page.getByText(/ongoing research and experimental projects/i)).toBeVisible()
  })

  test('shows stats grid', async ({ page }) => {
    await expect(page.getByText('Active')).toBeVisible()
    await expect(page.getByText('Completed')).toBeVisible()
    await expect(page.getByText('Technologies')).toBeVisible()
    await expect(page.getByText('Media Files')).toBeVisible()
  })

  test('displays filter tabs for experiments', async ({ page }) => {
    await expect(page.getByRole('button', { name: /^All/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Active/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Completed/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /AI/i })).toBeVisible()
  })

  test('displays experiment cards', async ({ page }) => {
    // Check for experiment titles from our data
    await expect(page.getByText('Real-time Neural Style Transfer')).toBeVisible()
    await expect(page.getByText('Hand Gesture 3D Interface')).toBeVisible()
  })

  test('shows experiment status indicators', async ({ page }) => {
    // Look for status indicators (active, completed, paused)
    const statusElements = page.locator('text=active, text=completed, text=paused')
    await expect(statusElements.first()).toBeVisible()
  })

  test('filters experiments by status', async ({ page }) => {
    // Click on Active filter
    await page.getByRole('button', { name: /Active/i }).click()
    
    // Should show only active experiments
    await expect(page.getByText('Hand Gesture 3D Interface')).toBeVisible()
  })

  test('filters experiments by type', async ({ page }) => {
    // Click on AI filter
    await page.getByRole('button', { name: /^AI$/i }).click()
    
    // Should show only AI experiments
    await expect(page.getByText('Real-time Neural Style Transfer')).toBeVisible()
  })

  test('displays experiment technologies', async ({ page }) => {
    // Check that technology tags are visible
    await expect(page.getByText('TensorFlow.js')).toBeVisible()
    await expect(page.getByText('MediaPipe')).toBeVisible()
  })

  test('shows call-to-action for collaboration', async ({ page }) => {
    await expect(page.getByText('Have an idea for collaboration?')).toBeVisible()
    await expect(page.getByRole('link', { name: /get in touch/i })).toBeVisible()
  })
})