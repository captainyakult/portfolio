import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle('Jack Simpson - Interactive Portfolio')
  })

  test('displays hero section with name and call-to-action buttons', async ({ page }) => {
    // Check hero heading
    await expect(page.getByRole('heading', { name: /jack simpson/i })).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /view my work/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /browse experiments/i })).toBeVisible()
  })

  test('displays stats section', async ({ page }) => {
    await expect(page.getByText('15+')).toBeVisible()
    await expect(page.getByText('Interactive Projects')).toBeVisible()
    await expect(page.getByText('8')).toBeVisible()
    await expect(page.getByText('AI Experiments')).toBeVisible()
  })

  test('shows navigation with all menu items', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Experiments' })).toBeVisible()
  })

  test('has working agentic helper', async ({ page }) => {
    // Click the helper button
    await page.getByRole('button', { name: /open assistant/i }).click()
    
    // Check if helper panel appears
    await expect(page.getByText('How can I help?')).toBeVisible()
    
    // Check quick actions
    await expect(page.getByText('Show my projects')).toBeVisible()
    await expect(page.getByText('Browse experiments')).toBeVisible()
  })

  test('navigates to projects page via CTA button', async ({ page }) => {
    await page.getByRole('link', { name: /view my work/i }).click()
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible()
  })

  test('navigates to experiments page via CTA button', async ({ page }) => {
    await page.getByRole('link', { name: /browse experiments/i }).click()
    await expect(page).toHaveURL('/experiments')
    await expect(page.getByRole('heading', { name: /experiments/i })).toBeVisible()
  })

  test('displays about section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /about me/i })).toBeVisible()
    await expect(page.getByText(/passionate about creating immersive/i)).toBeVisible()
  })

  test('displays featured work section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /featured work/i })).toBeVisible()
  })
})