/**
 * Created by ismar on 25/01/2017.
 * 16bit-Arithmetic-Logical operations
 */

//HL = HL + rr
CPU.add_HL_rr = function(inst){

    CPU._r.f = 0x80; //Clear all flags except Z. N must be 0.

    var rrCode = inst.r1 >> 1; //To get rid of the 1 at the end of r1s

    var rr = CPU.getDoubleRegisterFromCode(rrCode);
    var HL = CPU.getDoubleRegisterFromCode(2); //HL is 10

    var oldHL = HL;
    HL = HL + rr; //Perform addition

    //Check for half-carry from bit 15
    if((((oldHL & 0xFFF) + (rr & 0xFFF)) & 0x1000)== 0x1000) {
        CPU._r.f |=0x20;
    }
    //Check for carry from bit 15 (overflow)
    if(HL > 0xFFFF) CPU._r.f |= 0x10;

    //Update HL (Remember, 2 = HL)
    CPU.setDoubleRegisterFromCode(2,HL);


};


// rr = rr  + 1
CPU.inc_rr = function(inst){

    //No flags are affected

    var rrCode = inst.r1 >> 1; //To get rid of the 1 at the end of r1s

    var rr = CPU.getDoubleRegisterFromCode(rrCode);
    rr = rr + 1;
    CPU.setDoubleRegisterFromCode(rrCode,rr);


};

// rr = rr  - 1
CPU.dec_rr = function(inst){

    //No flags are affected

    var rrCode = inst.r1 >> 1; //To get rid of the 1 at the end of r1s

    var rr = CPU.getDoubleRegisterFromCode(rrCode);
    rr = rr - 1;
    CPU.setDoubleRegisterFromCode(rrCode,rr);


};

//SP = SP + n (n is 8-byte signed)
CPU.add_SP_n = function(inst){

    CPU._r.f = 0x00; //Clear all flags. Z and N will remain reset.

    var n = inst.n;
    if ((n & 0x80) > 0) { //most-significant bit is 1 -> number is negative. Else, it is positive
        //When it is negative, we extend the sign to the 32 bits of int javascript so js interprets it as a negative num.
        n = n | 0xFFFFFF00;
    }


    var oldValue = CPU._r.sp;
    CPU._r.sp += n;

    //As SP is not-signed, a carry occurs when it is more than FFFF or less than 0
    if(CPU._r.sp > 0xFFFF || CPU._r.sp < 0){
        CPU._r.f |= 0x10; //Set flag C
    }

    //Check for half-carry from bit 15. When it is a sum
    if(n > 0 &&  ((((oldValue & 0xFFF) + (n & 0xFFF)) & 0x1000)== 0x1000)) {
        CPU._r.f |=0x20;
    }

    //Check for half-carry from bit 15. When it is a substract
    if(n < 0 &&  ((((oldValue & 0xFFF) - (n & 0xFFF)) & 0x1000)== 0x1000)) {
        CPU._r.f |=0x20;
    }

    CPU._r.sp &= 0xFFFF; //Clear non-important bytes

};