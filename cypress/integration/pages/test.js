// const labelKeys = {
//     select: "feature.account.document_upload.select_button",
//     submit: "feature.account.document_upload.submit_button",
//     submitting: "feature.account.document_upload.submit_button.submitting",
//     continue: "feature.account.document_upload.confirm_button",
// };

// class DocumentUpload {
//     locators = {
//         documentUploadScreen: 'div[data-testid="document-upload"]',
//         primaryButton: 'button[data-testid="button-primary"]',
//         selectDocumentInput: 'input[data-testid="file-input"]',
//         selectIdButton: 'button[data-testid="button-submit-photo_id"]',
//         selectResidencyButton: 'button[data-testid="button-submit-residency"]',
//         errorMessage: 'div[role="alert"]',
//     };

//     navigate() {
//         cy.visit("/document-upload");
//     }

//     validateOnPage() {
//         cy.get(this.locators.documentUploadScreen).should("be.visible");
//     }

//     attachDocument() {
//         const filePath = "testImage.png";
//         cy.fixture(filePath, "binary")
//             .then(Cypress.Blob.binaryStringToBlob)
//             .then(file => {
//                 cy.get(this.locators.selectDocumentInput).eq(0).attachFile({
//                     fileContent: file,
//                     filePath,
//                     encoding: "utf-8",
//                 });
//             });
//     }

//     selectIdDocument() {
//         cy.getLabel(labelKeys.select).then(text => {
//             cy.get(this.locators.selectIdButton).should("include.text", text);
//         });

//         this.attachDocument();

//         cy.getLabel(labelKeys.submit).then(text => {
//             cy.get(this.locators.selectIdButton).should("include.text", text);
//         });
//     }

//     submitIdDocument() {
//         cy.get(this.locators.selectIdButton).click();
//     }

//     selectResidencyDocument() {
//         cy.get(this.locators.selectIdButton).should("not.exist");
//         cy.getLabel(labelKeys.select).then(text => {
//             cy.get(this.locators.selectResidencyButton).should(
//                 "include.text",
//                 text
//             );
//         });

//         this.attachDocument();

//         cy.getLabel(labelKeys.submit).then(text => {
//             cy.get(this.locators.selectResidencyButton).should(
//                 "include.text",
//                 text
//             );
//         });
//     }

//     submitResidencyDocument() {
//         cy.get(this.locators.selectResidencyButton).click();
//     }

//     clickContinueButton() {
//         cy.get(this.locators.selectResidencyButton).should("not.exist");

//         cy.getLabel(labelKeys.continue).then(text => {
//             cy.get(this.locators.primaryButton)
//                 .eq(0)
//                 .should("include.text", text);
//         });
//         cy.get(this.locators.primaryButton).eq(0).click();
//     }

//     checkForErrors() {
//         cy.get(this.locators.errorMessage).should("not.exist");
//     }

//     validateNextPageUrlUrl() {
//         cy.url().should("include", "/security-questions");
//     }
// }

// export default new DocumentUpload();
