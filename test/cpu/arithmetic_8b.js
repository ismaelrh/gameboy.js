/**
 * Created by ismaro3 on 24/01/2017.
 */

QUnit.test( "SUM", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 5;
    CPU._r.e = 3;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0
    };
    CPU.add_A_r(inst);
    assert.ok( CPU._r.a == 8, "Passed!" );
});
QUnit.test( "SUM with overflow", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 255;
    CPU._r.e = 2;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n:0
    };
    CPU.add_A_r(inst);

    assert.equal( CPU._r.a , 0x01,"Result is correct");
    assert.equal(CPU._r.f&0x10, 0x10,"C flag activated")
});
QUnit.test( "SUM with half-overflow", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 0xF;
    CPU._r.e = 0x1;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n:0
    };

    CPU.add_A_r(inst);

    //assert.equal( CPU._r.a , 0x01,"Result is correct");
    assert.equal(CPU._r.f, 0x20,"H flag activated")
});

QUnit.test( "SUM_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0xA
    };

    CPU.add_A_n(inst);

    assert.equal(CPU._r.a, 0x9,"Result is correct");
    assert.equal(CPU._r.f, 0x30, "H and C flags are set");


});


QUnit.test( "ADD_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x000A;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x0
    };

    CPU.add_A_HL(inst);

    assert.equal(CPU._r.a, 0x9,"Result is correct");
    assert.equal(CPU._r.f, 0x30, "H and C flags are set");


});


QUnit.test( "ADDC_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.e = 0x0F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1, //To indicate that has carry
        r2: 0x03, //To indicate register E
        n: 0x00
    };

    CPU.add_A_r(inst);

    assert.equal(CPU._r.a, 0xF1,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");



});

QUnit.test( "ADDC_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.h = 0x00;
    CPU._r.l = 0x1E;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1,
        r2: 0x0,
        n: 0x3B
    };

    CPU.add_A_n(inst);

    assert.equal(CPU._r.a, 0x1D,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");



});

QUnit.test( "ADDC_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x1E;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1,
        r2: 0x0,
        n: 0x0
    };

    CPU.add_A_HL(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "SUB_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;
    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0
    };

    CPU.sub_A_r(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUB_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;
    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.sub_A_n(inst);

    assert.equal(CPU._r.a, 0x2F,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUB_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0X40;

    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.sub_A_HL(inst);

    assert.equal(CPU._r.a, 0xFE,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "SUBC_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0x00;
    CPU._r.l = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_r(inst);

    assert.equal(CPU._r.a, 0x10,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUBC_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0x00;
    CPU._r.l = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_n(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUBC_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_HL(inst);

    assert.equal(CPU._r.a, 0xEB,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "AND_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_r(inst);

    assert.equal(CPU._r.a, 0x1A,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "AND_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_n(inst);

    assert.equal(CPU._r.a, 0x18,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "AND_A_HL", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0xBE;
    CPU._r.l = 0x3F;
    MEM._m[0xBE3F] = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_HL(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


QUnit.test( "XOR_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3F;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x8A;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.xor_A_r(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


QUnit.test( "XOR_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x8A;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.xor_A_n(inst);

    assert.equal(CPU._r.a, 0xF0,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "XOR_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;
    CPU._r.e = 0x3F;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x8A;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.xor_A_HL(inst);

    assert.equal(CPU._r.a, 0x75,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "OR_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x00;
    CPU._r.e = 0x00;
    CPU._r.h = 0x00;
    CPU._r.l = 0x0F;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x03
    };

    CPU.or_A_r(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});
QUnit.test( "OR_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x00;
    CPU._r.h = 0x00;
    CPU._r.l = 0x0F;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x03
    };

    CPU.or_A_n(inst);

    assert.equal(CPU._r.a, 0x5B,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 10");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


QUnit.test( "OR_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x00;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0X0F;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x03
    };

    CPU.or_A_HL(inst);

    assert.equal(CPU._r.a, 0x5F,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});



QUnit.test( "CP_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3C;
    CPU._r.b = 0x2F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x3C
    };

    CPU.cp_A_r(inst);

    assert.equal(CPU._r.a, 0x3C,"Result is correct (A not changed)");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


QUnit.test( "CP_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3C;
    CPU._r.b = 0x2F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x3C
    };

    CPU.cp_A_n(inst);

    assert.equal(CPU._r.a, 0x3C,"Result is correct (A not changed)");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


QUnit.test( "CP_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3C;
    CPU._r.b = 0x2F;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x40;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x3C
    };

    CPU.cp_A_HL(inst);

    assert.equal(CPU._r.a, 0x3C,"Result is correct (A not changed)");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "INC_R", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.c = 0xFF;
    CPU._r.f = 0x10; //Set carry flag to see if it remains


    var inst = {
        opcode: 0x2,
        r1: 0x1,
        r2: 0x0,
        n: 0x0
    };

    CPU.inc_r(inst);

    assert.equal(CPU._r.c, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "INC_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.c = 0xFF;
    CPU._r.f = 0x10; //Set carry flag to see if it remains
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x50;



    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x0
    };

    CPU.inc_HL(inst);

    assert.equal(MEM.readByte(0xBEBA), 0x51,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "DEC_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.f = 0x10; //Set carry flag to see if it remains
    CPU._r.l = 0x01;



    var inst = {
        opcode: 0x2,
        r1: 0x5, //In 1st!
        r2: 0x0,
        n: 0x0
    };

    CPU.dec_r(inst);

    assert.equal(CPU._r.l, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "DEC_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.f = 0x10; //Set carry flag to see if it remains
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] = 0x00;




    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x0
    };

    CPU.dec_HL(inst);

    assert.equal(MEM.readByte(0xBEBA),0xFF,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});


QUnit.test( "CPL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x35;
    CPU._r.f = 0x90; //Set flags to see if they remain.


    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x0
    };

    CPU.cpl(inst);

    assert.equal(CPU._r.a, 0xCA,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});


//todo: DAA operation