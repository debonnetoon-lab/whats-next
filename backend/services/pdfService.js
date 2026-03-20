import PDFDocument from 'pdfkit';

export const generatePDFReport = async (req, res) => {
  try {
    const { 
        company, 
        scan_score, 
        roi_estimate, 
        summary, 
        opportunities, 
        tools, 
        roadmap 
    } = req.body;

    const doc = new PDFDocument({ margin: 50 });

    // Set header for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ai-strategy-report-${company.replace(/\s+/g, '-').toLowerCase()}.pdf`);

    doc.pipe(res);

    // Title
    doc.fontSize(25).text('AI Strategy Assessment', { align: 'center' });
    doc.fontSize(15).text(`Voor: ${company}`, { align: 'center' });
    doc.moveDown();

    // Stats Section
    doc.fontSize(12).text('Belangrijkste Statistieken:', { underline: true });
    doc.text(`AI Maturity Score: ${scan_score}/100`);
    doc.text(`Geschatte ROI: €${Number(roi_estimate).toLocaleString('nl-BE', { minimumFractionDigits: 0 })} per jaar`);
    doc.moveDown();

    // Summary
    doc.fontSize(12).text('Executive Summary:', { underline: true });
    doc.fontSize(10).text(summary || 'Uv de scan en ROI calculatie blijkt dat er aanzienlijke kansen liggen voor automatisatie.');
    doc.moveDown();

    // Opportunities
    if (opportunities && Array.isArray(opportunities)) {
        doc.fontSize(12).text('Top AI Kansen:', { underline: true });
        opportunities.forEach(opt => doc.fontSize(10).text(`• ${opt}`));
        doc.moveDown();
    }

    // Tools
    if (tools && Array.isArray(tools)) {
        doc.fontSize(12).text('Aanbevolen Tools:', { underline: true });
        tools.forEach(tool => doc.fontSize(10).text(`• ${tool}`));
        doc.moveDown();
    }

    // Roadmap
    if (roadmap) {
        doc.fontSize(12).text('Implementatie Roadmap:', { underline: true });
        Object.entries(roadmap).forEach(([month, activity]) => {
            doc.fontSize(10).text(`${month}: ${activity}`);
        });
    }

    doc.end();
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).send('Failed to generate PDF');
  }
};
