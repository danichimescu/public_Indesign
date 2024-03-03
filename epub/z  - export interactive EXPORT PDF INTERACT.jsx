// app.open(file_d_name); // 
var myDocument = app.activeDocument;
var myFile_calea = app.activeDocument.filePath.fsName;
var myFileName = app.activeDocument.name;


with (app.pdfExportPreferences) {  //InteractivePDFExportPreference //pdfExportPreferences
	//Basic PDF output options.
	pageRange = PageRange.allPages;
	acrobatCompatibility = AcrobatCompatibility.acrobat6;
	exportGuidesAndGrids = false;
	exportLayers = false;
	exportNonPrintingObjects = false;
	exportReaderSpreads = false;
	generateThumbnails = false;
	try {
		ignoreSpreadOverrides = false;
	}
	catch (e) { }
	includeBookmarks = true;
	includeHyperlinks = true;
	includeICCProfiles = true;
	includeSlugWithPDF = false;
	includeStructure = false;
	interactiveElementsOption = InteractiveElementsOptions.doNotInclude;
	defaultDocumentLanguage = "Romanian"



	//Setting subsetFontsBelow to zero disallows font subsetting;
	//set subsetFontsBelow to some other value to use font subsetting.
	// subsetFontsBelow = 0;
	//
	//Bitmap compression/sampling/quality options.
	colorBitmapCompression = BitmapCompression.JPEG //BitmapCompression.zip; //BitmapCompression.JPEG


	colorBitmapQuality = CompressionQuality.EIGHT_BIT; //CompressionQuality.EIGHT_BIT
	colorBitmapSamplingDPI = 144;



	// colorBitmapSampling = Sampling.none;
	//thresholdToCompressColor is not needed in this example.
	//colorBitmapSamplingDPI is not needed when colorBitmapSampling
	//is set to none.
	grayscaleBitmapCompression = BitmapCompression.zip;
	grayscaleBitmapQuality = CompressionQuality.eightBit;
	grayscaleBitmapSampling = Sampling.none;
	//thresholdToCompressGray is not needed in this example.
	//grayscaleBitmapSamplingDPI is not needed when grayscaleBitmapSampling
	//is set to none.
	monochromeBitmapCompression = BitmapCompression.zip;
	monochromeBitmapSampling = Sampling.none;
	//thresholdToCompressMonochrome is not needed in this example.
	//monochromeBitmapSamplingDPI is not needed when
	//monochromeBitmapSampling is set to none.
	//
	//Other compression options.
	compressionType = PDFCompressionType.compressNone;
	compressTextAndLineArt = true;
	cropImagesToFrames = true;
	optimizePDF = true;
	pdfColorSpace = PDFColorSpace.RGB;


	pdfXProfile = PDFProfileSelector.USE_MONITOR_PROFILE
	viewPDF = true;

	// *********
	pdfJPEGQuality = PDFJPEGQualityOptions.MEDIUM

	pdfRasterCompression = PDFRasterCompressionOptions.JPEG_COMPRESSION

	pdfDisplayTitle = PdfDisplayTitleOptions.DISPLAY_DOCUMENT_TITLE //PdfDisplayTitleOptions.DISPLAY_FILE_NAME
	pdfMagnification = PdfMagnificationOptions.FIT_PAGE

	pdfPageLayout = PageLayoutOptions.SINGLE_PAGE


}

// app.interactivePDFExportPreferences.flipPages = true;
// app.interactivePDFExportPreferences.flipPagesSpeed = 5;
// app.interactivePDFExportPreferences.openInFullScreen = true;
// app.interactivePDFExportPreferences.interactivePDFInteractiveElementsOption = InteractivePDFInteractiveElementsOptions.includeAllMedia;
//Export the document to PDF.


// 	with(app.InteractivePDFExportPreference){
// 	defaultDocumentLanguage = "Romanian"
// 	pdfJPEGQuality = PDFJPEGQualityOptions.MEDIUM
// 	pdfRasterCompression = PDFRasterCompressionOptions.JPEG_COMPRESSION
// 	pdfDisplayTitle = PdfDisplayTitleOptions.DISPLAY_DOCUMENT_TITLE //PdfDisplayTitleOptions.DISPLAY_FILE_NAME
// 	pdfMagnification = PdfMagnificationOptions.FIT_PAGE
// 	pdfPageLayout = PageLayoutOptions.SINGLE_PAGE

// }

app.interactivePDFExportPreferences.pageRange = PageRange.allPages;
app.interactivePDFExportPreferences.pdfPageLayout = PageLayoutOptions.SINGLE_PAGE;
app.interactivePDFExportPreferences.pdfMagnification = PdfMagnificationOptions.FIT_PAGE;
app.interactivePDFExportPreferences.viewPDF = true;
app.interactivePDFExportPreferences.interactivePDFInteractiveElementsOption = InteractivePDFInteractiveElementsOptions.INCLUDE_ALL_MEDIA;
app.interactivePDFExportPreferences.generateThumbnails= true;

app.interactivePDFExportPreferences.pdfRasterCompression = PDFRasterCompressionOptions.JPEG_COMPRESSION;
app.interactivePDFExportPreferences.pdfJPEGQuality = PDFJPEGQualityOptions.MEDIUM;
app.interactivePDFExportPreferences.rasterResolution = 144;

app.interactivePDFExportPreferences.pdfDisplayTitle = PdfDisplayTitleOptions.DISPLAY_DOCUMENT_TITLE;
app.interactivePDFExportPreferences.defaultDocumentLanguage = "Romanian";








// var myFile_calea = app.activeDocument.filePath.fsName;
// var myFileName = app.activeDocument.name;
// alert(myFile_calea+"//"+myFileName)
// app.activeDocument.save(); // myDocument.save(File(savedocname));
var myFileName = myFileName.replace(".indd", ".pdf")
app.activeDocument.exportFile(ExportFormat.interactivePDF, File(myFile_calea+"//"+myFileName), false);
// app.activeDocument.save();
app.activeDocument.close(SaveOptions.YES);
// app.activeDocument.exportFile(ExportFormat.interactivePDF, File(Folder.desktop + "/InteractivePDF.pdf"), false);