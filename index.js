function convertText(text) {
    const symbolsOne = ["ç", "˜", ".", "'m", "]m", "Fmf", "Fm", ")", "!", "@", "#", "$", "%", "^", "&", "*", "(", "k|m", "em", "km", "Qm", "qm", "N˜", "¡", "¢", "1", "2", "4", ">", "?", "B", "I", "Q", "ß", "q", "„", "‹", "•", "›", "§", "°", "¶", "¿", "Å", "Ë", "Ì", "Í", "Î", "Ý", "å", "6«", "7«", "8«", "9«", "Ø", "|", "8Þ", "9Þ", "S", "s", "V", "v", "U", "u", "£", "3", "ª", "R", "r", "5", "H", "h", "‰", "´", "~", "`", "6", "7", "8", "9", "0", "T", "t", "Y", "y", "b", "W", "w", "G", "g", "K", "k", "ˆ", "A", "a", "E", "e", "D", "d", "o", "/", "N", "n", "J", "j", "Z", "z", "i", ":", ";", "X", "x", "cf‘", "c‘f", "cf}", "cf]", "cf", "c", "O{", "O", "pm", "p", "C", "P]", "P", "f‘", "\"", "'", "+", "f", "[", "\\", "]", "}", "F", "L", "M", "्ा", "्ो", "्ौ", "अो", "अा", "आै", "आे", "ाो", "ाॅ", "ाो", "ंु", "ेे", "अै", "ाो", "अे", "ंा", "अॅ", "ाै", "ैा", "ंृ", "ँा", "ँू", "ेा", "ंे"];
    const symbolsTwo = ["ॐ", "ऽ", "।", "m'", "m]", "mfF", "mF", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "फ्र", "झ", "फ", "क्त", "क्र", "ल", "ज्ञ्", "द्घ", "ज्ञ", "द्द", "द्ध", "श्र", "रु", "द्य", "क्ष्", "त्त", "द्म", "त्र", "ध्र", "ङ्घ", "ड्ड", "द्र", "ट्ट", "ड्ढ", "ठ्ठ", "रू", "हृ", "ङ्ग", "त्र", "ङ्क", "ङ्ख", "ट्ठ", "द्व", "ट्र", "ठ्र", "ड्र", "ढ्र", "्य", "्र", "ड़", "ढ़", "क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट", "ठ", "ड", "ढ", "ण्", "त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्", "न", "प्", "प", "फ्", "ब्", "ब", "भ्", "भ", "म्", "म", "य", "र", "ल्", "ल", "व्", "व", "श्", "श", "ष्", "स्", "स", "ह्", "ह", "ऑ", "ऑ", "औ", "ओ", "आ", "अ", "ई", "इ", "ऊ", "उ", "ऋ", "ऐ", "ए", "ॉ", "ू", "ु", "ं", "ा", "ृ", "्", "े", "ै", "ँ", "ी", "ः", "", "े", "ै", "ओ", "आ", "औ", "ओ", "ो", "ॉ", "ो", "ुं", "े", "अ‍ै", "ो", "अ‍े", "ां", "अ‍ॅ", "ौ", "ौ", "ृं", "ाँ", "ूँ", "ो", "ें"];
    const symbolsLength = symbolsOne.length;

    const maxTextSize = 6000;

    const processedChunks = [];
    let startIndex = 0;
    let endIndex = 0;
    let hasNextChunk = true;

    while (hasNextChunk) {
        startIndex = endIndex;
        if (endIndex < text.length - maxTextSize) {
            endIndex += maxTextSize;
            while (text.charAt(endIndex) !== ' ') {
                endIndex--;
            }
        } else {
            endIndex = text.length;
            hasNextChunk = false;
        }
        const chunk = text.substring(startIndex, endIndex);
        const processedChunk = replaceSymbols(chunk, symbolsLength, symbolsOne, symbolsTwo);
        processedChunks.push(processedChunk);
    }

    return processedChunks.join('');
}

function replaceSymbols(chunk, symbolsLength, symbolsOne, symbolsTwo) {
    let modifiedChunk = chunk;

    const symbolMap = {};
    for (let i = 0; i < symbolsLength; i++) {
        symbolMap[symbolsOne[i]] = symbolsTwo[i];
    }

    Object.entries(symbolMap).forEach(([symbol, replacement]) => {
        modifiedChunk = modifiedChunk.split(symbol).join(replacement);
    });

    modifiedChunk = modifiedChunk.replace(/l(?=[^\s])/g, (match, p1) => `${p1}ि`);
    modifiedChunk = modifiedChunk.replace(/ि्([^िःँं़])/g, (match, p1) => `्${p1}ि`);
    modifiedChunk = modifiedChunk.replace(/िं्([^िःँं़])/g, (match, p1) => `्${p1}िं`);

    modifiedChunk = modifiedChunk.replace(/=/g, '.')
        .replace(/_/g, ')')
        .replace(/Ö/g, '=')
        .replace(/Ù/g, ';')
        .replace(/…/g, '‘')
        .replace(/Ú/g, '’')
        .replace(/Û/g, '!')
        .replace(/Ü/g, '%')
        .replace(/æ/g, '“')
        .replace(/Æ/g, '”')
        .replace(/±/g, '+')
        .replace(/-/g, '(')
        .replace(/</g, '?');

    return modifiedChunk;
}  