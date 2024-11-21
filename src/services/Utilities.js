export function getBase64Prefix(fileExtension) {
    let base64Prefix;

    switch (fileExtension.toLowerCase()) {
        case '.jpg':
            base64Prefix = 'data:image/jpeg;base64,';
            break;
        case '.jpeg':
            base64Prefix = 'data:image/jpeg;base64,';
            break;
        case '.png':
            base64Prefix = 'data:image/png;base64,';
            break;
        case '.gif':
            base64Prefix = 'data:image/gif;base64,';
            break;
        case '.bmp':
            base64Prefix = 'data:image/bmp;base64,';
            break;
        case '.pdf':
            base64Prefix = 'data:application/pdf;base64,';
            break;
        case '.doc':
        case '.docx':
            base64Prefix = 'data:application/msword;base64,';
            break;
        case '.xls':
        case '.xlsx':
            base64Prefix = 'data:application/vnd.ms-excel;base64,';
            break;
        case '.txt':
            base64Prefix = 'data:text/plain;base64,';
            break;
        default:
            base64Prefix = 'data:application/octet-stream;base64,'; // Genel dosya tipi
            break;
    }

    return base64Prefix;
}