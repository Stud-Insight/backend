import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import path from 'path';
import fs from 'fs/promises';
import download  from 'downloadjs';

const signPDF = async (signature:string)=>{
    console.log("Signature d'un PDF en cours ...")
    try {
        // Charger le fichier PDF existant
        const filePath = path.join(__dirname,"test.pdf"); // Remplacez par le chemin réel de votre PDF
        const existingPdfBytes = await fs.readFile(filePath);

        // Charger le PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log("PDF -> getPDF")


        // Ajouter la signature
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const lastPage = pages[pages.length - 1];
        console.log("PDF -> Font")
        
        lastPage.drawText(signature, {
            x: 5,
            y: 300,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1)
        });

        // Sauvegarder le PDF modifié
        const pdfBytes = await pdfDoc.save();
        console.log("PDF -> Save()")

        download(pdfBytes, 'example-modified.pdf', 'application/pdf');
        console.log("PDF -> download")

    } catch {
         console.log("Yey, ça marche pas, t'es null :)");
    }
}

export default signPDF ;