#!/usr/bin/env python3
"""Generates a minimal valid PDF with realistic worker document content for testing."""

import os

def create_pdf(path):
    content = b'''BT
/F1 11 Tf
50 750 Td
(HOLERITE - FOLHA DE PAGAMENTO) Tj
/F1 10 Tf
0 -25 Td
(Empresa: Construtora ACME Ltda) Tj
0 -15 Td
(CNPJ: 12.345.678/0001-90) Tj
0 -25 Td
(Funcionario: Joao da Silva Santos) Tj
0 -15 Td
(CPF: 123.456.789-00) Tj
0 -15 Td
(Cargo: Eletricista) Tj
0 -15 Td
(Matricula: 001234) Tj
0 -15 Td
(Periodo de Referencia: Fevereiro/2026) Tj
0 -25 Td
(PROVENTOS) Tj
0 -15 Td
(Salario Base: R$ 3.500,00) Tj
0 -15 Td
(Adicional de Periculosidade: R$ 1.050,00) Tj
0 -15 Td
(TOTAL PROVENTOS: R$ 4.550,00) Tj
0 -25 Td
(DESCONTOS) Tj
0 -15 Td
(INSS: R$ 501,82) Tj
0 -15 Td
(IRRF: R$ 112,00) Tj
0 -15 Td
(TOTAL DESCONTOS: R$ 613,82) Tj
0 -25 Td
(LIQUIDO A RECEBER: R$ 3.936,18) Tj
0 -30 Td
(Validade do documento: 28/02/2026) Tj
0 -30 Td
(Assinatura do Funcionario: _______________________) Tj
0 -20 Td
(Assinatura do Responsavel: _______________________) Tj
0 -15 Td
(Carimbo da Empresa) Tj
ET'''

    content_len = len(content)

    obj1 = b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'
    obj2 = b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'
    obj3 = b'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n'
    obj4 = ('4 0 obj\n<< /Length ' + str(content_len) + ' >>\nstream\n').encode() + content + b'\nendstream\nendobj\n'
    obj5 = b'5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'

    header = b'%PDF-1.4\n'
    all_objs = [obj1, obj2, obj3, obj4, obj5]

    offsets = []
    pos = len(header)
    for obj in all_objs:
        offsets.append(pos)
        pos += len(obj)

    xref_pos = pos

    xref = 'xref\n0 6\n0000000000 65535 f \n'
    for off in offsets:
        xref += f'{off:010d} 00000 n \n'

    trailer = f'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n'

    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)

    with open(path, 'wb') as f:
        f.write(header)
        for obj in all_objs:
            f.write(obj)
        f.write(xref.encode())
        f.write(trailer.encode())

    print(f"PDF gerado: {path}")
    print(f"Tamanho: {os.path.getsize(path)} bytes")
    print()
    print("Dados do documento:")
    print("  Funcionario : Joao da Silva Santos")
    print("  Cargo       : Eletricista")
    print("  Empresa     : Construtora ACME Ltda")
    print("  Periodo     : Fevereiro/2026")
    print("  Validade    : 28/02/2026")
    print()
    print("Use este arquivo no Upload e selecione um worker com nome similar no formulario.")

create_pdf('/home/higorbackenddev/compliance-control-center/test-holerite.pdf')
