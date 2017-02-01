/**
 * Created by ismar on 01/02/2017.
 */


//TODO: Improve, it is a very basic memory
MEM = {


    _m: [],

    _init: function(){
        MEM._m = []
    },
    readByte: function(address){
        console.log("[MEM] Reading byte from 0x" + address.toString(16).toUpperCase() + " (0x" + MEM._m[address].toString(16).toUpperCase() + ")");
        return MEM._m[address];
    },

    writeByte: function(address,value){
        MEM._m[address] = value & 0xFF;
    }


};