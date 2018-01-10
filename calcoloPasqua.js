function calcolaPasqua(anno){
    var a;
    var b;
    var c;
    var Y = 2019;
    var d;
    var e;
    var M;
    var N;
    var giorno;
    var mese;

     if (Y < 2099){
        M = 24;
        N = 5;
     }else if (Y < 2199){
        M = 24;
        N = 6;
     }
    else if (Y < 2299){
        M = 25;
        N = 0;
    }else if (Y < 2399){
        M = 26;
        N = 1;
    }else if(Y < 2499){
        M = 25;
        N = 1;
    }

    a = Y % 19;
    b = Y % 4;
    c = Y % 7;
    d = ((19*a) + M) % 30
    e = ((2*b) + (4*c) + (6*d) + N) % 7;

    if (d + e < 10){
        giorno = d+e+22;
        mese = 3;
    }else{
        giorno = d+e-9;
        mese = 4;
    }if (giorno==26 && mese==4){
        giorno = 19;
        mese = 4;
    }if (giorno==25 && mese==4 && d==28 && e==6 && a>10){
        giorno=18;
        mese=4;
    }
    
    return [mese,giorno];
    
} 

