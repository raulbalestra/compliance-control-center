#!/usr/bin/env python3
"""Gera um certificado NR-10 mock em PDF puro (sem dependências externas)."""

def pdf_string(s):
    return s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def build_pdf(lines_content):
    objects = []
    
    # Object 1: Catalog
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    
    # Object 2: Pages
    objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    
    # Object 3: Page
    objects.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n")
    
    # Object 4: Content stream
    stream_lines = []
    y = 800
    
    def push(cmd):
        stream_lines.append(cmd)
    
    # Yellow header bar
    push("0.95 0.85 0.1 rg")
    push("0 820 595 22 re f")
    
    # Green accent bar
    push("0.0 0.5 0.1 rg")
    push("0 818 595 4 re f")

    # Title
    push("0 0 0 rg")
    push("BT")
    push("/F2 18 Tf")
    push("120 793 Td")
    push("(CERTIFICADO DE TREINAMENTO NR-10) Tj")
    push("ET")

    # Subtitle
    push("BT")
    push("/F1 11 Tf")
    push("145 775 Td")
    push("(Seguranca em Instalacoes e Servicos em Eletricidade) Tj")
    push("ET")

    # Separator line
    push("0.0 0.5 0.1 rg")
    push("50 768 495 2 re f")
    push("0 0 0 rg")

    # Certificate number
    push("BT")
    push("/F1 9 Tf")
    push("400 754 Td")
    push("(N\\272 Certificado: NR10-2025-004872) Tj")
    push("ET")

    # Certifica que
    push("BT")
    push("/F1 11 Tf")
    push("50 740 Td")
    push("(Certificamos que o(a) profissional abaixo identificado(a) concluiu com aproveitamento o) Tj")
    push("ET")
    push("BT")
    push("/F1 11 Tf")
    push("50 724 Td")
    push("(treinamento em Seguranca em Instalacoes e Servicos em Eletricidade - NR-10, conforme) Tj")
    push("ET")
    push("BT")
    push("/F1 11 Tf")
    push("50 708 Td")
    push("(exigido pela Norma Regulamentadora N\\272 10 do Ministerio do Trabalho e Emprego.) Tj")
    push("ET")

    # Worker info box background
    push("0.94 0.97 0.94 rg")
    push("50 600 495 95 re f")
    push("0.0 0.5 0.1 rg")
    push("50 600 495 95 re S")
    push("0 0 0 rg")

    # Worker data
    fields = [
        ("Nome Completo", "Joao da Silva Santos"),
        ("CPF", "123.456.789-00"),
        ("Cargo / Funcao", "Eletricista"),
        ("Empresa", "Construtora ACME Ltda"),
        ("CNPJ Empresa", "12.345.678/0001-90"),
    ]
    y_field = 682
    for label, value in fields:
        push("BT")
        push("/F2 10 Tf")
        push(f"60 {y_field} Td")
        push(f"({pdf_string(label)}: ) Tj")
        push("ET")
        push("BT")
        push("/F1 10 Tf")
        push(f"175 {y_field} Td")
        push(f"({pdf_string(value)}) Tj")
        push("ET")
        y_field -= 15

    # Course details box
    push("0.97 0.97 1.0 rg")
    push("50 490 495 100 re f")
    push("0.2 0.2 0.7 rg")
    push("50 490 495 100 re S")
    push("0 0 0 rg")

    push("BT")
    push("/F2 10 Tf")
    push("60 577 Td")
    push("(DADOS DO CURSO) Tj")
    push("ET")

    course_fields = [
        ("Modalidade", "NR-10 Basico + SEP (com Qualificacao)"),
        ("Carga Horaria", "40 horas (presencial)"),
        ("Local de Realizacao", "Centro de Treinamento ACME - Sao Paulo/SP"),
        ("Instrutor Responsavel", "Eng. Marcos Antonio Pereira - CREA 123456/SP"),
        ("Periodo de Realizacao", "10/01/2025 a 14/01/2025"),
    ]
    y_field = 560
    for label, value in course_fields:
        push("BT")
        push("/F2 10 Tf")
        push(f"60 {y_field} Td")
        push(f"({pdf_string(label)}: ) Tj")
        push("ET")
        push("BT")
        push("/F1 10 Tf")
        push(f"195 {y_field} Td")
        push(f"({pdf_string(value)}) Tj")
        push("ET")
        y_field -= 15

    # Validity box
    push("1.0 0.95 0.85 rg")
    push("50 440 495 42 re f")
    push("0.8 0.4 0.0 rg")
    push("50 440 495 42 re S")
    push("0 0 0 rg")

    push("BT")
    push("/F2 12 Tf")
    push("60 468 Td")
    push("(Validade do Certificado) Tj")
    push("ET")
    push("BT")
    push("/F1 11 Tf")
    push("60 450 Td")
    push("(Data de Emissao: 14/01/2025     Data de Vencimento: 14/01/2027) Tj")
    push("ET")

    # Result
    push("0.0 0.45 0.0 rg")
    push("BT")
    push("/F2 13 Tf")
    push("195 415 Td")
    push("(RESULTADO: APROVADO) Tj")
    push("ET")
    push("0 0 0 rg")

    push("BT")
    push("/F1 9 Tf")
    push("120 398 Td")
    push("(Nota Final: 9,2 / 10,0     Frequencia: 100%     Avaliacao Pratica: Aprovado) Tj")
    push("ET")

    # Separator
    push("0.0 0.5 0.1 rg")
    push("50 385 495 1 re f")
    push("0 0 0 rg")

    # Signature area
    push("BT")
    push("/F1 9 Tf")
    push("60 365 Td")
    push("(_________________________________) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("60 352 Td")
    push("(Eng. Marcos Antonio Pereira) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("60 340 Td")
    push("(Instrutor - CREA 123456/SP) Tj")
    push("ET")

    push("BT")
    push("/F1 9 Tf")
    push("260 365 Td")
    push("(_________________________________) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("260 352 Td")
    push("(Dr. Carlos Eduardo Lima) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("260 340 Td")
    push("(Diretor Tecnico - Centro de Treinamento ACME) Tj")
    push("ET")

    push("BT")
    push("/F1 9 Tf")
    push("440 365 Td")
    push("(_____________) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("445 352 Td")
    push("(Participante) Tj")
    push("ET")

    # Footer
    push("0.3 0.3 0.3 rg")
    push("BT")
    push("/F1 8 Tf")
    push("50 310 Td")
    push("(Certificado emitido em conformidade com a NR-10 (Portaria SIT n\\272 598/2015) e NR-1 (Portaria MTE n\\272 3.214/78).) Tj")
    push("ET")
    push("BT")
    push("/F1 8 Tf")
    push("50 296 Td")
    push("(Este documento pode ser verificado em www.acme-treinamentos.com.br/verificar usando o codigo: NR10-2025-004872) Tj")
    push("ET")

    push("0.0 0.5 0.1 rg")
    push("0 55 595 8 re f")
    push("1 1 1 rg")
    push("BT")
    push("/F1 8 Tf")
    push("170 58 Td")
    push("(Centro de Treinamento ACME Ltda  |  CNPJ: 98.765.432/0001-10  |  Sao Paulo - SP) Tj")
    push("ET")

    stream = "\n".join(stream_lines).encode("latin-1")
    objects.append(b"4 0 obj\n<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream\nendobj\n")
    
    # Object 5: Helvetica font
    objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n")
    # Object 6: Helvetica-Bold font
    objects.append(b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n")

    # Build the PDF binary
    pdf = b"%PDF-1.4\n"
    offsets = []
    for obj in objects:
        offsets.append(len(pdf))
        pdf += obj
    
    xref_offset = len(pdf)
    pdf += b"xref\n"
    pdf += f"0 {len(objects)+1}\n".encode()
    pdf += b"0000000000 65535 f \n"
    for off in offsets:
        pdf += f"{off:010d} 00000 n \n".encode()
    
    pdf += b"trailer\n"
    pdf += f"<< /Size {len(objects)+1} /Root 1 0 R >>\n".encode()
    pdf += b"startxref\n"
    pdf += f"{xref_offset}\n".encode()
    pdf += b"%%EOF\n"
    return pdf

output_path = "/home/higorbackenddev/compliance-control-center/test-nr10-cert.pdf"
pdf_data = build_pdf([])
with open(output_path, "wb") as f:
    f.write(pdf_data)

print(f"PDF gerado: {output_path} ({len(pdf_data)} bytes)")
