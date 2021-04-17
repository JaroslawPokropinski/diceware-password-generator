import PyPDF2
import re
import random
from io import BufferedReader


def getWords(file: BufferedReader):
    reader = PyPDF2.PdfFileReader(file)

    textList = [reader.getPage(i).extractText()
                for i in range(reader.getNumPages())]
    text = '\n'.join(textList)

    textNoSpace = text.replace(' ', '').replace('\n', '')
    textWithSpaces = re.sub(r"([0-9])([a-zA-Z])", r"\1 \2", textNoSpace)
    textWithLines = re.sub(r"([a-zA-Z])([0-9])", r"\1\n\2", textWithSpaces)

    words = re.sub(r"([0-9])+ ", r"", textWithLines).split('\n')

    return words


if __name__ == '__main__':
    adjsPdf = open('adjectives.pdf', 'rb')
    nounsPdf = open('nouns.pdf', 'rb')

    adjs = getWords(adjsPdf)
    nouns = getWords(nounsPdf)

    print('{} {} {} {}'.format(
        random.choice(adjs),
        random.choice(nouns),
        random.choice(adjs),
        random.choice(nouns),
    ))
