import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects')
  })

  test('displays projects page with correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^Projects$/i })).toBeVisible()
    await expect(page.getByText(/exploring the intersection of creativity and technology/i)).toBeVisible()
  })

  test('shows filter tabs', async ({ page }) => {
    await expect(page.getByRole('button', { name: /all projects/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /featured/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /web & 3d/i })).toBeVisible()
  })

  test('displays project cards', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 }).catch(() => {
      // If test ID doesn't exist, look for project titles instead
    })
    
    // Check for project titles from our data
    await expect(page.getByText('Interactive 3D Portfolio')).toBeVisible()
    await expect(page.getByText('AI Data Visualization Tool')).toBeVisible()
  })

  test('filters projects when filter button is clicked', async ({ page }) => {
    // Click on Featured filter
    await page.getByRole('button', { name: /featured/i }).click()
    
    // Should show only featured projects
    await expect(page.getByText('Interactive 3D Portfolio')).toBeVisible()
    await expect(page.getByText('AI Data Visualization Tool')).toBeVisible()
  })

  test('navigates to project detail page when project is clicked', async ({ page }) => {
    // Wait for and click on a project
    await page.getByText('Interactive 3D Portfolio').click()
    
    // Should navigate to project detail page
    await expect(page).toHaveURL('/projects/interactive-3d-portfolio')
    await expect(page.getByRole('heading', { name: /interactive 3d portfolio/i })).toBeVisible()
  })

  test('shows back navigation on project detail page', async ({ page }) => {
    await page.goto('/projects/interactive-3d-portfolio')
    
    await expect(page.getByRole('link', { name: /back to projects/i })).toBeVisible()
  })

  test('displays project technologies and actions on detail page', async ({ page }) => {
    await page.goto('/projects/interactive-3d-portfolio')
    
    await expect(page.getByRole('heading', { name: /technologies used/i })).toBeVisible()
    
    // Check for action buttons
    await expect(page.getByRole('link', { name: /view live demo/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /view on github/i })).toBeVisible()
  })
})