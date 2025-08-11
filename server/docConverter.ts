import mammoth from 'mammoth';

interface TextRun {
    text: string;
  }
  
interface Paragraph {
    type: 'paragraph';
    children: TextRun[];
  }
  
interface TableCell {
    type: 'tableCell';
    children: Paragraph[];
  }
  
interface TableRow {
    type: 'tableRow';
    children: TableCell[];
  }
  
interface Table {
    type: 'table';
    children: TableRow[];
  }
  
type DocumentNode = Paragraph | Table;
  
interface DocumentStructure {
    children: DocumentNode[];
  }  

export function getMarkdown(doc: DocumentStructure): string {
    let markdown = '';
  
    for (const block of doc.children) {
      // If it's a normal paragraph
      if (block.type === 'paragraph') {
        const text = block.children.map((child) => child.text).join('');
        markdown += `${text}\n\n`;
      }
  
      // If it's a table
      else if (block.type === 'table') {
        for (const row of block.children) {
          const rowText = row.children
            .map((cell) =>
              cell.children
                .map((p) => p.children.map((c) => c.text).join(''))
                .join(' ')
            )
            .join(' | ');
  
          markdown += `${rowText}\n`;
        }
        markdown += '\n';
      }
    }
  
    return markdown;
}