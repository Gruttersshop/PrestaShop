import BOBasePage from '@pages/BO/BObasePage';

import type {Page} from 'playwright';

/**
 * Image settings page, contains functions that can be used on the page
 * @class
 * @extends BOBasePage
 */
class ImageSettings extends BOBasePage {
  public readonly pageTitle: string;

  public readonly messageThumbnailsRegenerated: string;

  private readonly newImageTypeLink: string;

  private readonly gridForm: string;

  private readonly gridTableHeaderTitle: string;

  private readonly gridTableNumberOfTitlesSpan: string;

  private readonly gridTable: string;

  private readonly filterRow: string;

  private readonly filterColumn: (filterBy: string) => string;

  private readonly filterSearchButton: string;

  private readonly filterResetButton: string;

  private readonly tableBody: string;

  private readonly tableBodyRows: string;

  private readonly tableBodyRow: (row: number) => string;

  private readonly tableBodyColumn: (row: number) => string;

  private readonly tableBodySpecificColumn: (row: number, columnName: string) => string;

  private readonly tableColumnStatus: (row: number, columnName: string, status: string) => string;

  private readonly tableHead: string;

  private readonly sortColumnDiv: (column: number) => string;

  private readonly sortColumnSpanButton: (column: number) => string;

  private readonly tableColumnActions: (row: number) => string;

  private readonly tableColumnActionsEditLink: (row: number) => string;

  private readonly tableColumnActionsToggleButton: (row: number) => string;

  private readonly tableColumnActionsDropdownMenu: (row: number) => string;

  private readonly tableColumnActionsDeleteLink: (row: number) => string;

  private readonly deleteModalButtonYes: string;

  private readonly deleteModalCheckboxDeleteLinkedImages: string;

  private readonly bulkActionBlock: string;

  private readonly bulkActionMenuButton: string;

  private readonly bulkActionDropdownMenu: string;

  private readonly selectAllLink: string;

  private readonly bulkDeleteLink: string;

  private readonly paginationActiveLabel: string;

  private readonly paginationDiv: string;

  private readonly paginationDropdownButton: string;

  private readonly paginationItems: (number: number) => string;

  private readonly paginationPreviousLink: string;

  private readonly paginationNextLink: string;

  private readonly formRegenerateThumbnails: string;

  private readonly submitRegenerateThumbnails: string;

  private readonly modalRegenerateThumbnails: string;

  private readonly modalSubmitRegenerateThumbnails: string;

  /**
   * @constructs
   * Setting up texts and selectors to use on image settings page
   */
  constructor() {
    super();

    this.pageTitle = 'Image Settings • ';
    this.messageThumbnailsRegenerated = 'The thumbnails were successfully regenerated.';

    this.alertSuccessBlockParagraph = '.alert-success';

    // Header selectors
    this.newImageTypeLink = 'a[data-role=page-header-desc-image_type-link]';

    // Form selectors
    this.gridForm = '#form-image_type';
    this.gridTableHeaderTitle = `${this.gridForm} .panel-heading`;
    this.gridTableNumberOfTitlesSpan = `${this.gridTableHeaderTitle} span.badge`;

    // Table selectors
    this.gridTable = '#table-image_type';

    // Filter selectors
    this.filterRow = `${this.gridTable} tr.filter`;
    this.filterColumn = (filterBy: string) => `${this.filterRow} [name='image_typeFilter_${filterBy}']`;
    this.filterSearchButton = '#submitFilterButtonimage_type';
    this.filterResetButton = 'button[name=\'submitResetimage_type\']';

    // Table body selectors
    this.tableBody = `${this.gridTable} tbody`;
    this.tableBodyRows = `${this.tableBody} tr`;
    this.tableBodyRow = (row: number) => `${this.tableBodyRows}:nth-child(${row})`;
    this.tableBodyColumn = (row: number) => `${this.tableBodyRow(row)} td`;

    // Columns selectors
    this.tableBodySpecificColumn = (row: number, columnName: string) => `${this.tableBodyColumn(row)}.column-${columnName}`;
    this.tableColumnStatus = (row: number, columnName: string, status: string) => `${
      this.tableBodySpecificColumn(row, columnName)} span.action-${status}`;

    // Sort Selectors
    this.tableHead = `${this.gridTable} thead`;
    this.sortColumnDiv = (column: number) => `${this.tableHead} th:nth-child(${column})`;
    this.sortColumnSpanButton = (column: number) => `${this.sortColumnDiv(column)} span.ps-sort`;

    // Row actions selectors
    this.tableColumnActions = (row: number) => `${this.tableBodyColumn(row)} .btn-group-action`;
    this.tableColumnActionsEditLink = (row: number) => `${this.tableColumnActions(row)} a.edit`;
    this.tableColumnActionsToggleButton = (row: number) => `${this.tableColumnActions(row)} button.dropdown-toggle`;
    this.tableColumnActionsDropdownMenu = (row: number) => `${this.tableColumnActions(row)} .dropdown-menu`;
    this.tableColumnActionsDeleteLink = (row: number) => `${this.tableColumnActionsDropdownMenu(row)} a.delete`;

    // Confirmation modal
    this.deleteModalButtonYes = '.btn-confirm-delete-images-type';
    this.deleteModalCheckboxDeleteLinkedImages = '#modalConfirmDeleteType #delete_linked_images';

    // Bulk actions selectors
    this.bulkActionBlock = 'div.bulk-actions';
    this.bulkActionMenuButton = '#bulk_action_menu_image_type';
    this.bulkActionDropdownMenu = `${this.bulkActionBlock} ul.dropdown-menu`;
    this.selectAllLink = `${this.bulkActionDropdownMenu} li:nth-child(1)`;
    this.bulkDeleteLink = `${this.bulkActionDropdownMenu} li:nth-child(4)`;

    // Pagination selectors
    this.paginationActiveLabel = `${this.gridForm} ul.pagination.pull-right li.active a`;
    this.paginationDiv = `${this.gridForm} .pagination`;
    this.paginationDropdownButton = `${this.paginationDiv} .dropdown-toggle`;
    this.paginationItems = (number: number) => `${this.gridForm} .dropdown-menu a[data-items='${number}']`;
    this.paginationPreviousLink = `${this.gridForm} .icon-angle-left`;
    this.paginationNextLink = `${this.gridForm} .icon-angle-right`;

    this.formRegenerateThumbnails = '#display_regenerate_form';
    this.submitRegenerateThumbnails = `${this.formRegenerateThumbnails} button[type="submit"]`;
    this.modalRegenerateThumbnails = '#modalRegenerateThumbnails';
    this.modalSubmitRegenerateThumbnails = `${this.modalRegenerateThumbnails} .btn-regenerate-thumbnails`;
  }

