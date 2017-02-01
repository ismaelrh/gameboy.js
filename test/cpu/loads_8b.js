/**
 * Created by ismar on 01/02/2017.
 */

QUnit.test( "LD_R1_R2", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 0x5;
    CPU._r.e = 0x1;

    var inst = {
        opcode: 0x2,
        r1: 0x3, //Destination (r1) is E
        r2: 0x7, //Source (r2) is A
        n: 0
    };
    CPU.ld_r1_r2(inst);
    assert.equal( CPU._r.e, CPU._r.a,"Correct");

});
QUnit.test( "LD_R_HL", function( assert ) {

    CPU._init();
    //Sum a and e

    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;
    MEM._m[0xBEBA] =  0xCA;

    var inst = {
        opcode: 0x2,
        r1: 0x4, //Destination (r1) is H
        r2: 0x0, //Don't care
        n: 0
    };
    CPU.ld_r_HL(inst);
    assert.equal( CPU._r.h,0xCA,"Correct");

});


QUnit.test( "LD_R_N", function( assert ) {

    CPU._init();
    //Sum a and e

    CPU._r.b = 0xFF;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Destination (r1) is B
        r2: 0x0, //Don't care
        n: 0xAB // To load 0xAB into register B
    };
    CPU.ld_r_n(inst);
    assert.equal( CPU._r.b,0xAB,"Correct");

});


QUnit.test( "LD_HL_r", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xBE;
    CPU._r.h = 0xDE;
    CPU._r.l = 0xAD;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x7, //So content of A is stored
        n: 0x0 //Don't care
    };
    CPU.ld_HL_r(inst);
    //@DEAD = 0xBE
    assert.equal( MEM.readByte(0xDEAD),0xBE,"Correct");

});

QUnit.test( "LD_HL_n", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.h = 0xDE;
    CPU._r.l = 0xAD;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x7, //Don't care
        n: 0xCC // To load 0xAB into register B
    };

    CPU.ld_HL_n(inst);
    //@DEAD = 0xBE
    assert.equal( MEM.readByte(0xDEAD),0xCC,"Correct");

});


QUnit.test( "LD_A_BC", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.a = 0xFF;
    CPU._r.b = 0xBE;
    CPU._r.c = 0xBA;

    MEM._m[0xBEBA] = 0xCA;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0 //Don't care
    };

    CPU.ld_A_BC(inst);
    //@DEAD = 0xBE
    assert.equal( CPU._r.a,0xCA,"Correct");

});

QUnit.test( "LD_A_DE", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.a = 0xFF;
    CPU._r.d = 0xBE;
    CPU._r.e = 0xBA;
    MEM._m[0xBEBA] = 0xCA;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0 //Don't care
    };

    CPU.ld_A_DE(inst);
    //@DEAD = 0xBE
    assert.equal( CPU._r.a,0xCA,"Correct");

});


QUnit.test( "LD_A_nn", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.a = 0xFF;
    MEM._m[0xDEAD] = 0xAB;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0xDE,
        nn:0xDEAD
    };

    CPU.ld_A_nn(inst);
    //@DEAD = 0xBE
    assert.equal( CPU._r.a,0xAB,"Correct");

});

QUnit.test( "LD_BC_A", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.a = 0xCF;

    CPU._r.b = 0xBE;
    CPU._r.c = 0xBA;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ld_BC_A(inst);

    assert.equal( MEM.readByte(0xBEBA),0xCF,"Correct");


});

QUnit.test( "LD_DE_A", function( assert ) {

    CPU._init();
    MEM._init();
    //Sum a and e


    CPU._r.a = 0xCF;

    CPU._r.d = 0xBE;
    CPU._r.e = 0xBA;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ld_DE_A(inst);

    assert.equal( MEM.readByte(0xBEBA),0xCF,"Correct");


});


QUnit.test( "LD_nn_A", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xAB;


    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0xBEBA
    };

    CPU.ld_nn_A(inst);

    assert.equal( MEM.readByte(0xBEBA),0xAB,"Correct");


});

QUnit.test( "LD_A_ff00_n", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xFF;
    MEM.writeByte(0xFF34,0xAB); //$0xFF34 = 0xAB

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x34,
        nn:0x0 //Don't care
    };

    CPU.ld_A_ff00_n(inst);

    assert.equal( CPU._r.a,0xAB,"Correct");


});


QUnit.test( "LD_ff00_n_A", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xAB;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x34,
        nn:0x0 //Don't care
    };

    CPU.ld_ff00_n_A(inst);

    assert.equal( MEM.readByte(0xFF34),0xAB,"Correct");


});


QUnit.test( "LD_A_ff00_C", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xFF;
    CPU._r.c = 0x34;
    MEM.writeByte(0xFF34,0xAB); //$0xFF34 = 0xAB

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x00, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ld_A_ff00_C(inst);

    assert.equal( CPU._r.a,0xAB,"Correct");


});

QUnit.test( "LD_ff00_C_A", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xAB;
    CPU._r.c = 0x34;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ld_ff00_C_A(inst);

    assert.equal( MEM.readByte(0xFF34),0xAB,"Correct");


});

QUnit.test( "LDI_HL_A", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0x56;
    CPU._r.h = 0xBE;
    CPU._r.l = 0xBA;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ldi_hl_a(inst);

    assert.equal( MEM.readByte(0xBEBA),0x56,"Written in memory");
    assert.equal(CPU.getDoubleRegisterFromCode(2),0xBEBB,"Was incremented");

});

QUnit.test( "LDD_HL_A", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0x5;
    CPU._r.h = 0x40;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ldd_hl_a(inst);

    assert.equal( MEM.readByte(0x4000),0x5,"Written in memory");
    assert.equal(CPU.getDoubleRegisterFromCode(2),0x3FFF, "Was decremented");

});


QUnit.test( "LDI_A_HL", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xFF;
    CPU._r.h = 0x01;
    CPU._r.l = 0xFF;
    MEM._m[0x1FF] = 0X56;


    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ldi_a_hl(inst);

    assert.equal(CPU._r.a,0x56,"Read from memory");
    assert.equal(CPU.getDoubleRegisterFromCode(2),0x200, "Was incremented");

});

QUnit.test( "LDD_A_HL", function( assert ) {

    CPU._init();
    MEM._init();

    CPU._r.a = 0xFF;
    CPU._r.h = 0x8A;
    CPU._r.l = 0x5C;
    MEM._m[0x8A5C] = 0X3C;


    var inst = {
        opcode: 0x2,
        r1: 0x0, //Don't care
        r2: 0x0, //Don't care
        n: 0x0, //Don't care
        nn:0x0 //Don't care
    };

    CPU.ldd_a_hl(inst);

    assert.equal(CPU._r.a,0x3C,"Read from memory");
    assert.equal(CPU.getDoubleRegisterFromCode(2),0x8A5B, "Was incremented");

});