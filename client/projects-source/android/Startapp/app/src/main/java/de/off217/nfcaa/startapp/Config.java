package de.off217.nfcaa.startapp;

class Config {

     //static final String url = "http://132.176.75.120:3000"; // Laptop t420 Fernunihagen Netzwerk
     static final String url = "http://192.168.18.206:3000"; // Laptop t420 mrguest Netzwerk
    // static final String url = "http://192.168.178.66:3000"; // Laptop t420 at Home


    static String jwt = "";

    static String authToken = "";

    // GENERIERT MIT: SHA.jl
    // julia> bytes2hex(sha256("brownfox"))
    // "dc7ebb3f63c881b6694c2df53a8ec9081a0e7dd0a29003ec1c929036b34a1ebc"
    static final String signKey = "dc7ebb3f63c881b6694c2df53a8ec9081a0e7dd0a29003ec1c929036b34a1ebc";
}


