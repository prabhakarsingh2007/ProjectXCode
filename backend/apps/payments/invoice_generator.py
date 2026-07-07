import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_invoice_pdf(payment):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom stylesheet elements
    title_style = ParagraphStyle(
        'InvoiceTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        textColor=colors.HexColor('#6366f1'),
        spaceAfter=15
    )
    
    body_style = ParagraphStyle(
        'InvoiceBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        spaceAfter=4
    )
    
    # Title Header
    story.append(Paragraph("PROJECTXCODE INVOICE", title_style))
    story.append(Spacer(1, 10))
    
    project = payment.project_request
    client = project.client
    
    # Billing grids mapping
    data = [
        [
            Paragraph("<b>Invoice Number:</b>", body_style), Paragraph(f"{payment.transaction_id}", body_style),
            Paragraph("<b>Date Issued:</b>", body_style), Paragraph(f"{payment.created_at.strftime('%Y-%m-%d')}", body_style)
        ],
        [
            Paragraph("<b>Billed To:</b>", body_style), Paragraph(f"{client.first_name or client.username}", body_style),
            Paragraph("<b>Company:</b>", body_style), Paragraph(f"{client.company or 'N/A'}", body_style)
        ],
        [
            Paragraph("<b>Payment Status:</b>", body_style), Paragraph(f"<font color='green'><b>{payment.status.upper()}</b></font>", body_style),
            Paragraph("<b>Gateway:</b>", body_style), Paragraph(f"{payment.payment_method}", body_style)
        ]
    ]
    
    t1 = Table(data, colWidths=[100, 160, 100, 160])
    t1.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t1)
    story.append(Spacer(1, 30))
    
    # Product listing mapping
    item_data = [
        ["Service Description", "Unit Price", "Qty", "Total Amount"],
        [
            f"Agency Package: {project.service.name if project.service else 'Custom Engineering Scope'}", 
            f"${payment.amount:,.2f}", "1", f"${payment.amount:,.2f}"
        ],
        ["", "", "Total Paid:", f"${payment.amount:,.2f}"]
    ]
    
    t2 = Table(item_data, colWidths=[260, 90, 80, 90])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f3f4f6')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#1f2937')),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (1,0), (-1,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,1), 0.5, colors.HexColor('#e5e7eb')),
        ('LINEABOVE', (2,2), (3,2), 1, colors.HexColor('#1f2937')),
        ('FONTNAME', (2,2), (3,2), 'Helvetica-Bold'),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t2)
    
    story.append(Spacer(1, 40))
    story.append(Paragraph("Thank you for choosing ProjectXCode. We appreciate your business!", body_style))
    
    doc.build(story)
    buffer.seek(0)
    return buffer
