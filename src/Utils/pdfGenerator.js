import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';

const generatePDF = reporte => {
    const doc = new jsPDF();
    const tableColumn = reporte.encabezado;
    const tableRows = [];

    reporte.listado.forEach(dato => {
        const datoData = [
            dato.codigo,
            dato.material,
            dato.tamaño,
            dato.color,
            dato.forma,
            dato.cantidad,
            dato.valor,
            dato.referenciaConfeccion,
            dato.detalles
        ];
        tableRows.push(datoData);
    });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    const date = moment().locale('es').format('LLL');

    doc.setFontSize(8);
    doc.text(date, 160, 10);

    // ticket title. and margin-top + margin-left
    doc.setFontSize(30);
    doc.text(reporte.titulo, 14, 16);
    doc.setFontSize(17);
    doc.text("Autor: ", 14, 24);
    doc.setFontSize(16);
    doc.text(reporte.autor, 32, 24);

    doc.save(`${reporte.titulo}${date.replace(',', '').replace(':', '_')}.pdf`);
};

export default generatePDF;