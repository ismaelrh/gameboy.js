/**
 * Created by ismaro3 on 24/01/2017.
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

    //First, add the register adnd check for half-carry
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
    if(CPU._r.a > 0xFF) CPU._r.f |= 0x10;           //A carry occurred. No check negative, impossible to overflow the JS 32 bit integer.
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

//A = A + @HL
CPU.add_A_HL =  function(inst){

    var addCarry = 0;

    var valueToAdd = MEM.readByte(CPU.getDoubleRegisterFromCode(2));

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

//A = A - @HL
CPU.sub_A_HL = function(inst){

    var subCarry = 0;


    var valueToSubstract = MEM.readByte(CPU.getDoubleRegisterFromCode(2));


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

    var valueToAND = MEM.readByte(CPU.getDoubleRegisterFromCode(2));

    CPU._r.a = CPU._r.a & valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f |= 0x20; //So H is always to 1

    CPU._r.a &= 0xFF;

};


//A = A xor r
CPU.xor_A_r = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    valueToAND = CPU.getRegisterFromCode(inst.r2);
    CPU._r.a = CPU._r.a ^ valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;

};

//A = A xor n
CPU.xor_A_n = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    valueToAND = inst.n;
    CPU._r.a = CPU._r.a ^ valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;

};

//A = A xor HL
CPU.xor_A_HL = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    var valueToXOR = MEM.readByte(CPU.getDoubleRegisterFromCode(2));

    CPU._r.a = CPU._r.a ^ valueToXOR;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;


};


//A = A or r
CPU.or_A_r = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    var valueToAND = CPU.getRegisterFromCode(inst.r2);
    CPU._r.a = CPU._r.a | valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;

};

//A = A or n
CPU.or_A_n = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    var valueToAND = inst.n;
    CPU._r.a = CPU._r.a | valueToAND;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //So N and C are always to 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;

};

//A = A or HL
CPU.or_A_HL = function(inst){
    CPU._r.f = 0x00;    //Clear flags
    var valueToOR = MEM.readByte(CPU.getDoubleRegisterFromCode(2));
    CPU._r.a = CPU._r.a | valueToOR;

    if(CPU._r.a == 0)  CPU._r.f |= 0x80; //Flag Z = 1 if result is 0
    CPU._r.f &=  0x80; //N,H and C always set to 0

    CPU._r.a &= 0xFF;


};

//Substracts register r from A
CPU.cp_A_r = function(inst){

    var valueToSubstract = CPU.getRegisterFromCode(inst.r2);

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    //Save the result in another variable
    var comparisonResult = CPU._r.a - valueToSubstract;

    if((((CPU._r.a & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((comparisonResult & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(comparisonResult < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    //A is not modified!

};


//A = A - n
CPU.cp_A_n = function(inst){

    var valueToSubstract = inst.n;

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    //Save the result in another variable
    var comparisonResult = CPU._r.a - valueToSubstract;

    if((((CPU._r.a & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((comparisonResult & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(comparisonResult < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    //A is not modified!

};


//A = A - HL
CPU.cp_A_HL = function(inst){

    var valueToSubstract = MEM.readByte(CPU.getDoubleRegisterFromCode(2));

    CPU._r.f = 0x00; //Clear flags (after having accessed to carry flag)

    //Save the result in another variable
    var comparisonResult = CPU._r.a - valueToSubstract;

    if((((CPU._r.a & 0xf) - (valueToSubstract & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if((comparisonResult & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if(comparisonResult < 0 ) CPU._r.f |= 0x10;           //A carry occurred

    CPU._r.f |= 0x40; //N flag always set on substract

    //A is not modified!

};


//r = r + 1
CPU.inc_r =  function(inst){

    CPU._r.f &= 0x10; //Clear all flags except C, that remains unchanged
    var r = inst.r1; //Register to act is r1
    var oldValue = CPU.getRegisterFromCode(r);
    var newValue = oldValue +1;



    //Check for half-carry
    if((((oldValue & 0xf) + (0x1 & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }


    if(((newValue) & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if((newValue) > 0xFF) CPU._r.f |= 0x10;           //A carry occurred


    CPU.setRegisterFromCode(r,newValue&0xFF); //Truncate and save value

};

//@HL = @HL + 1
CPU.inc_HL =  function(inst){

    CPU._r.f &= 0x10; //Clear all flags except C, that remains unchanged
    var oldValue = MEM.readByte(CPU.getDoubleRegisterFromCode(2));
    var newValue = oldValue +1;


    //Check for half-carry
    //todo: it seems that is as in the previous cases, as it says the GAMEBOY CPU MANUAL, so it would be right
    if((((oldValue & 0xf) + (0x1 & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }

    if(((newValue) & 0xFFFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if((newValue) > 0xFFFF) CPU._r.f |= 0x10;           //A carry occurred

    newValue = newValue & 0xFF; //Truncate

    MEM.writeByte(CPU.getDoubleRegisterFromCode(2),newValue);

};

//r = r - 1
CPU.dec_r =  function(inst){

    CPU._r.f &= 0x10; //Clear all flags except C, that remains unchanged
    var r = inst.r1; //Register to act is r1
    var oldValue = CPU.getRegisterFromCode(r);
    var newValue = oldValue  - 1;



    //Check for half-carry
    //todo: it seems that is as in the previous cases, as it says the GAMEBOY CPU MANUAL, so it would be right
    if((((oldValue & 0xf) - (0x1 & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }


    if(((newValue) & 0xFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if((newValue) < 0x00) CPU._r.f |= 0x10;           //A carry occurred
    CPU._r.f |= 0x40; //N always to 1


    CPU.setRegisterFromCode(r,newValue&0xFF); //Truncate and save value

};

//@HL = @HL - 1
CPU.dec_HL =  function(inst){

    CPU._r.f &= 0x10; //Clear all flags except C, that remains unchanged

    var oldValue = MEM.readByte(CPU.getDoubleRegisterFromCode(2));
    var newValue = oldValue  - 1;


    //Check for half-carry
    //todo: it seems that is as in the previous cases, as it says the GAMEBOY CPU MANUAL, so it would be right
    if((((oldValue & 0xf) - (0x1 & 0xf)) & 0x10)== 0x10) {
        CPU._r.f |=0x20;
    }


    if(((newValue) & 0xFFFF) == 0x0) CPU._r.f |= 0x80;    //Set Z=0 if result is 0
    if((newValue) < 0x0000) CPU._r.f |= 0x10;           //A carry occurred
    CPU._r.f |= 0x40; //N always to 1

    newValue =newValue & 0xFF; //Truncate

    MEM.writeByte(CPU.getDoubleRegisterFromCode(2),newValue);

};

CPU.cpl =  function(inst){

    CPU._r.f &= 0x90; //Clear all flags except C and Z, that remains unchanged

    CPU._r.a = CPU._r.a ^ 0xFF; //Flips all bits
    CPU._r.f |= 0x60; //Sets flags N and H to 1


};

//todo: repasar el funcionamiento de H en restas



