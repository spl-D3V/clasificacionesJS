function category(anio){
    if (anio > 2014){
        return 0;
    }else if(anio > 2012){
        return 1;
    }else if(anio > 2010){
        return 2;
    }else if(anio > 2008){
        return 3;
    }else if(anio > 2006){
        return 4;
    }else if(anio > 2004){
        return 5;
    }else if(anio > 2001){
        return 6;
    }else if(anio > 1982){
        return 7;
    }else if(anio < 1983){
        return 8;
    }else{
        return 9;
    }
};

function transCategoria(catid){
    let label = "";
    switch (catid) {
        case 0:
            label = "Chupetines";
            break;
        case 1:
            label = "Prebenjamin";
            break;
        case 2:
            label = "Benjamin";
            break;
        case 3:
            label = "Alevin";
            break;
        case 4:
            label = "Infantil";
            break;
        case 5:
            label = "Cadete";
            break;
        case 6:
            label = "Junior";
            break;
        case 7:
            label = "Senior";
            break;
        case 8:
            label = "Veterano";
            break;
        case 9:
            label = "Mascota";
            break;
        default:
            label = "Desconocido";
            break;
    }
    return label;
};

function transSexo(catid){
    let label = "";
    switch (catid) {
        case 0:
            label = "Hombre";
            break;
        case 1:
            label = "Mujer";
            break;
        default:
            label = "Desconocido";
            break;
    }
    return label;
};

module.exports = {category, transCategoria, transSexo};