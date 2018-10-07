function isNumberEndingCero(pNumber) {
    return pNumber % 10 == 0;
} // retorna true si el numero acaba en cero

function isNumberEndingIn(pNumber, pEnding) {
    let long = pEnding.length;
    let divisor = 10 ** long;
    let ending = parseInt(pEnding);
    let number = parseInt(pNumber);

    return number % divisor == ending;
} // Retorna true si el número acaba en la terminación que le pedimos

function getAgeFrom(pdate_ddmmyyyy) {
    // la fecha se recibe en formato string dd/mm/yyyy
    // y devuelve la edad en formato numero

    let yearFromDate = parseInt(pdate_ddmmyyyy.slice(-4));
    let today = new Date();
    let age = today.getFullYear() - yearFromDate;

    return age;
}

function getSocialNumberEndingCero(pDataBase) {
    // la funcion devuelve un array con los pacientes cuyo numero
    // de la seguridad social acaba en cero

    let arr = new Array();
    let num = 0;

    for (let i = 0; i < pDataBase.length; i++) {
        num = parseInt(pDataBase[i].social_number);
        if (isNumberEndingCero(num)) {
            arr.push(pDataBase[i]);
        }
    }

    return arr;
}

function getSocialNumberEndingIn(pDataBase, pEnding) {
    // la funcion devuelve un array con los pacientes cuyo numero
    // de la seguridad social acaban en pEnding

    let arr = new Array();
    // let num = 0;

    for (let i = 0; i < pDataBase.length; i++) {
        // num = parseInt(pDataBase[i].social_number);
        if (isNumberEndingIn(pDataBase[i].social_number, pEnding)) {
            arr.push(pDataBase[i]);
        }
    }

    return arr;
}

function getPatients(pDataBase, pFromAge, toAge) {
    let arr = new Array();
    let patientAge = 0;

    for (let i = 0; i < pDataBase.length; i++) {
        patientAge = getAgeFrom(pDataBase[i].date_birth);
        if (patientAge >= pFromAge && patientAge <= toAge) {
            arr.push(pDataBase[i]);
        }
    } 

    return arr;
}

function createListFrom(pArray) {
    // le pasamos un array y devuelve un string en forma de lista

    let content = '<ul>';
    for (let i = 0; i < pArray.length; i++) {
        content += '<li>' + pArray[i].first_name + ' ' +
                            pArray[i].last_name + ' ' +
                            pArray[i].date_birth + ' ' +
                            pArray[i].gender + ' ' +
                            pArray[i].social_number + ' ' + 
                            pArray[i].email + ' ' +
                            pArray[i].phone_number + ' ' +
                            pArray[i].diagnosis +'</li>';
    }
    content += '</ul>';

    return content;
}

function createTable(pDataBase, pHeaderArray, pFieldsArray) {
    // la función recibe una base de datos, un array con los títulos de la cabecera de la tablaç
    // y un array con los campos que queremos en la tabla
    // Nos devuelve un string con el html creado.

    let content = '<table>';

    // formamos la cabecera

    content += '<tr>';
    for (let i = 0; i < pHeaderArray.length; i++) {
        content += '<th>' + pHeaderArray[i] + '</th>';
    }
    content += '</tr>';

    // formamos el cuerpo de la tabla

    for (let j = 0; j < pDataBase.length; j++) {
        content += '<tr>';
        for (let k = 0; k < pFieldsArray.length; k++) {
            content += '<td>' + pDataBase[j][pFieldsArray[k]] + '</td>';
        }
        content += '</tr>';
    }

    content += '</table>';
    return content;
}

//------------- Fin declaración de funciones --------------------------



// Listamos los pacientes cuyo número de la seguridad social acaba en
// el número que le indicamos

function socialNumber() {
    let listado = new Array();
    let contenido = '';
    let cabecera = new Array('Nombre', 'Apellidos', 'Fecha de nacimiento', 'Género', 'Número S.S.', 'Email', 'Teléfono', 'Diagnóstico');
    let cuerpo = new Array('first_name', 'last_name', 'date_birth', 'gender', 'social_number', 'email', 'phone_number', 'diagnosis');
    
    let ending = document.getElementById('social').value;

    if (ending != '') {
        listado = getSocialNumberEndingIn(db_pacientes, ending);
        // contenido = createListFrom(listado); // Versión listado
        contenido = createTable(listado, cabecera, cuerpo); // Versión tabla
        // document.getElementById('data').innerHTML = contenido;
        displayInside('data', contenido);
        
        document.getElementById('footer').style.position = 'static';
        document.getElementById('social').value = '';
    }
}

// Listamos los pacientes que están en un rango de edad

function edad(){
    let listado = new Array();
    let contenido = '';
    let cabecera = new Array('Nombre', 'Apellidos', 'Fecha de nacimiento', 'Género', 'Número S.S.', 'Email', 'Teléfono', 'Diagnóstico');
    let cuerpo = new Array('first_name', 'last_name', 'date_birth', 'gender', 'social_number', 'email', 'phone_number', 'diagnosis');

    let fromAge = parseInt(document.getElementById('fromAge').value);
    let toAge = parseInt(document.getElementById('toAge').value);

    if (fromAge != NaN && toAge != NaN && fromAge > 0 && toAge > 0) {
        if (fromAge < toAge) {
            listado = getPatients(db_pacientes, fromAge, toAge);
        } else {
            listado = getPatients(db_pacientes, toAge, fromAge);
        }
        contenido = createTable(listado, cabecera, cuerpo); // Versión tabla
        displayInside('data', contenido);

        document.getElementById('footer').style.position = 'static';
        document.getElementById('fromAge').value = '';
        document.getElementById('toAge').value = '';
    }

    // contenido = createListFrom(listado); // Versión listado
    // document.getElementById('data').innerHTML = contenido;
}

function copyrightMsg(pMsgString){
    let year = new Date();
    let msg = '<p>' + pMsgString + ' &copy; ' + year.getFullYear() + '</p>';

    return msg;
}

function displayInside(pId, pContent){
    document.getElementById(pId).innerHTML = pContent;
}

displayInside('footer', copyrightMsg('All Rights Reserved'));