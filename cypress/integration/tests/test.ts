// import documentUploadPage from "../pages/documentUpload";

// beforeEach(() => {
//     documentUploadPage.navigate();
// });

// describe("Document Upload Page", () => {
//     it("should launch", () => {
//         documentUploadPage.validateOnPage();
//     });

//     describe("when the user submits an ID", () => {
//         beforeEach(() => {
//             documentUploadPage.selectIdDocument();
//             documentUploadPage.submitIdDocument();
//         });
//         it("Shows no errors", () => {
//             documentUploadPage.checkForErrors();
//         });
//         it("Allows them to submit their proof of residency", () => {
//             documentUploadPage.selectResidencyDocument();
//             documentUploadPage.submitResidencyDocument();
//         });
//     });

//     describe("when the user submits both documents", () => {
//         it("Allows them to continue in the flow", () => {
//             documentUploadPage.selectIdDocument();
//             documentUploadPage.submitIdDocument();
//             documentUploadPage.selectResidencyDocument();
//             documentUploadPage.submitResidencyDocument();
//             documentUploadPage.clickContinueButton();
//             documentUploadPage.checkForErrors();
//             documentUploadPage.validateNextPageUrlUrl();
//         });
//     });
// });
