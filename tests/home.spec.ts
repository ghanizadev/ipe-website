import { expect, test } from '@playwright/test';

test('should navigate to the how to help page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Saiba como ajudar');
  await expect(page).toHaveURL('/institucional/como-ajudar');
  await expect(page.locator('h1')).toContainText('Somos gratos por sua ajuda');
});

test('should navigate to the contact page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Contato');
  await expect(page).toHaveURL('/contato');
});

test('should contain events', async ({ page }) => {
  await page.goto('/');
  const eventCard = page.getByTestId('event-card');

  const image = eventCard.getByRole('img');
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty('complete', true);
  await expect(image).not.toHaveJSProperty('naturalWidth', 0);

  const title = eventCard.getByText('MARATONA IPE', { exact: true });
  await expect(title).toBeVisible();
  await title.click();

  const status = page.getByTestId('event-status');
  await expect(status).toBeVisible();
  await expect(status).toHaveText('Inscrições encerradas');

  await expect(page).toHaveURL(
    `/eventos/${new Date().getFullYear() + 1}/1/2/maratona-ipe`
  );
});
