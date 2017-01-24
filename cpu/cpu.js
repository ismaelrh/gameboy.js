/**
 * Main CPU file
 */

CPU = {

    _r: {
    a:0,b:0,c:0,d:0,e:0,h:0,l:0, //1-Byte registers
    f:0, //Flag, 1-Byte register
    sp:0, //Stack-Pointer, 2-Byte register
    pc:0 //Program-Counter, 2-Byte register
    },

    _init: function(){
        CPU._r.pc = 0x100; //Put PC to 100 hex,
        CPU._r.sp = 0xFFFE;//Put SP to 0xFFFE, programmer should change it
        CPU._r.a = 0;
        CPU._r.b = 0;
        CPU._r.c = 0;
        CPU._r.d = 0;
        CPU._r.e = 0;
        CPU._r.h = 0;
        CPU._r.l = 0;
        CPU._r.f = 0;

    },







    //Single register codes have 3 bits
    //Official manual, page 85
    getRegisterFromCode: function(code){
        switch(code){
            case 0x7:
                return CPU._r.a;
            case 0x0:
                return CPU._r.b;
            case 0x1:
                return CPU._r.c;
            case 0x2:
                return CPU._r.d;
            case 0x3:
                return CPU._r.e;
            case 0x4:
                return CPU._r.h;
            case 0x5:
                return CPU._r.l;
        }

    },

    extractByte: function(inst,pos){
        var mask = 0xFF << (8*pos); //Create mask
        var res = (inst&mask) >> (8*pos); //Extract byte
        return res;
    },

    extractNibble: function(inst,pos){
        var mask = 0xF << (4*pos);
        return (inst&mask) >> (4*pos);
    }







};

