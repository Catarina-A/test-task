import scriptLoader from '../helpers/scriptLoader';
import QRCode from 'qrcode';

export default {

  data: {
    pdfScriptIsLoaded: false,
  },

  created() {
    this.jsPdfOptions = {
      url: process.env.PDF_SCRIPT_URL,
      libraryName: 'pdf-library',
      integrity: process.env.PDF_INTEGRITY,
      crossorigin: 'anonymous',
    };

    this.pdfAPI = null;
    this.pdfFont = null;

  },

  mounted() {
    Promise.all([
      this.getPdfFont(),
      scriptLoader(this.jsPdfOptions),
    ]).then(() => {
      this.pdfScriptIsLoaded = true;
      this.initPDF_API();
      //this.downloadPDF();
    });
  },

  methods: {

    initPDF_API() {
      this.pdfAPI = new jsPDF();
      this.pdfAPI.addFileToVFS('gtamerica.ttf', this.pdfFont);
      this.pdfAPI.addFont('gtamerica.ttf', 'gtamerica', 'Light');
      this.pdfFont = null;
    },

    async hetQrCode(link) {
      try {
        return await QRCode.toCanvas(link);
      } catch (e) {
        console.log(e);
      }
    },

    async downloadPDF() {
      const link = 'http://jmarshall.co.uk/';
      const text = 'If you have any question or if you want to see your bed in person, get in touch or find a store.';

      const pageWidth = 210;
      const pageHeight = 300;
      const pageFillColor = '#F5EFEE';
      const xOffset = 20;
      const yOffset = 20;

      const domLogo = document.getElementById('logo-for-svg');
      const logoWidth = 60;
      const logoHeight = logoWidth * 0.139;
      const logoX = pageWidth / 2 - logoWidth / 2;
      const logoY = yOffset;

      const textFontSize = 12;
      const cellPadding = 9;
      const textOffsetX = xOffset + 10;

      const imageSide = 150; // it is square
      const qrSide = 35;

      let currentY = 0;

      this.pdfAPI.deletePage(1);
      this.pdfAPI.addPage('a4', 'portrait');
      this.pdfAPI.setFont('gtamerica', 'Light');
      this.pdfAPI.setFontSize(textFontSize);

      this.pdfAPI.setFillColor(pageFillColor);
      this.pdfAPI.rect(0, 0, pageWidth, pageHeight, 'F');

      this.pdfAPI.addImage(domLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
      currentY = logoY;

      currentY += cellPadding * 2.8;
      this.pdfAPI.line(xOffset, currentY, pageWidth - xOffset, currentY);
      currentY += cellPadding;
      this.steps.forEach((step, index) => {
        let selectedValue = step.elements[this.selectedElement[`step_${index}`]].name;
        if (step.modifier === 'size') {
          selectedValue += ' cm';
        }
        this.pdfAPI.text(step.resultsTitle, textOffsetX, currentY);
        this.pdfAPI.text(selectedValue, pageWidth - textOffsetX, currentY, {
          align: 'right',
        });
        currentY += cellPadding - 3.5;
        this.pdfAPI.line(xOffset, currentY, pageWidth - xOffset, currentY);
        currentY += cellPadding;
      });

      currentY -= 32;

      const images = this.$refs.images.getElementsByTagName('img');
      if (images.length) {
        Array.from(images).forEach(image => {
          this.pdfAPI.addImage(image, 'PNG', xOffset + 15, currentY, imageSide, imageSide);
        });
      }

      currentY += imageSide + 18;
      this.pdfAPI.setFontSize(12);

      this.pdfAPI.text(text, xOffset, currentY, {
        maxWidth: pageWidth * 0.45,
      });

      currentY += textFontSize + 5;
      this.pdfAPI.setFontSize(14);

      this.pdfAPI.textWithLink('www.jmarshall.co.uk', xOffset, currentY, { // be careful to change, link coordinated manually
        url: link,
      });

      this.pdfAPI.setFillColor('#000');
      //this.pdfAPI.rect(56, currentY - 16, 25, 5, 'F');
      //this.pdfAPI.rect(87, currentY - 16, 25, 5, 'F');

      this.pdfAPI.link(56, currentY - 16, 25, 5, {
        url: link,
      });

      this.pdfAPI.link(87, currentY - 16, 25, 5, {
        url: link,
      });

      const canvas = await this.hetQrCode(link);

      this.pdfAPI.addImage(canvas, 'JPEG', pageWidth - xOffset - qrSide, pageHeight - yOffset - qrSide, qrSide, qrSide);

      this.pdfAPI.save('jmarshal-configurator.pdf');
    },

  },
};
