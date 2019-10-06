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
    }
};

module.exports = {category};