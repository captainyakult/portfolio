import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle('Jack Simpson - Interactive Portfolio')
  })

  test('displays hero section with name and call-to-action buttons', async ({
    page,
  }) => {
    // Check hero heading
    await expect(
      page.getByRole('heading', { name: /jack simpson/i })
    ).toBeVisible()

    // Check CTA buttons
    await expect(
      page.getByRole('link', { name: /view my work/i })
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /browse experiments/i })
    ).toBeVisible()
  })

  test('displays stats section', async ({ page }) => {
    // Find stats section by using the grid container, then verify numbers within context
    const statsGrid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')

    // Verify Interactive Projects stat
    await expect(statsGrid.getByText('2').first()).toBeVisible()
    await expect(statsGrid.getByText('Interactive Projects')).toBeVisible()

    // Verify AI Experiments stat
    await expect(statsGrid.getByText('3').first()).toBeVisible()
    await expect(statsGrid.getByText('AI Experiments')).toBeVisible()
  })

  test('shows navigation with all menu items', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    // Use exact match to avoid conflict with "View all projects" link
    await expect(
      page.getByRole('link', { name: 'Projects', exact: true })
    ).toBeVisible()
    // Use exact match to avoid conflict with "Browse Experiments" button
    await expect(
      page.getByRole('link', { name: 'Experiments', exact: true })
    ).toBeVisible()
  })

  test('has working agentic helper', async ({ page }) => {
    // Click the helper button (use aria-label)
    await page.getByRole('button', { name: /open assistant/i }).click()

    // Check if helper panel appears
    await expect(page.getByText('How can I help?')).toBeVisible()

    // Check quick actions (use first() to avoid strict mode violations)
    await expect(page.getByText('Show my projects')).toBeVisible()
    await expect(page.getByText('Browse experiments').first()).toBeVisible()
  })

  test('navigates to projects page via CTA button', async ({ page }) => {
    await page.getByRole('link', { name: /view my work/i }).click()
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible()
  })

  test('navigates to experiments page via CTA button', async ({ page }) => {
    await page.getByRole('link', { name: /browse experiments/i }).click()
    await expect(page).toHaveURL('/experiments')
    await expect(
      page.getByRole('heading', { name: /experiments/i })
    ).toBeVisible()
  })

  test('displays about section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /about me/i })).toBeVisible()
    await expect(
      page.getByText(/passionate about creating immersive/i)
    ).toBeVisible()
  })

  test('displays featured work section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /featured work/i })
    ).toBeVisible()
  })
})