  /* Header methods */
  /**
   * Go to new image type page
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async goToNewImageTypePage(page: Page): Promise<void> {
    await this.clickAndWaitForNavigation(page, this.newImageTypeLink);
  }

  /* Filter methods */

  /**
   * Get number of image types
   * @param page {Page} Browser tab
   * @return {Promise<number>}
   */
  getNumberOfElementInGrid(page: Page): Promise<number> {
    return this.getNumberFromText(page, this.gridTableNumberOfTitlesSpan);
  }

  /**
   * Reset all filters
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async resetFilter(page: Page): Promise<void> {
    if (!(await this.elementNotVisible(page, this.filterResetButton, 2000))) {
      await this.clickAndWaitForNavigation(page, this.filterResetButton);
    }
    await this.waitForVisibleSelector(page, this.filterSearchButton, 2000);
  }

  /**
   * Reset and get number of image types
   * @param page {Page} Browser tab
   * @return {Promise<number>}
   */
  async resetAndGetNumberOfLines(page: Page): Promise<number> {
    await this.resetFilter(page);

    return this.getNumberOfElementInGrid(page);
  }

  /**
   * Filter image types
   * @param page {Page} Browser tab
   * @param filterType {string} Input or select to choose method of filter
   * @param filterBy {string} Column to filter
   * @param value {string} Value to filter with
   * @return {Promise<void>}
   */
  async filterTable(page: Page, filterType: string, filterBy: string, value: string): Promise<void> {
    switch (filterType) {
      case 'input':
        await this.setValue(page, this.filterColumn(filterBy), value.toString());
        await this.clickAndWaitForNavigation(page, this.filterSearchButton);
        break;

      case 'select':
        await Promise.all([
          page.waitForNavigation({waitUntil: 'networkidle'}),
          this.selectByVisibleText(page, this.filterColumn(filterBy), value === '1' ? 'Yes' : 'No'),
        ]);
        break;

      default:
        throw new Error(`Filter ${filterBy} was not found`);
    }
  }

  /* Column methods */

  /**
   * Get text from column in table
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @param columnName {string} Value of column name to get text column
   * @return {Promise<string>}
   */
  getTextColumn(page: Page, row: number, columnName: string): Promise<string> {
    return this.getTextContent(page, this.tableBodySpecificColumn(row, columnName));
  }

  /**
   * Get content from all rows
   * @param page {Page} Browser tab
   * @param columnName {string} Value of column name to get all rows column content
   * @return {Promise<Array<string>>}
   */
  async getAllRowsColumnContent(page: Page, columnName: string): Promise<string[]> {
    const rowsNumber = await this.getNumberOfElementInGrid(page);
    const allRowsContentTable: string[] = [];

    for (let i = 1; i <= rowsNumber; i++) {
      const rowContent = await this.getTextColumn(page, i, columnName);
      allRowsContentTable.push(rowContent);
    }

    return allRowsContentTable;
  }

