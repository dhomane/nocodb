import { expect } from '@playwright/test';
import { CellPageObject } from '.';
import BasePage from '../../../Base';

export class RatingCellPageObject extends BasePage {
  readonly cell: CellPageObject;

  constructor(cell: CellPageObject) {
    super(cell.rootPage);
    this.cell = cell;
  }

  get({ index, columnHeader }: { index?: number; columnHeader: string }) {
    return this.cell.get({ index, columnHeader });
  }

  async select({ index, columnHeader, rating }: { index?: number; columnHeader: string; rating: number }) {
    await this.waitForResponse({
      uiAction: () => this.get({ index, columnHeader }).locator('.ant-rate-star > div').nth(rating).click(),
      httpMethodsToMatch: ['POST', 'PATCH'],
      requestUrlPathToMatch: 'api/v1/db/data/noco/',
    });
  }

  async verify({ index, columnHeader, rating }: { index: number; columnHeader: string; rating: number }) {
    const cell = await this.get({ index, columnHeader });
    await cell.scrollIntoViewIfNeeded();
    const ratingCount = await cell.locator(`li.ant-rate-star.ant-rate-star-full`).count();
    await expect(ratingCount).toBe(rating);
  }
}
