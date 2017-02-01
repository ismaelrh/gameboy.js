/**
 * Created by ismar on 01/02/2017.
 */


//r1 = r2
CPU.ld_r1_r2 = function(inst){

    CPU.setRegisterFromCode(inst.r1,CPU.getRegisterFromCode(inst.r2));
};

//r = @HL
CPU.ld_r_HL = function(inst){

    //r1 = Mem[HL]
    CPU.setRegisterFromCode(inst.r1,MEM.readByte(CPU.getDoubleRegisterFromCode(2)));
};


//r = n
CPU.ld_r_n= function(inst){

    CPU.setRegisterFromCode(inst.r1,inst.n);
};


//@HL = r
CPU.ld_HL_r = function(inst){

    MEM.writeByte(CPU.getDoubleRegisterFromCode(2),CPU.getRegisterFromCode(inst.r2));

};

//@HL = n (immediate of 1Byte)
CPU.ld_HL_n = function(inst){


    MEM.writeByte(CPU.getDoubleRegisterFromCode(2),inst.n);

};


//A = @BC
CPU.ld_A_BC = function(inst){

    //A = Mem[BC]
    CPU._r.a = MEM.readByte(CPU.getDoubleRegisterFromCode(0));


};

//A = @DE
CPU.ld_A_DE = function(inst){

    //A = Mem[DE]
    CPU._r.a = MEM.readByte(CPU.getDoubleRegisterFromCode(1));

};

//A = @nn
CPU.ld_A_nn = function(inst){

    CPU._r.a = MEM.readByte(inst.nn);

};

//@BC = A
CPU.ld_BC_A = function(inst){

    MEM.writeByte(CPU.getDoubleRegisterFromCode(0),CPU._r.a);
};

//@DE = A
CPU.ld_DE_A = function(inst){

    MEM.writeByte(CPU.getDoubleRegisterFromCode(1),CPU._r.a);
};


//@nn = A
CPU.ld_nn_A = function(inst){

    MEM.writeByte(inst.nn,CPU._r.a);
};


//A = @(FF00 + n)
CPU.ld_A_ff00_n = function(inst){
    CPU._r.a = MEM.readByte(0xFF00 + inst.n);
};


//@(FF00 + n) = A
CPU.ld_ff00_n_A = function(inst){
    MEM.writeByte(0xFF00 + inst.n,CPU._r.a);
};

//A = @(FF00 + C)
CPU.ld_A_ff00_C = function(inst){
    CPU._r.a = MEM.readByte(0xFF00 + CPU._r.c);
};

//@(FF00 + C) = A
CPU.ld_ff00_C_A = function(inst){
    MEM.writeByte(0xFF00 + CPU._r.c,CPU._r.a);
};

//@HL = A; HL = HL + 1;
CPU.ldi_hl_a = function(inst){
    var hl = CPU.getDoubleRegisterFromCode(2);
    MEM.writeByte(hl,CPU._r.a); //Write to memory

    hl = hl  + 1;
    CPU.setDoubleRegisterFromCode(2,hl); //Increment HL

};

//@HL = A; HL = HL - 1;
CPU.ldd_hl_a = function(inst){
    var hl = CPU.getDoubleRegisterFromCode(2);
    MEM.writeByte(hl,CPU._r.a); //Write to memory

    hl = hl  - 1;
    CPU.setDoubleRegisterFromCode(2,hl); //Increment HL

};

//A = $HL; HL = HL + 1;
CPU.ldi_a_hl = function(inst){

    var hl = CPU.getDoubleRegisterFromCode(2);
    CPU._r.a = MEM.readByte(hl);//Read from memory

    hl = hl  + 1;
    CPU.setDoubleRegisterFromCode(2,hl); //Increment HL

};


//A = $HL; HL = HL - 1;
CPU.ldd_a_hl = function(inst){

    var hl = CPU.getDoubleRegisterFromCode(2);
    CPU._r.a = MEM.readByte(hl);//Read from memory

    hl = hl  - 1;
    CPU.setDoubleRegisterFromCode(2,hl); //Increment HL

};


