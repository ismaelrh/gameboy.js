/**
 * Created by ismar on 01/02/2017.
 */

QUnit.test( "ADD_HL_rr", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.h = 0X8A;
    CPU._r.l = 0x23;
    CPU._r.b = 0X06;
    CPU._r.c = 0X05;
    CPU._r.f = 0x80;


    var inst = {
        opcode: 0x2,
        r1: 0x1, //So r1 is 001 -> code is 00 = BC
        r2: 0x0, //To indicate register E
        n: 0x00
    };

    CPU.add_HL_rr(inst);

    assert.equal(CPU._r.h, 0x90,"High result is correct");
    assert.equal(CPU._r.l, 0x28,"Low result is correct");

    assert.equal(CPU._r.f&0x80, 0x80, "Z flag remains the same (1)");
    assert.equal(CPU._r.f&0x40, 0x00, "N flag is reset");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag is set to 1");
    assert.equal(CPU._r.f&0x10, 0x00, "C flag is set to 0");

    //Restore HL and try with other operation
    CPU._r.h = 0X8A;
    CPU._r.l = 0x23;

    inst = {
        opcode: 0x2,
        r1: 0x5, //So r1 is 101 -> code is 10 = hl
        r2: 0x0, //To indicate register E
        n: 0x00
    };

    CPU.add_HL_rr(inst);

    assert.equal(CPU._r.h, 0x14,"High result is correct");
    assert.equal(CPU._r.l, 0x46,"Low result is correct");

    assert.equal(CPU._r.f&0x80, 0x80, "Z flag remains the same (1)");
    assert.equal(CPU._r.f&0x40, 0x00, "N flag is reset");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag is set to 1");
    assert.equal(CPU._r.f&0x10, 0x10, "C flag is set to 0");





});

QUnit.test( "INC_rr", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.d = 0X23;
    CPU._r.e = 0x5F;
    CPU._r.f = 0xF0; //All flags to 1


    var inst = {
        opcode: 0x2,
        r1: 0x2, //So r1 is 010 -> code is 01 = DE
        r2: 0x0, //To indicate register E
        n: 0x00
    };

    CPU.inc_rr(inst);

    assert.equal(CPU._r.d, 0x23,"High result is correct");
    assert.equal(CPU._r.e, 0x60,"Low result is correct");

    assert.equal(CPU._r.f&0x80, 0x80, "Z flag remains the same (1)");
    assert.equal(CPU._r.f&0x40, 0x40, "N flag remains the same (1)");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag remains the same (1)");
    assert.equal(CPU._r.f&0x10, 0x10, "C flag remains the same (1)");






});


QUnit.test( "DEC_rr", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.d = 0X23;
    CPU._r.e = 0x5F;
    CPU._r.f = 0xF0; //All flags to 1


    var inst = {
        opcode: 0x2,
        r1: 0x2, //So r1 is 010 -> code is 01 = DE
        r2: 0x0, //To indicate register E
        n: 0x00
    };

    CPU.dec_rr(inst);

    assert.equal(CPU._r.d, 0x23,"High result is correct");
    assert.equal(CPU._r.e, 0x5E,"Low result is correct");

    assert.equal(CPU._r.f&0x80, 0x80, "Z flag remains the same (1)");
    assert.equal(CPU._r.f&0x40, 0x40, "N flag remains the same (1)");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag remains the same (1)");
    assert.equal(CPU._r.f&0x10, 0x10, "C flag remains the same (1)");






});


QUnit.test( "ADD_SP_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.sp = 0xFFF8;


    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x02 //2
    };

    CPU.add_SP_n(inst);

    assert.equal(CPU._r.sp, 0xFFFA,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag set to 0");
    assert.equal(CPU._r.f&0x40, 0x00, "N flag set to 0");
    assert.equal(CPU._r.f&0x20, 0x00, "H flag set to 0");
    assert.equal(CPU._r.f&0x10, 0x00, "C flag set to 0");

    //2.- 0x0FFF + 1 = 1000
    CPU._r.sp = 0x0FFF;
    inst.n = 0x01;

    CPU.add_SP_n(inst);

    assert.equal(CPU._r.sp, 0x1000,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag set to 0");
    assert.equal(CPU._r.f&0x40, 0x00, "N flag set to 0");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag set to 1");
    assert.equal(CPU._r.f&0x10, 0x00, "C flag set to 0");

    //3.- 0x000A + (-B) = 0xFFFF;
    CPU._r.sp = 0x000a;
    inst.n = 0xF5; //-11

    CPU.add_SP_n(inst);

    assert.equal(CPU._r.sp, 0xFFFF,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag set to 0");
    assert.equal(CPU._r.f&0x40, 0x00, "N flag set to 0");
    assert.equal(CPU._r.f&0x20, 0x20, "H flag set to 1");
    assert.equal(CPU._r.f&0x10, 0x10, "C flag set to 1");



});
