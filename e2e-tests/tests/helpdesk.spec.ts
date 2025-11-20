import { test, expect } from '@playwright/test';

test.describe('IT Helpdesk Portal', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is present
    await expect(page.getByText('IT Helpdesk Portal')).toBeVisible();
    
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
  });

  test('should navigate through tabs', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForSelector('text=IT Helpdesk Portal');
    
    // Click on different tabs
    await page.click('button:has-text("Knowledge Base")');
    await expect(page.getByText('Search our knowledge base')).toBeVisible();
    await page.screenshot({ path: 'screenshots/knowledge-base-tab.png', fullPage: true });
    
    await page.click('button:has-text("Create Ticket")');
    await expect(page.getByText('Create Support Ticket')).toBeVisible();
    await page.screenshot({ path: 'screenshots/create-ticket-tab.png', fullPage: true });
    
    await page.click('button:has-text("My Tickets")');
    await expect(page.getByText('View and track your support tickets')).toBeVisible();
    await page.screenshot({ path: 'screenshots/my-tickets-tab.png', fullPage: true });
    
    await page.click('button:has-text("Q&A Assistant")');
    await expect(page.getByText('Ask a Question')).toBeVisible();
    await page.screenshot({ path: 'screenshots/qa-tab.png', fullPage: true });
  });

  test('should submit a question in Q&A', async ({ page }) => {
    await page.goto('/');
    
    // Fill in the question
    await page.fill('input[placeholder*="How do I reset my password"]', 'How do I reset my password?');
    
    // Click Ask button
    await page.click('button:has-text("Ask")');
    
    // Wait for response
    await page.waitForSelector('text=/A:/', { timeout: 10000 });
    
    // Take a screenshot of the result
    await page.screenshot({ path: 'screenshots/qa-response.png', fullPage: true });
    
    // Check if an answer is displayed
    await expect(page.getByText(/To reset your password/)).toBeVisible();
  });

  test('should search knowledge base', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Knowledge Base
    await page.click('button:has-text("Knowledge Base")');
    
    // Search for VPN
    await page.fill('input[placeholder*="password, VPN"]', 'VPN');
    await page.click('button:has-text("Search")');
    
    // Wait for results
    await page.waitForTimeout(1000);
    
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/knowledge-search-results.png', fullPage: true });
    
    // Check if VPN article is shown
    await expect(page.getByText('VPN Connection Issues')).toBeVisible();
  });

  test('should create a support ticket', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Create Ticket
    await page.click('button:has-text("Create Ticket")');
    
    // Fill in the form
    await page.fill('input[label="Subject"]', 'Test Ticket - Need Help');
    await page.fill('textarea', 'This is a test ticket to demonstrate the ticket creation functionality.');
    
    // Select priority
    await page.click('div:has-text("Priority")');
    await page.click('li:has-text("High")');
    
    // Take a screenshot before submission
    await page.screenshot({ path: 'screenshots/ticket-form-filled.png', fullPage: true });
    
    // Submit the form
    await page.click('button:has-text("Create Ticket")');
    
    // Wait for success message
    await page.waitForSelector('text=/Ticket created successfully/', { timeout: 10000 });
    
    // Take a screenshot of success
    await page.screenshot({ path: 'screenshots/ticket-created-success.png', fullPage: true });
    
    // Verify success message
    await expect(page.getByText(/Ticket created successfully/)).toBeVisible();
  });

  test('should display ticket list', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to My Tickets
    await page.click('button:has-text("My Tickets")');
    
    // Wait for tickets to load
    await page.waitForTimeout(2000);
    
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/tickets-list.png', fullPage: true });
    
    // Check if tickets are displayed
    const hasTickets = await page.getByText('No tickets found').isVisible().catch(() => false);
    if (!hasTickets) {
      await expect(page.getByText(/Ticket #/)).toBeVisible();
    }
  });
});
