/**
 * Created by ismar on 24/01/2017.
 * 8bit-Arithmetic-Logical operations
 */


//Add register r to A
CPU.add_A_r = function(inst){

    var addCarry = 0;
    var valueToAdd = CPU.getRegisterFromCode(inst.r2);
    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x1 && (CPU._r.f&0x10) == 0x10){
        addCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)
    var oldA = CPU._r.a;

    //First, add the register and check for half-carry
    CPU._r.a = CPU._r.a + valueToAdd;
    if((((oldA & 0xf) + (valueToAdd & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    //Then, add the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a += addCarry;
    if((((oldA & 0xf) + (addCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a > 0xFF) CPU._r.f |= 0x10;           //A carry occurred
    //Half-carry ocurred, from 3rd to 4th bit


    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte


};

//A = A + n
CPU.add_A_n =  function(inst){

    var addCarry = 0;
    var valueToAdd = inst.n;
    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x1 && (CPU._r.f&0x10) == 0x10){
        addCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)
    var oldA = CPU._r.a;

    //First, add the register and check for half-carry
    CPU._r.a = CPU._r.a + valueToAdd;
    if((((oldA & 0xf) + (valueToAdd & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    //Then, add the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a += addCarry;
    if((((oldA & 0xf) + (addCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a > 0xFF) CPU._r.f |= 0x10;           //A carry occurred
    //Half-carry ocurred, from 3rd to 4th bit


    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte


};

//A = A + HL
CPU.add_A_HL =  function(inst){

    var addCarry = 0;
    var valueToAdd = (CPU._r.h << 8 | CPU._r.l ); //Compose HL value

    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x1 && (CPU._r.f&0x10) == 0x10){
        addCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)
    var oldA = CPU._r.a;

    //First, add the register and check for half-carry
    CPU._r.a = CPU._r.a + valueToAdd;
    if((((oldA & 0xf) + (valueToAdd & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    //Then, add the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a += addCarry;
    if((((oldA & 0xf) + (addCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a > 0xFF) CPU._r.f |= 0x10;           //A carry occurred
    //Half-carry ocurred, from 3rd to 4th bit


    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte


};

//Substracts register r from A
CPU.sub_A_r = function(inst){

    var subCarry = 0;


    var valueToSubstract = CPU.getRegisterFromCode(inst.r2);

    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x3 && (CPU._r.f&0x10) == 0x10){
        subCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    var oldA = CPU._r.a;


    //First, substract the register and check for half-carry
    CPU._r.a -= valueToSubstract;
    if((((oldA & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }
    //Then, substract the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a -= subCarry;
    if((((oldA & 0xf) - (subCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }



    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte


};

//Substracts n from A
CPU.sub_A_n =  function(inst){

    var subCarry = 0;


    var valueToSubstract = inst.n;

    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x3 && (CPU._r.f&0x10) == 0x10){
        subCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    var oldA = CPU._r.a;


    //First, substract the register and check for half-carry
    CPU._r.a -= valueToSubstract;
    if((((oldA & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }
    //Then, substract the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a -= subCarry;
    if((((oldA & 0xf) - (subCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }



    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte


};

//Substracts HL from A
CPU.sub_A_HL = function(inst){

    var subCarry = 0;


    var valueToSubstract = (CPU._r.h << 8 | CPU._r.l ); //Compose HL value

    //Used for adc operation (variation where carry flag is added)
    if(inst.r1 == 0x3 && (CPU._r.f&0x10) == 0x10){
        subCarry = 1;
    }

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    var oldA = CPU._r.a;


    //First, substract the register and check for half-carry
    CPU._r.a -= valueToSubstract;
    if((((oldA & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }
    //Then, substract the carry and check for half-carry
    oldA = CPU._r.a;
    CPU._r.a -= subCarry;
    if((((oldA & 0xf) - (subCarry & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }



    if((CPU._r.a & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(CPU._r.a < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    CPU._r.a &= 0xFF;                     //Truncate A to 1-byte. IMPORTANT, DO NOT FORGET


};

//A = A and r
CPU.and_A_r = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    valueToAND = CPU.getRegisterFromCode(inst.r2);
    CPU._r.a = CPU._r.a & valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f |= 0x20; //So H is always to 1

    CPU._r.a &= 0xFF;

};

//A = A and n
CPU.and_A_n = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    valueToAND = inst.n;
    CPU._r.a = CPU._r.a & valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f |= 0x20; //So H is always to 1

    CPU._r.a &= 0xFF;

};

//A = A and HL
CPU.and_A_HL = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    valueToAND = (CPU._r.h << 8 | CPU._r.l );
    CPU._r.a = CPU._r.a & valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f |= 0x20; //So H is always to 1

    CPU._r.a &= 0xFF;

};