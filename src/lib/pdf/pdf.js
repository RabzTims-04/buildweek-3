import PdfPrinter from "pdfmake"

export const generatePDFReadableStream = (obj,img, authObj) => {
    
    const fonts = {
        Roboto:{
            normal: "Helvetica",
            bold:"Helvetica-bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-Oblique"
        }
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content:[        
                        
        ]
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)
    pdfReadableStream.end()
    return pdfReadableStream
}