CREATE DATABASE repertorio ;


CREATE TABLE repertorio (
    id SERIAL PRIMARY KEY, 
    cancion VARCHAR(50), 
    artista VARCHAR(50), 
    tono VARCHAR(10)
    );