  /**
   * Get image type status for pages: products, categories, manufacturers, suppliers or stores
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @param columnName {string} Value of column name to get type status
   * @return {Promise<boolean>}
   */
  async getImageTypeStatus(page: Page, row: number, columnName: string): Promise<boolean> {
    return this.elementVisible(page, this.tableColumnStatus(row, columnName, 'enabled'), 1000);
  }

  /**
   * Go to edit imageType page
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @return {Promise<void>}
   */
  async gotoEditImageTypePage(page: Page, row: number): Promise<void> {
    await this.clickAndWaitForNavigation(page, this.tableColumnActionsEditLink(row));
  }

  /**
   * Delete image type from row
   * @param page {Page} Browser tab
   * @param row {number} Row on table
   * @param deleteLinkedImages {boolean} Delete the images linked to this image setting
   * @return {Promise<string>}
   */
  async deleteImageType(page: Page, row: number, deleteLinkedImages: boolean = false): Promise<string> {
    await Promise.all([
      page.click(this.tableColumnActionsToggleButton(row)),
      this.waitForVisibleSelector(page, this.tableColumnActionsDeleteLink(row)),
    ]);

    await page.click(this.tableColumnActionsDeleteLink(row));

    // Check/Uncheck the option "Delete the images linked to this image setting"
    await this.setChecked(page, this.deleteModalCheckboxDeleteLinkedImages, deleteLinkedImages);

    // Confirm delete action
    await this.clickAndWaitForNavigation(page, this.deleteModalButtonYes);

    // Get successful message
    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /* Bulk actions methods */
  /**
   * Bulk delete image types
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  async bulkDeleteImageTypes(page: Page): Promise<string> {
    // To confirm bulk delete action with dialog
    await this.dialogListener(page, true);

    // Select all rows
    await Promise.all([
      page.click(this.bulkActionMenuButton),
      this.waitForVisibleSelector(page, this.selectAllLink),
    ]);

    await Promise.all([
      page.click(this.selectAllLink),
      this.waitForHiddenSelector(page, this.selectAllLink),
    ]);

    // Perform delete
    await Promise.all([
      page.click(this.bulkActionMenuButton),
      this.waitForVisibleSelector(page, this.bulkDeleteLink),
    ]);

    await this.clickAndWaitForNavigation(page, this.bulkDeleteLink);

    // Return successful message
    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /* Sort functions */
  /**
   * Sort table by clicking on column name
   * @param page {Page} Browser tab
   * @param sortBy {string} Column to sort with
   * @param sortDirection {string} Sort direction asc or desc
   * @return {Promise<void>}
   */
  async sortTable(page: Page, sortBy: string, sortDirection: string): Promise<void> {
    let columnSelector: string;

    switch (sortBy) {
      case 'id_image_type':
        columnSelector = this.sortColumnDiv(2);
        break;

      case 'name':
        columnSelector = this.sortColumnDiv(3);
        break;

      case 'width':
        columnSelector = this.sortColumnDiv(4);
        break;

      case 'height':
        columnSelector = this.sortColumnDiv(5);
        break;

      default:
        throw new Error(`Column ${sortBy} was not found`);
    }

    const sortColumnButton = `${columnSelector} i.icon-caret-${sortDirection}`;
    await this.clickAndWaitForNavigation(page, sortColumnButton);
  }

  /* Pagination methods */
  /**
   * Get pagination label
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  getPaginationLabel(page: Page): Promise<string> {
    return this.getTextContent(page, this.paginationActiveLabel);
  }

  /**
   * Select pagination limit
   * @param page {Page} Browser tab
   * @param number {number} Value of pagination limit to select
   * @returns {Promise<string>}
   */
  async selectPaginationLimit(page: Page, number: number): Promise<string> {
    await this.waitForSelectorAndClick(page, this.paginationDropdownButton);
    await this.clickAndWaitForNavigation(page, this.paginationItems(number));

    return this.getPaginationLabel(page);
  }

  /**
   * Click on next
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async paginationNext(page: Page): Promise<string> {
    await this.clickAndWaitForNavigation(page, this.paginationNextLink);

    return this.getPaginationLabel(page);
  }

  /**
   * Click on previous
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async paginationPrevious(page: Page): Promise<string> {
    await this.clickAndWaitForNavigation(page, this.paginationPreviousLink);

    return this.getPaginationLabel(page);
  }

  /**
   * Regenerate Thumbnails
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async regenerateThumbnails(page: Page): Promise<string> {
    // Click on Submit
    await page.click(this.submitRegenerateThumbnails);

    // Modal & Submit
    await this.waitForVisibleSelector(page, this.modalSubmitRegenerateThumbnails);
    await page.click(this.modalSubmitRegenerateThumbnails);

    // Return successful message
    return this.getAlertSuccessBlockContent(page);
  }
}

export default new ImageSettings();
