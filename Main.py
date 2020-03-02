import argparse
import itertools
from builtins import len

parser = argparse.ArgumentParser()
parser.add_argument( "-l", help="Show a Language's potency",nargs=2,  metavar="")
args = parser.parse_args()

def splitter(string):
    string = string[1: len(string) - 1].split(",")
    return string

def separateT(lang, final=None):
    strx = ""
    for i in lang:
        for z in i:
            strx += z
        final.append(strx)
        strx = ""
    return final

if args.l:
    potencia = int(args.l[1])
    lenguajefix = splitter(args.l[0])
    print(lenguajefix)

    final = separateT(itertools.product(lenguajefix, repeat=potencia),[])
    print(final)