const ALPHABET = ['a', 'b']
const LOADED = 'cargado!'
const WAIT = 'Esperando...'
let isCounting = false
let line = []
let caretpos = 0
let initx = true

/**
 * begin - Funcion para correr el programa
 */
begin = () => {
    init()
}

/**
 * setCaret - movimiento del cursor
 */
setCaret = () => {


    const digitBlockWidth = 80
    const caretWidth = 50
    let caretLeft = 0

    if (!initx) {
        caretLeft =
            caretpos * digitBlockWidth + 10
    } else {
        caretLeft = digitBlockWidth * (document.getElementById('string').value.length - 1) + 15
        initx = false
    }
    document.querySelector('.caret').style.left = `${caretLeft}px`
}

/**
 * init - Inicia la maquina de turing
 * @Const str cadena extraida del input
 * @Const parent div que contiene a los nodos
 */
init = () => {
    isCounting = false
    line = []

    let re = new RegExp('^[a|b]+$')
    const str = document.getElementById('string').value

    //Validar expresion regular
    if (!re.test(str)) {
        alert('no valida')
        return
    }
    line = str

    //Insertar Nodos
    const parent = document.querySelector('.digit-list')
    for (let i = 0; i < str.length; i++) {
        let child = document.createElement("div")
        child.classList.add("digit")
        parent.appendChild(child)
    }


    //colocar cada letra en su lugar
    document.querySelectorAll('.digit').forEach((block, inx) => {
        window.setTimeout(() => {
            block.innerHTML = line[inx]
        }, 200 * inx)
    })

    caretpos = Math.floor(Math.random() * document.getElementById('string').value.length);

    setCaret()

    //Inicio de la maquina
    setStatus(LOADED);
    window.setTimeout(() => {
        start()
    }, 3000)
}

/**
 * reload - Reinicia todos los valores
 */
reload = () => {
    document.querySelector('.status').innerHTML = WAIT
    document.querySelector('.caret').style.left = '10px'
    initx = true
    document.getElementById('string').value = ""
    caretpos = 0
    var cell = document.getElementById("digit-list");

    //Elimina nodos anteriores
    if (cell.hasChildNodes()) {
        while (cell.childNodes.length >= 1) {
            cell.removeChild(cell.firstChild);
        }
    }

    if (isCounting) {
        return
    }


    //init()
}

/**
 * setStatus - valores de la consola (la parte negra )
 */
setStatus = (status, delay = 1200) => {
    window.setTimeout(() => {
        document.querySelector('.status').innerHTML = status
    }, delay)
}

/**
 * start - Inicia la maquina de turing
 */
start = () => {
    isCounting = true
    document.querySelectorAll('.digit').forEach((block, inx) => {
        window.setTimeout(() => {
            document.querySelector('.status').innerHTML = 'moviendo la cinta...'
            setStatus('leyendo cinta...', 1100)

            caretpos = inx
            console.log('b'.includes(line[inx]));
            setCaret()

            //se sobreescribe la letra
            if ('b'.includes(line[inx])) {
                setStatus('sobreescribiendo a ', 1800)
                line[inx] = 'a'
                window.setTimeout(() => {
                    block.innerHTML = 'a'
                }, 1800)
            } else {
                setStatus('', 1800)
            }
        }, 2500 * inx)
    })

    window.setTimeout(() => {
        document.querySelector('.status').innerHTML = 'Completado.'
        document.querySelector('.caret').style.left = '10px'
        isCounting = false
    }, 2500 * document.getElementById('string').value.length - 1)
}